import mongoose, { Schema, model, models } from 'mongoose'
import Joi from 'joi'

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    isOnboardingDone: { type: Boolean, default: false },
    saved_response: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response',
      },
    ],
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.userId = ret._id
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
        delete ret._id
      },
    },
    timestamps: true,
    collection: 'users',
  },
)

const validateUser = (user: object) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    email: Joi.string().email().required().label('Email'),
    isOnboarded: Joi.boolean(),
    image: Joi.string(),
  })

  return schema.validate(user)
}

const User = models.User || model('User', UserSchema)

export { User, validateUser }
