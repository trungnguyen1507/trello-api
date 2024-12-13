import { env } from '~/config/environment'

export const WHITELIST_DOMAINS = [
  // Không cần localhost nữa vì file config/cors đã luôn luôn cho phép môi trường dev
  // 'http://localhost:5173'
  'https://trello-web-sigma.vercel.app'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

export const WEBSITE_DOMAIN =
  env.BUILD_MODE === 'production' ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12
