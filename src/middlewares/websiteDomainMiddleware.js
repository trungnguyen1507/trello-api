export const websiteDomainMiddleware = (req, res, next) => {
  const origin = req.headers.origin || req.headers.host

  if (origin && origin.includes('localhost')) {
    req.websiteDomain = process.env.WEBSITE_DOMAIN_DEVELOPMENT
  } else {
    req.websiteDomain = process.env.WEBSITE_DOMAIN_PRODUCTION
  }

  next()
}
