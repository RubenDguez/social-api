import { Document, ObjectId, Schema } from 'mongoose';

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  reactionId: {
    type: Schema.Types.ObjectId,
  },
  reactionBody: {
    type: Schema.Types.String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

reactionSchema.virtual('getCreatedAt').get(function () {
  `${this.createdAt.toLocaleDateString()} at ${this.createdAt.toLocaleTimeString()}`;
});

export default reactionSchema;
