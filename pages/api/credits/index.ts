import got from 'got'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorResponse, successResponse } from '@/lib/helpers'
import { v4 as uuidv4 } from 'uuid'
import { authOptions } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return errorResponse(res, 'You must be logged in.', 401)
        }

        const { amount, currency = 'USD' } = req.body

        const transactionRefId = `learn-ease-txf-${uuidv4()}`

        const response = await got
          .post('https://api.flutterwave.com/v3/payments', {
            headers: {
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            json: {
              tx_ref: transactionRefId,
              amount: amount,
              currency: currency,
              redirect_url: 'http://localhost:3000/dashboard',
              customer: {
                email: session?.user?.email,
                name: session?.user?.name,
              },
              customizations: {
                title: 'LearnEase Credits Payments',
                logo:
                  'https://learnease.vercel.app/_next/image?url=%2F_static%2Ficons%2Fbuilding-block.png&w=64&q=75',
              },
            },
          })
          .json()

        return successResponse(res, 'Payment link generated', response!, 200)
      } catch (err) {
        // @ts-ignore
        console.log(err.code)
        // @ts-ignore
        console.log(err.response.body)
      }

      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
