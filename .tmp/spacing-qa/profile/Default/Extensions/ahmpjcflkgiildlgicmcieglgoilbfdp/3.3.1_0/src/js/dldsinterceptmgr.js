class ResponseDetails {
    responseHeaders = null; // Map
    contentType = "";
    contentLength = -1;
}

class RequestDetails {
    initiator = "";
    requestHeaders = [];
    cookies = "";
    url = "";
    time = 0;
    documentUrl = "";
    postData = "";
    tabId = -1;
    responseDetails = null;
}

function DownloadsInterceptManager()
{
    this.enable = false;
    this.pauseCatchingForAllSites = false;
    this.skipSmaller = 0;
    this.skipExts = "";
    this.catchExts = "";
    this.skipHosts = [];
    this.returningDownloads = [];
    /* @requestDetailsByRequestId - simple map of requestId -> RequestDetails for interception in Firefox */
    this.requestDetailsByRequestId = new Map;
    /* @requestDetailsByRequestUrl - saves RequestDetails by url for interception in Chrome, because requestId cannot be used */
    this.requestDetailsByRequestUrl = [];
    this.supportsDeterminingFilename =
        browser.downloads &&
        browser.downloads.onDeterminingFilename;

    this.lastDownload = false;

    this.DONT_SHOW_NOTIFICATION_AGAIN_LOCALSTORAGE_KEY = "dontShowNotificationAgain";
}

DownloadsInterceptManager.prototype.initialize = function()
{
    if (this.supportsDeterminingFilename)
    {
        browser.downloads.onDeterminingFilename.addListener(
            this.onDeterminingFilename.bind(this));
    }
    browser.webRequest.onBeforeSendHeaders.addListener(
        this.onBeforeSendHeaders.bind(this),
        { urls: ["<all_urls>"] },
        manifestV2BlockingArray(["requestHeaders"]));
    // for special processing for redirects & POST requests
    browser.webRequest.onBeforeRequest.addListener(
        this.onBeforeRequest.bind(this),
        { urls: ["<all_urls>"] },
        ["requestBody"]);
    browser.webRequest.onSendHeaders.addListener(
        this.onSendHeaders.bind(this),
        { urls: ["<all_urls>"] },
        ["requestHeaders"]);
    browser.webRequest.onHeadersReceived.addListener(
        this.onHeadersReceived.bind(this),
        { urls: ["<all_urls>"] },
        manifestV2BlockingArray(["responseHeaders"]));
    browser.webRequest.onCompleted.addListener(
        this.onCompleted.bind(this),
        { urls: ["<all_urls>"] });
    browser.webRequest.onErrorOccurred.addListener(
        this.onErrorOccurred.bind(this),
        { urls: ["<all_urls>"] });
};

DownloadsInterceptManager.prototype.returningDownloadIndexByOriginalUrl = function(
    url)
{
    for (var i = 0; i < this.returningDownloads.length; ++i)
    {
        if (this.returningDownloads[i].originalUrl == url)
            return i;
    }
    return -1;
};

DownloadsInterceptManager.prototype.removeRequestDetailsByOriginalUrl = function(
    url, time)
{
    var index = this.requestDetailsByRequestUrl.findIndex(item => (item.time === time && item.url === url));
    if (index !== -1) {
        this.requestDetailsByRequestUrl.splice(index, 1);
    }
};

DownloadsInterceptManager.prototype.requestDetailsIndexByOriginalUrl = function(
    url)
{
    var currentIndex = -1;
    for (var key in this.requestDetailsByRequestUrl) {
        var item = this.requestDetailsByRequestUrl[key];
        if (item.url === url && (currentIndex === -1 || item.time > this.requestDetailsByRequestUrl[currentIndex].time)) {
            currentIndex = key;
        }
    }
    return currentIndex;
};

