import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // console.log('req body: ', req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Test Error')
    // Điều hướng dữ liệu sang tầng Service
    const createdCard = await cardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const cardId = req.params.id
    const updatedCard = await cardService.update(cardId, req.body)

    res.status(StatusCodes.OK).json(updatedCard)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew,
  update
}
