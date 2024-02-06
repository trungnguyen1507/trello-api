export const WHITELIST_DOMAINS = [
  // Không cần localhost nữa vì file config/cors đã luôn luôn cho phép môi trường dev
  // 'http://localhost:5173'
  'https://trello-web-sigma.vercel.app'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}
