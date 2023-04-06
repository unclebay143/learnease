import mongoose, { Schema, model, models } from 'mongoose'
import Joi from 'joi'

const AppResponseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: String,
    markdown: String,
    hasGivenFeedback: Boolean,
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
    collection: 'appresponse',
  },
)

const validateNewAppResponse = (response: object) => {
  const schema = Joi.object({
    title: Joi.string().label('Response title'),
    address: Joi.string().label('Response markdown'),
  })

  return schema.validate(response)
}

const AppResponse =
  models.AppResponse || model('AppResponse', AppResponseSchema)

export { AppResponse, validateNewAppResponse }
