import mongoose, { Schema, model, models } from 'mongoose'

const AppStatSchema = new Schema(
  {
    response_count: Number,
    liked_response_count: Number,
    disliked_response_count: [
      {
        title: String,
        response: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.clientId = ret._id
        delete ret.__v
        delete ret._id
      },
    },
    timestamps: true,
    collection: 'appstats',
  },
)

const AppStat = models.AppStat || model('AppStat', AppStatSchema)

export { AppStat }
