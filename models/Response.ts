import mongoose, { Schema, model, models } from 'mongoose'
import Joi from 'joi'

const ResponseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: String,
    isFavorite: { type: Boolean, default: false },
    markdown: String,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.responseId = ret._id
        delete ret.__v
        delete ret._id
      },
    },
    timestamps: true,
    collection: 'response',
  },
)

const validateNewResponse = (response: object) => {
  const schema = Joi.object({
    title: Joi.string().label('Response title'),
    address: Joi.string().label('Response markdown'),
  })

  return schema.validate(response)
}

const Response = models.Response || model('Response', ResponseSchema)

export { Response, validateNewResponse }
