import { NextApiRequest, NextApiResponse } from 'next'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'

import { Response } from 'models/Response'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        await connectToMongoDb()
        const promptResponses = await Response.find({})
        const containsMamaMama = promptResponses.map((p) => {
          if (p.markdown.includes('mama mama')) {
            return p
          }
        })

        return successResponse(
          res,
          'responses fetched successfully',
          containsMamaMama,
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
