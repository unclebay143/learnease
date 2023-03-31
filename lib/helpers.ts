import { NextApiResponse } from 'next'

export const successResponse = (
  res: NextApiResponse,
  message: string = 'Successful',
  data?: object,
  code: number = 200,
) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  })
}

export const errorResponse = (
  res: NextApiResponse,
  message: string = 'Oops! An error occurred.',
  code: number = 500,
) => {
  return res.status(code).json({
    error: true,
    message,
  })
}