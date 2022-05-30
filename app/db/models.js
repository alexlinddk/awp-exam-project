import { mongoose } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Gotta have a username"],
      minLength: [3, "That's too short"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tagSchema = new Schema({
    type: String,
});

const profileSchema = new Schema(
  {
    profileImg: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    tags: [tagSchema],
    linkedIn: {
      type: String,
    },
    personalWeb: {
      type: String,
    },
    createdAt: {
      type: Date,
      timestamps: true
    },
    userId: {
      type: { type: Schema.Types.ObjectId, ref: 'User' },

    }
        // TODO: add a `userId` property of type Schema.Types.ObjectId with a `ref` to the User model:
    // https://mongoosejs.com/docs/populate.html
  },
  { timestamps: true }
);


export const models = [
  {
    name: "Profile",
    schema: profileSchema,
    collection: "profiles",
  },
  {
    name: "Tag",
    schema: tagSchema,
    collection: "tags"
  },
  {
    name: "User",
    schema: userSchema,
    collection: "users"
  }
];
