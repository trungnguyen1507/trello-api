import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNewBoardInvitation = async (req, res, next) => {
  const correctCondition = Joi.object({
    inviteeEmail: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })

  try {
    // abortEarly: false để trường hợp có nhiều lối validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const invitationValidation = {
  createNewBoardInvitation
}