DownloadsInterceptManager.prototype.inSkipList = function(
    url, isOriginUrl, filename)
{
    if (this.skipIfKeyPressed && this.skipKeyPressed)
        return true;

    if (!isOriginUrl)
    {
        if (this.catchExts)
        {
            var str = filename ? filename : url;
            var rgx = filename ? /(\.([\w\d]+))$/ : /(?:[^\/]+)(\.(\w+))(?:\?.+)?(?:#.+)?$/;
            var match = rgx.exec(str);
            if (match && match.length === 3)
            {
                if (this.catchExts.indexOf(match[1].toLowerCase()) == -1 && // .ext
                    this.catchExts.indexOf(match[2].toLowerCase()) == -1)   //  ext
                {
                    return true;
                }
            }
        }
        else if (this.skipExts)
        {
            var str = filename ? filename : url;
            var rgx = filename ? /(\.([\w\d]+))$/ : /(?:[^\/]+)(\.(\w+))(?:\?.+)?(?:#.+)?$/;
            var match = rgx.exec(str);
            if (match && match.length === 3)
            {
                if (this.skipExts.indexOf(match[1].toLowerCase()) != -1 || // .ext
                    this.skipExts.indexOf(match[2].toLowerCase()) != -1)   //  ext
                {
                    return true;
                }
            }
        }
    }

    if (url)
    {
        // workaround for other possible hosts like MEGA.nz
        // Added blob to exclude other protocols as well
        if (url.toLowerCase().indexOf("filesystem:") == 0
            || url.toLowerCase().indexOf("blob:") == 0
            || url.toLowerCase().indexOf("data:") == 0)
        {
            return true;
        }

        if (this.skipServersEnabled && fdmExtUtils.urlInSkipServers(this.skipHosts, url)) {
            return true;
        }
    }

    return false;
};

DownloadsInterceptManager.prototype.continueDeterminingFilename = function(
    downloadItem, suggest, details, detailsBetter)
{
    /* 
        According to documentation, downloadItem.totalBytes should be -1 when it is unknown: 
        https://developer.chrome.com/extensions/downloads#type-DownloadItem 
        However, here's an example where it is 0: http://www.sample-videos.com/ -- any file
    */

    if (downloadItem.totalBytes != 0 && downloadItem.totalBytes != -1 && downloadItem.totalBytes < this.skipSmaller) {
        suggest();
        return;
    }

    if (downloadItem.url.indexOf("google.com") != -1 && (
        downloadItem.mime.indexOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") != -1
        || downloadItem.mime.indexOf("application/vnd.ms-") != -1)) {
        suggest();
        return;
    }

    if (this.inSkipList(downloadItem.url, false, downloadItem.filename)) {
        suggest();
        return;
    }

    if (this.inSkipList(downloadItem.referrer, true, downloadItem.filename)) {
        suggest();
        return;
    }

    if (details && details.documentUrl && this.inSkipList(details.documentUrl, true, downloadItem.filename)) {
        suggest();
        return;
    }

    var returningDownloadIndex = this.returningDownloadIndexByOriginalUrl(
        downloadItem.url);
    if (returningDownloadIndex != -1) {
        if (!--this.returningDownloads[returningDownloadIndex].refCount)
            this.returningDownloads.splice(returningDownloadIndex, 1);
        suggest();
        return;
    }

    if (this.lastDownload && this.lastDownload.url === downloadItem.url
        && this.lastDownload.timestamp + 5 * 60 * 1000 >= + new Date) {

        browser.storage.sync.get([this.DONT_SHOW_NOTIFICATION_AGAIN_LOCALSTORAGE_KEY], function(values) {

            if (!values[this.DONT_SHOW_NOTIFICATION_AGAIN_LOCALSTORAGE_KEY]) {

                var opt = {
                    type: "basic",
                    title: "FDM extension",
                    message: "Problems downloading from this website?",
                    iconUrl: "/assets/images/fdm48.png",
                    buttons: [{title: "Yes, don’t catch downloads from this website."}, {title: "It's OK, don't ask again."}]
                };

                browser.notifications.create(opt, function (id) {
                    var notificationId = id;

                    var onButtonClicked = function(id, btnNum){
                        if (notificationId === id) {
                            browser.notifications.onButtonClicked.removeListener(onButtonClicked);
                            browser.notifications.onClosed.removeListener(onClosed);

                            if (btnNum === 0) {
                                this.settingsPageHlpr.changeSkipList(downloadItem.url, true);
                                this.settingsPageHlpr.changeSkipList(downloadItem.referrer, true);
                            }

                            if (btnNum === 1) {
                                var newValues = {};
                                newValues[this.DONT_SHOW_NOTIFICATION_AGAIN_LOCALSTORAGE_KEY] = true;
                                browser.storage.sync.set(newValues);
                            }
                        }
                    }.bind(this);

                    var onClosed = function(){
                        if (notificationId === id) {
                            browser.notifications.onButtonClicked.removeListener(onButtonClicked);
                            browser.notifications.onClosed.removeListener(onClosed);
                        }
                    }.bind(this);

                    browser.notifications.onButtonClicked.addListener(onButtonClicked);
                    browser.notifications.onClosed.addListener(onClosed);

                }.bind(this));
            }

        }.bind(this));
    }

    this.lastDownload = {
        url: downloadItem.url,
        timestamp: + new Date
    };

    browser.downloads.cancel(downloadItem.id, function() {
        browser.downloads.erase({ id: downloadItem.id })
    });

    let info = new DownloadInfo(
        detailsBetter ? details.url : downloadItem.url,
        detailsBetter ? details.url : downloadItem.finalUrl,
        downloadItem.referrer,
        details.postData ? details.postData : "",
        details.documentUrl);

    if (detailsBetter)
        info.suggestedName = downloadItem.filename;

    this.onDownloadIntercepted(info);
}

DownloadsInterceptManager.prototype.onDeterminingFilename = function(
    downloadItem, suggest)
{
    if (!this.enable || this.pauseCatchingForAllSites || this.inSkipList(downloadItem.url, false))
        return false;

    let requestDetailsIndex = this.requestDetailsIndexByOriginalUrl(
        downloadItem.finalUrl);

    if (requestDetailsIndex === -1)
    {
        // This can be a download from a service worker.
        // And it's possible that we don't have the corresponding request's details yet (they are about to arrive a bit later).
        // So we use timeout.
        setTimeout(function ()
        {
            let sourceRd = null;

            for (let [id, rd] of this.requestDetailsByRequestId.entries()) {
                if (rd.tabId !== -1 || !rd.responseDetails || rd.responseDetails.contentLength <= 0)
                    continue;
                if (rd.responseDetails.contentLength === downloadItem.fileSize && 
                    (downloadItem.url.startsWith(rd.initiator) || downloadItem.finalUrl.startsWith(rd.initiator))) 
                {
                    if (!sourceRd)
                        sourceRd = rd;
                    else if (sourceRd.time < rd.time)
                        sourceRd = rd;
                }
            }

            if (sourceRd)
                this.continueDeterminingFilename(downloadItem, suggest, sourceRd, true);
            else
                suggest();

        }.bind(this), 700);

        return true;
    }

    let details = this.requestDetailsByRequestUrl[requestDetailsIndex];
    this.requestDetailsByRequestUrl.splice(requestDetailsIndex, 1);

    this.continueDeterminingFilename(downloadItem, suggest, details, false);

    return true;
};

DownloadsInterceptManager.prototype.returnDownload = function(
    downloadInfo, details)
{
    downloadInfo.refCount = downloadInfo.httpPostData ? 2 : 1;
    this.returningDownloads.push(downloadInfo);

    var info = {};
    info.url = downloadInfo.originalUrl;
    // chrome does not accept referer here
    // see workaround in this.onBeforeSendHeaders.
    //info.headers = [{ name: "Referer", value: downloadInfo.httpReferer }];
    if (downloadInfo.httpPostData && downloadInfo.httpPostData != "")
    {
        info.method = "POST";
        info.body = downloadInfo.httpPostData;
    }

    info.saveAs = true;

    if (details && details.responseHeadersMap && typeof details.responseHeadersMap.has === 'function'
        && details.responseHeadersMap.has("content-disposition")) {

        var disposition = details.responseHeadersMap.get("content-disposition");

        var m = disposition.match(/filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i);
        if (m && m.length && m[3]) {
            info.filename = m[3];
        }
    }

    browser.downloads.download(
        info,
        function (downloadId)
        {
            if (!downloadId)
            {
                alert(browser.i18n.getMessage("addingAfterCancelFailed"));
            }
            else if (!this.supportsDeterminingFilename)
            {
                var returningDownloadIndex = this.returningDownloadIndexByOriginalUrl(info.url);
                if (returningDownloadIndex != -1)
                    this.returningDownloads.splice(returningDownloadIndex, 1);
            }
        }.bind(this, info));

    browser.windows.getCurrent(function(w){
        chrome.windows.update(w.id, {focused: true})
    });
};

DownloadsInterceptManager.prototype.onBeforeSendHeaders = function(
    details)
{
    if (!this.enable || this.pauseCatchingForAllSites || this.inSkipList(details.url, false))
        return;

    // set the Referer header when bringing the download back to Chrome

    var returningDownloadIndex = this.returningDownloadIndexByOriginalUrl(
        details.url);

    if (returningDownloadIndex != -1)
    {
        var referer = this.returningDownloads[returningDownloadIndex].httpReferer;

        var isRefererSet = false;
        var headers = details.requestHeaders;
        var blockingResponse = {};

        for (var i = 0; i < headers.length; ++i)
        {
            if (headers[i].name.toLowerCase() == "referer")
            {
                headers[i].value = referer;
                isRefererSet = true;
                break;
            }
        }

        if (!isRefererSet) {
            headers.push({
                             name: "Referer",
                             value: referer
                         });
        }

        blockingResponse.requestHeaders = headers;
        return blockingResponse;
    }

    if (this.requestDetailsByRequestId.has(details.requestId))
    {
        let cookies = "";

        for (let h of details.requestHeaders)
        {
            if (h.name.toLowerCase() === "cookie")
            {
                if (cookies)
                    cookies += "; ";
                cookies += h.value;
            }
        }

        this.requestDetailsByRequestId.get(details.requestId).cookies = cookies;
    }
};

DownloadsInterceptManager.prototype.buildRequestDetails = function(details)
{
    let requestDetails = new RequestDetails;

    requestDetails.url = details.url;
    requestDetails.time = + new Date;
    requestDetails.tabId = details.tabId;
    requestDetails.initiator = details.initiator;

    requestDetails.documentUrl = details.documentUrl;
    if (!requestDetails.documentUrl && this.tabsMgr && details.tabId !== -1 && this.tabsMgr.tabExists(details.tabId))
        requestDetails.documentUrl = this.tabsMgr.tabs[details.tabId].url;

    if (details.method == "POST")
    {
        requestDetails.postData = "&";

        if (undefined != details.requestBody && undefined != details.requestBody.formData)
        {
            for (var field in details.requestBody.formData)
            {
                for (var i = 0; i < details.requestBody.formData[field].length; ++i)
                {
                    requestDetails.postData += field + "=" +
                        encodeURIComponent(details.requestBody.formData[field][i]) +
                        "&";
                }
            }
        }
    }

    return requestDetails;
}

DownloadsInterceptManager.prototype.onBeforeRequest = function(details)
{
    if (!this.enable || this.pauseCatchingForAllSites || this.inSkipList(details.url, false))
        return;

    let requestDetails = this.buildRequestDetails(details);

    this.requestDetailsByRequestId.set(details.requestId, requestDetails);

    if (browser.runtime.getManifest().manifest_version < 3)
        setTimeout(this.requestDetailsByRequestId.delete.bind(this.requestDetailsByRequestId, details.requestId), 120000);
    else
        startTimerAlarm('NRMRequestDetailsByRequestId', 120000, () => this.requestDetailsByRequestId.delete.bind(this.requestDetailsByRequestId, details.requestId));

    this.requestDetailsByRequestUrl.push(requestDetails);

    if (browser.runtime.getManifest().manifest_version < 3)
        setTimeout(this.removeRequestDetailsByOriginalUrl.bind(this, details.url, requestDetails.time), 120000);
    else
        startTimerAlarm('NRMRemoveRequestDetailsByOriginalUrl', 120000, () => this.removeRequestDetailsByOriginalUrl.bind(this, details.url, requestDetails.time));
};

DownloadsInterceptManager.prototype.onSendHeaders = function(
    details)
{
    if (!this.enable || this.pauseCatchingForAllSites || this.inSkipList(details.url, false))
        return;

    let rd = this.requestDetailsByRequestId.get(details.requestId);
    if (!rd)
        return;

    if (details.method == "POST" ||
        !this.supportsDeterminingFilename)
    {
        rd.requestHeaders = details.requestHeaders;
    }
};

DownloadsInterceptManager.prototype.buildResponseDetails = function(
    headers)
{
    let result = new ResponseDetails;

    result.responseHeaders = this.responseHeadersToMap(headers);

    if (result.responseHeaders.has("content-type"))
        result.contentType = result.responseHeaders.get("content-type").toLowerCase();

    if (result.responseHeaders.has("content-length"))
        result.contentLength = parseInt(result.responseHeaders.get("content-length"));

    return result;
}

DownloadsInterceptManager.prototype.onHeadersReceived = function(
    details)
{
    let rd = this.requestDetailsByRequestId.get(details.requestId);
    if (!rd)
        return;

    rd.responseDetails = this.buildResponseDetails(details.responseHeaders);

    if (!this.supportsDeterminingFilename)
        return this.interceptIfRequiredByHeaders(details);
};

DownloadsInterceptManager.prototype.onCompleted = function(
    details)
{
    this.onDoneWithRequest(details);
}

DownloadsInterceptManager.prototype.onErrorOccurred = function(
    details)
{
    this.onDoneWithRequest(details);
}

DownloadsInterceptManager.prototype.onDoneWithRequest = function (
    details)
{
    this.requestDetailsByRequestId.delete(details.requestId);
}

DownloadsInterceptManager.prototype.responseHeadersToMap = function(responseHeadersArr)
{
    if (!responseHeadersArr || !responseHeadersArr.length)
        return new Map();

    var headers_map = new Map();

    for (var i = 0; i < responseHeadersArr.length; i++)
    {
        headers_map.set(responseHeadersArr[i].name.toLowerCase(), responseHeadersArr[i].value);
    }

    return headers_map;
};

DownloadsInterceptManager.prototype.interceptIfRequiredByHeaders = function(
    details)
{
    var result;

    if (details.tabId < 0)
        return;

    var requestDetails = this.requestDetailsByRequestId.get(details.requestId);

    var in_skip_list = false;
    if (this.inSkipList(details.url, false)) {
        in_skip_list = true;
    } else if (details.originUrl && this.inSkipList(details.originUrl, true)) {
        in_skip_list = true;
    }

    if (this.enable && !this.pauseCatchingForAllSites &&
        !in_skip_list)
    {
        var file = false;
        var noContentLengthLimits = false;

        if (details.type != "xmlhttprequest" && 
            (details.method == "POST" || details.type == 'main_frame' || details.type == 'sub_frame'))
        {
            details.responseHeadersMap = requestDetails.responseDetails.responseHeaders;

            if (requestDetails.responseDetails.responseHeaders.has("content-disposition"))
            {
                file = true;
            }

            // prevent AJAX from breaking
            if (requestDetails.responseDetails.contentType)
            {
                if (requestDetails.responseDetails.contentType.indexOf("json") != -1 ||
                    requestDetails.responseDetails.contentType.indexOf("image/") != -1 ||
                    (requestDetails.responseDetails.contentType.indexOf("text") != -1 && requestDetails.responseDetails.contentType.indexOf("text/x-sql") == -1) ||
                    requestDetails.responseDetails.contentType.indexOf("javascript") != -1 ||
                    requestDetails.responseDetails.contentType.indexOf("application/x-protobuf") != -1 ||
                    requestDetails.responseDetails.contentType.indexOf("application/binary") != -1 ||
                    requestDetails.responseDetails.contentType.indexOf("application/pdf") != -1 ||
                    (details.url.indexOf("google.com") != -1 &&
                        (requestDetails.responseDetails.contentType.indexOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") != -1 ||
                            requestDetails.responseDetails.contentType.indexOf("application/vnd.ms-") != -1)))
                {
                    file = false;
                }
                else if (requestDetails.responseDetails.contentType.indexOf("application/x-bittorrent") != -1) 
                {
                    file = true;
                    noContentLengthLimits = true;
                }
                else if (details.method != "POST" && requestDetails.responseDetails.contentType.indexOf("application") != -1)
                {
                    file = true;
                }
            }

            if (file && !this.supportsDeterminingFilename)
            {
                if (requestDetails.responseDetails.contentLength !== -1)
                {
                    if (!noContentLengthLimits) {
                        if (requestDetails.responseDetails.contentLength < 1024 * 1024)
                            file = false; // we prefer to not intercept something we should rather than intercept something we shouldn't
                        else if (requestDetails.responseDetails.contentLength < this.skipSmaller)
                            file = false;
                    }
                }
                else
                {
                    // we prefer to not intercept something we should rather than intercept something we shouldn't
                    file = false;
                }
            }
        }

        if (file)
        {
            var returningDownloadIndex = this.returningDownloadIndexByOriginalUrl(
                details.url);
            if (returningDownloadIndex != -1)
            {
                if (!--this.returningDownloads[returningDownloadIndex].refCount)
                    this.returningDownloads.splice(returningDownloadIndex, 1);
            }
            else
            {
                var referrer = "";
                for (let j = 0; j < requestDetails.requestHeaders.length; ++j)
                {
                    let rheader = requestDetails.requestHeaders[j];
                    if (rheader.name.toLowerCase() == "referrer" ||
                        rheader.name.toLowerCase() == "referer")
                        referrer = rheader.value;
                }

                var downloadInfo = new DownloadInfo(
                    details.url,
                    "",
                    referrer,
                    requestDetails ? requestDetails.postData : "",
                    requestDetails ? requestDetails.documentUrl : "");

                downloadInfo.httpCookies = requestDetails.cookies;

                this.onDownloadIntercepted(downloadInfo, details);

                if (details.method === "POST")
                {
                    if (referrer)
                    {
                        // When referrer is empty, it just "redirects" to some empty page with chrome://extension as the URL (someone was complaining about that?)
                        browser.tabs.update(details.tabId, { 'url': referrer });
                    }

                    // Used to be cancel: true, but it messes up the tab ("Extension disabled the request" or smth like that) http://stackoverflow.com/a/18684302
                    result = { 'redirectUrl': "javascript:" };
                }
                else
                {
                    result = { 'cancel': true };
                }
            }
        }
    }

    return result;
};
