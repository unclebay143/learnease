import mongoose, { Schema, model, models } from 'mongoose'

const PaymentSchema = new Schema(
  {
    txRef: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: String,
    status: String,
    amount: Number,
    currency: { type: String, required: true, enum: ['NGN', 'USD'] },
    creditWorth: Number,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
      },
    },
    timestamps: true,
    collection: 'payments',
  },
)

const Payment = models.Payment || model('Payment', PaymentSchema)

export { Payment }
