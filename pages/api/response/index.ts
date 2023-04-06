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

        const promptResponse = await Response.find({
          email: session?.user?.email,
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
        // TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }

        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        await connectToMongoDb()

        // const payload = JSON.parse(req.body) // parsing bcos req.body came as string for some unknown reasons
        const payload = req.body // parsing bcos req.body came as string for some unknown reasons
        payload.user = new ObjectId(payload.userId)
        delete payload.userId
        const newPromptResponse = await Response.create(payload)

        await User.findOneAndUpdate(
          { email: session?.user?.email },
          {
            $push: {
              saved_response: new ObjectId(newPromptResponse._id),
            },
          },
        )

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

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
