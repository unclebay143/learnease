import { NextApiRequest, NextApiResponse } from 'next'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { Response } from 'models/Response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        await connectToMongoDb()
        const payload = req.body

        if (!payload.responseId) {
          return errorResponse(res, 'responseId is required', 400)
        }
        const r = await Response.findOneAndUpdate(
          { _id: payload.responseId },
          {
            $set: {
              hasGivenFeedback: true,
              isUseful: payload.isUseful,
            },
          },
        )
        return successResponse(
          res,
          'Response feedback recorded successfully',
          r,
          200,
        )
      } catch (error) {
        return errorResponse(res, 'something went wrong', 400)
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
