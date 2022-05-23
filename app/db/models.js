import { mongoose } from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    profileImg: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    tags: [
      {
        type: String,
      }
    ],
    linkedIn: {
      type: String,
    },
    personalWeb: {
      type: String,
    },
    createdAt: {
      type: Date,
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
];
