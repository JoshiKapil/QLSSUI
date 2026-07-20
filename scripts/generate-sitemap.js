const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const appRoutingPath = path.join(projectRoot, 'src', 'app', 'app-routing.module.ts');
const sitemapPath = path.join(projectRoot, 'src', 'sitemap.xml');
const robotsPath = path.join(projectRoot, 'src', 'robots.txt');
const siteUrl = (process.env.SITE_URL || 'https://YOURDOMAIN.COM').replace(/\/+$/, '');
const lastmod = new Date().toISOString().slice(0, 10);

const excludedSegments = [
  'login',
  'register',
  'forgot-password',
  'forgotpassword',
  'reset-password',
  'change-password',
  'changepassword',
  'dashboard',
  'admin',
  'profile',
  'checkout',
  'account'
];

const priorityByRoute = new Map([
  ['', '1.0'],
  ['training', '0.8'],
  ['contact', '0.7'],
  ['about', '0.7'],
  ['faq', '0.7'],
  ['teams', '0.8']
]);

function normalizeRoute(route) {
  return route.replace(/^\/+|\/+$/g, '');
}

function isExcluded(route) {
  return excludedSegments.some((segment) => route === segment || route.startsWith(`${segment}/`));
}

function getPriority(route) {
  if (priorityByRoute.has(route)) {
    return priorityByRoute.get(route);
  }

  if (/course|exam|package/.test(route)) {
    return '0.9';
  }

  if (/teacher|team|training|certification/.test(route)) {
    return '0.8';
  }

  if (/privacy|terms|disclaimer/.test(route)) {
    return '0.5';
  }

  return '0.7';
}

function getChangefreq(route) {
  if (route === '') {
    return 'weekly';
  }

  if (/training|course|exam|package|gallery|client/.test(route)) {
    return 'weekly';
  }

  return 'monthly';
}

const routingSource = fs.readFileSync(appRoutingPath, 'utf8');
const routeMatches = Array.from(
  routingSource.matchAll(/\{\s*path:\s*['"]([^'"]*)['"][\s\S]*?loadChildren:/g)
);

const publicRoutes = Array.from(
  new Set(
    routeMatches
      .map((match) => normalizeRoute(match[1]))
      .filter((route) => route !== '**')
      .filter((route) => !isExcluded(route))
  )
).sort((a, b) => {
  if (a === '') return -1;
  if (b === '') return 1;
  return a.localeCompare(b);
});

const urls = publicRoutes
  .map((route) => {
    const loc = route ? `${siteUrl}/${route}` : `${siteUrl}/`;

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${getChangefreq(route)}</changefreq>`,
      `    <priority>${getPriority(route)}</priority>`,
      '  </url>'
    ].join('\n');
  })
  .join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(sitemapPath, sitemap);

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  'Disallow: /admin/',
  'Disallow: /dashboard/',
  'Disallow: /profile/',
  'Disallow: /checkout/',
  'Disallow: /account/',
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  ''
].join('\n');

fs.writeFileSync(robotsPath, robots);
console.log(`Generated ${path.relative(projectRoot, sitemapPath)} with ${publicRoutes.length} public routes.`);
console.log(`Generated ${path.relative(projectRoot, robotsPath)}.`);
