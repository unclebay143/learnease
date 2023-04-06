import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { ObjectId } from 'mongodb'
import { User } from 'models/User'
import { AppResponse } from 'models/AppResponse'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        // TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }

        const session = await getServerSession(req, res, authOptions)
        const payload = req.body
        await connectToMongoDb()

        if (!session) {
          const newPromptResponse = await AppResponse.create(payload)
          return successResponse(
            res,
            'Public prompt response saved successfully',
            newPromptResponse,
            200,
          )
        }

        payload.user = new ObjectId(payload.userId)
        delete payload.userId
        const newPromptResponse = await AppResponse.create(payload)

        await User.findOneAndUpdate(
          { email: session?.user?.email },
          {
            $push: {
              unsaved_response: new ObjectId(newPromptResponse._id),
            },
          },
        )

        return successResponse(
          res,
          'Prompt response copy saved successfully',
          newPromptResponse,
          200,
        )
      } catch (error) {
        console.log(error)
        return errorResponse(res, 'something went wrong', 400)
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
