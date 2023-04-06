import { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'models/User'
import { Payment } from 'models/Payment'
import connectToMongoDb from '@/lib/connectDb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Only supported method is POST' })
  }

  const hash = process.env.FLUTTER_HASH_KEY

  if (hash !== req.headers['verif-hash']) {
    console.log('Invalid Signature')
    return res.status(400).json({ message: 'Invalid signature!' })
  }

  const payload = req.body
  const event = payload['event.type']
  console.log(event)
  console.log(payload)

  switch (event) {
    case 'CARD_TRANSACTION':
      try {
        const amountSwapCredits: { [key: number]: number } = {
          5: 20, // amount: credit
          19: 100,
          35: 250,
          75: 750,
        }
        let credits = amountSwapCredits[payload.amount]

        await connectToMongoDb()

        const user = await User.findOne({ email: payload.customer.email })

        await Payment.create({
          user: user._id,
          txRef: payload?.txRef,
          email: payload.customer.email,
          status: payload.status,
          amount: payload.amount,
          currency: payload.currency,
          creditWorth: credits,
        })

        await User.findOneAndUpdate(
          { email: payload.customer.email },
          {
            $inc: {
              credits: credits, // add new credit to existing credits
            },
          },
        )

        return res
          .status(200)
          .json({ message: 'Webhook card_transaction success' })
      } catch (error) {
        console.log('something went wrong')
        return res
          .status(500)
          .json({ message: 'Something went wrong: ' + error })
      }

    default:
      console.log('event not covered!' + event)
      break
  }
}

export default handler
