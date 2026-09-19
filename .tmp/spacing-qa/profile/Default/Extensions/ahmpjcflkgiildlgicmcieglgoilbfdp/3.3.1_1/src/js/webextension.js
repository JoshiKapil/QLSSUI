if (typeof window === 'undefined') {
    var window = self;
}

window.browser = (function ()
{
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

window.browserName = (function()
{
    if (window.msBrowser)
        return "Edge";
    if (window.browser && typeof InstallTrigger !== 'undefined')
        return "Firefox";
    if (window.navigator.userAgent.toLowerCase().includes('firefox'))
        return "Firefox";
    return "Chrome";
})();

window.chromeVersion = (function()
{
    if (window.browserName === "Chrome")
      return parseInt(/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1]);
    return 0;
})();

var browser = window.browser; //TODO: is it really required??

async function startTimerAlarm(name, delayInMsec, callback) {
    if (delayInMsec >= 30000) {
        await browser.alarms.create(name, { when: (Date.now() + delayInMsec) }, callback);
    } else {
        await browser.alarms.create(name, { when: (Date.now() + delayInMsec) });
    }
}

function manifestV2BlockingArray(a)
{
    if (browser.runtime.getManifest().manifest_version > 2)
        return a;
    
    a.push("blocking");
    
    return a;
}