import { Document, model, Schema } from 'mongoose';

import Reactions from './Reactions.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof Reactions[];
}

const thoughtsSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: Schema.Types.String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
    },
    username: {
      type: Schema.Types.String,
      required: true,
    },
    reactions: [Reactions],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  },
);

thoughtsSchema.virtual('getCreatedAt').get(function () {
  return `${this.createdAt.toLocaleDateString()} at ${this.createdAt.toLocaleTimeString()}`;
});

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtsSchema);

export default Thought;
