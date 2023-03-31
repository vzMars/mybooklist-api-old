const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: [String],
    cover: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['reading', 'completed', 'planning'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);
