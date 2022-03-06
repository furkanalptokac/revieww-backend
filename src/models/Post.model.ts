import mongoose from 'mongoose';

const date = new Date();
date.setHours(date.getHours() + 3);

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: date,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: date,
  },
});

export default mongoose.model('Post', Schema);
