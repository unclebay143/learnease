import { NextApiRequest, NextApiResponse } from 'next'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { Feedback } from 'models/Feedback'
import { Response } from 'models/Response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        await connectToMongoDb()
        const payload = req.body
        const feedbackRes = await Feedback.create(payload)

        if (payload.responseId) {
          console.log('inside responseId')
          const r = await Response.findOneAndUpdate(
            { _id: payload.responseId },
            {
              $set: {
                hasGivenFeedback: true,
              },
            },
          )
          console.log(r)
        }

        return successResponse(
          res,
          'Feedback added successfully',
          feedbackRes,
          200,
        )
      } catch (error) {
        return errorResponse(res, 'something went wrong', 400)
      }

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
