// server/models/Content.js
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String, // e.g. blog, tweet, reel, video
    enum: ['blog', 'tweet', 'video', 'reel', 'post'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String],

  status: {
    type: String, // draft, scheduled, published
    enum: ['draft', 'scheduled', 'published'],
    default: 'draft',
  },

  scheduledDate: {
    type: Date,
  },
  publishedDate: {
    type: Date,
  },

  engagement: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Content', ContentSchema);
