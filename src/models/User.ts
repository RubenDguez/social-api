import { Document, model, ObjectId, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: Schema.Types.String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { toJSON: { virtuals: true }, id: false },
);

userSchema
.virtual('friendCount').get(function (this: any) {
    return this.friends.length
})

const User = model('User', userSchema);

export default User;
