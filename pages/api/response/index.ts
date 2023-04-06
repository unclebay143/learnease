import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { Response } from 'models/Response'
import { ObjectId } from 'mongodb'
import { User } from 'models/User'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        // TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }

        await connectToMongoDb()
        const user = await User.findOne({ email: session?.user?.email })

        const promptResponse = await Response.find({
          user: user?._id,
          isDeleted: false,
        })
          .sort({
            createdAt: -1,
          })
          .exec()

        return successResponse(
          res,
          'Prompt responses retrieved successfully',
          promptResponse,
          200,
        )
      } catch (error) {
        console.log(error)
        return errorResponse(res, 'something went wrong', 400)
      }

    case 'POST':
      try {
        await connectToMongoDb()
        const payload = req.body

        if (!payload.title || !payload.markdown) {
          return errorResponse(res, 'Title and markdown are required', 400)
        }

        const newPromptResponse = await Response.create(payload)

        return successResponse(
          res,
          'Prompt response saved successfully',
          newPromptResponse,
          200,
        )
      } catch (error) {
        console.log(error)
        return errorResponse(res, 'something went wrong', 400)
      }
    case 'PUT':
      try {
        // TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }

        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        await connectToMongoDb()

        const payload = req.body

        if (!payload.userId && !payload.responseId) {
          return errorResponse(res, 'userId and responseId are required', 400)
        }

        await User.findOneAndUpdate(
          { email: session?.user?.email },
          {
            $push: {
              saved_response: new ObjectId(payload.responseId),
            },
          },
        )

        const newPromptResponse = await Response.findOneAndUpdate(
          { _id: payload.responseId },
          {
            user: new ObjectId(payload.userId),
          },
        )

        return successResponse(
          res,
          'Prompt response saved to user record successfully',
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
