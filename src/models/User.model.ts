import mongoose from 'mongoose';

const date = new Date();
date.setHours(date.getHours() + 3);

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  languages: {
    type: [String],
    required: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    default: [],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  date: {
    type: Date,
    default: date,
  },
});

export default mongoose.model('User', Schema);
