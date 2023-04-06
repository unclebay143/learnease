import { Schema, model, models } from 'mongoose'
import Joi from 'joi'

const FeedbackSchema = new Schema(
  {
    title: String,
    markdown: String,
    isUseful: Boolean,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
        delete ret._id
      },
    },
    timestamps: true,
    collection: 'feedback',
  },
)

const validateFeedback = (response: object) => {
  const schema = Joi.object({
    title: Joi.string(),
    markdown: Joi.string(),
    isUseFul: Joi.boolean(),
  })

  return schema.validate(response)
}

const Feedback = models.Feedback || model('Feedback', FeedbackSchema)

export { Feedback, validateFeedback }
