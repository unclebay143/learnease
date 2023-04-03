import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { Response } from 'models/Response'

import { User } from 'models/User'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req

  switch (method) {
    case 'GET':
      try {
        //Test: const session = { user: { email: 'unclebigbay@gmail.com' } }

        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        await connectToMongoDb()

        const promptResponse = await Response.findOne({
          _id: query.id,
        })

        if (!promptResponse) {
          return errorResponse(res, 'Response not found', 404)
        }

        return successResponse(
          res,
          'Prompt response retrieved successfully',
          promptResponse,
          200,
        )
      } catch (error) {
        console.log(error)
        return errorResponse(res, 'something went wrong', 400)
      }

    case 'PUT':
      try {
        //TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        await connectToMongoDb()

        const promptResponse = await Response.findOne({
          _id: query.id,
        })

        if (!promptResponse) {
          return errorResponse(res, 'Response not found', 404)
        }

        let newPromptFavoriteStatus = !promptResponse.isFavorite

        const updatedPromptResponse = await Response.findOneAndUpdate(
          { _id: query.id },
          {
            isFavorite: newPromptFavoriteStatus,
          },
        )

        return successResponse(
          res,
          'Prompt favorite status updated successfully',
          updatedPromptResponse,
          200,
        )
      } catch (error) {
        console.log(error)
        return errorResponse(res, 'something went wrong', 400)
      }

    case 'DELETE':
      try {
        const responseId = query.id
        await connectToMongoDb()
        const isPromptResponseExist = Response.findOne({
          _id: responseId,
        })

        if (!isPromptResponseExist) {
          return errorResponse(res, 'Prompt response does not exist', 404)
        }

        const promptRes = await Response.findOneAndDelete({ _id: responseId })
        const user = await User.findOne({ _id: promptRes.user })
        const newUserSavedResponse = user.saved_response.filter(
          (id: string) => id.toString() !== responseId,
        )

        return successResponse(
          res,
          'Prompt response deleted successfully',
          newUserSavedResponse,
          200,
        )
      } catch (error) {}

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
