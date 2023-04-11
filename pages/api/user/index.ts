import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { User } from 'models/User'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return res.status(401).json({ message: 'You must be logged in.' })
        }

        // TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }

        await connectToMongoDb()
        const user = await User.findOne({ email: session.user?.email })

        if (!user) {
          // Only authenticated user through i.e google can access this route
          // If user record not found in db, add it, it's already added in google auth
          // might want to rethink edge cases here if any?
          const newUser = await User.create({
            ...session?.user,
          })
          return successResponse(
            res,
            'user added to db successfully',
            newUser,
            200,
          )
        } else {
          return successResponse(
            res,
            'user profile fetched successfully',
            user,
            200,
          )
        }
      } catch (error) {
        return errorResponse(res, 'something went wrong', 400)
      }

    case 'PUT':
      try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return res.status(401).json({ message: 'You must be logged in.' })
        }

        const { language, level } = req.body

        // TEST: const session = { user: { email: 'unclebigbay@gmail.com' } }

        await connectToMongoDb()
        const user = await User.findOneAndUpdate(
          { email: session.user?.email },
          { $set: { language, level } },
        )

        return successResponse(
          res,
          'Preference updated successfully',
          user,
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
