import { User } from 'models/User'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorResponse, successResponse } from '@/lib/helpers'
import connectToMongoDb from '@/lib/connectDb'
import { AppStat } from 'models/AppStat'
import { authOptions } from './auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        //Test: const session = { user: { email: 'unclebigbay@gmail.com' } }

        await connectToMongoDb()

        const promptResponse = await AppStat.find({
          _id: '642605f56f4a4507868a9986',
        })

        return successResponse(
          res,
          'App stat retrieved successfully',
          promptResponse,
          200,
        )
      } catch (error) {
        console.log(error)
        return errorResponse(res, 'something went wrong', 400)
      }

    case 'POST':
      try {
        // Test:const session = { user: { email: 'unclebigbay@gmail.com' } }

        await connectToMongoDb()

        await AppStat.findOneAndUpdate(
          { _id: '642605f56f4a4507868a9986' },
          {
            $inc: {
              response_count: 1,
            },
          },
        )

        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(
            res,
            'No credit used. New response recorded',
            200,
          )
        }

        const user = await User.findOne({ email: session?.user?.email })
        if (user) {
          if (user.freeCredits > 0) {
            await User.findOneAndUpdate(
              { email: session?.user?.email },
              {
                $inc: {
                  freeCredits: -1,
                },
              },
            )
          } else if (user.credits > 0) {
            await User.findOneAndUpdate(
              { email: session?.user?.email },
              {
                $inc: {
                  credits: -1,
                },
              },
            )
          }
        }

        return successResponse(
          res,
          '1 Credit used. New response recorded',
          {},
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
