import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { JwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'

const isAuthorized = async (req, res, next) => {
  // Lấy accessToken từ request cookie phía Client
  const clientAccessToken = req.cookies?.accessToken

  // Nếu token không tồn tại
  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (token not found)'))
    return
  }

  try {
    // Bước 1: Giải mã token xem nó có hợp lệ không
    const accessTokenDecoded = await JwtProvider.verifyToken(clientAccessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)

    // Bước 2: Nếu token hợp lệ, lưu thông tin giải mã vào req.jwtDecoded để sử dụng cho các tầng phía sau
    req.jwtDecoded = accessTokenDecoded

    // Bước 3: Cho request đi tiếp
    next()
  } catch (error) {
    // Nếu accessToken bị hết hạn, trả về mã lỗi GONE - 410 cho FE biết và gọi API refreshToken
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token!'))
      return
    }

    // Nếu accessToken không hợp lệ vì lý do khác, trả về lỗi Unauthorized cho phía FE gọi API signOut luôn
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized!'))
  }
}

export const authMiddleware = {
  isAuthorized
}
