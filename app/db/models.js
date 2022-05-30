import { mongoose } from "mongoose";

const { Schema } = mongoose;

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
    }
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
  }
];
