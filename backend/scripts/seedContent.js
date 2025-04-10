// scripts/seedContent.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/Content.js';

dotenv.config(); // Load MONGODB_URI from .env

const sampleContent = [
  {
    title: "Top 5 Productivity Tools for Creators",
    type: "blog",
    description: "Discover the best tools that help content creators manage time, organize ideas, and publish faster.",
    tags: ["productivity", "tools", "creators"],
    status: "published",
    publishedDate: new Date("2025-04-01")
  },
  {
    title: "Quick Twitter Tip",
    type: "tweet",
    description: "Use threads to break down complex ideas into digestible chunks. Engagement goes up when your tweets offer value over time.",
    tags: ["twitter", "engagement", "tips"],
    status: "draft"
  },
  {
    title: "How to Start a YouTube Channel in 2025",
    type: "video",
    description: "This step-by-step guide walks you through setting up your channel, optimizing your first video, and getting your first 100 subscribers.",
    tags: ["youtube", "growth", "guide"],
    status: "scheduled",
    scheduledDate: new Date("2025-04-15")
  },
  {
    title: "3 Hacks for Better Reels",
    type: "reel",
    description: "Reels getting no views? Try these 3 quick hacks to instantly boost your reach and engagement.",
    tags: ["instagram", "reels", "hacks"],
    status: "published",
    publishedDate: new Date("2025-04-09")
  },
  {
    title: "Monday Motivation 💪",
    type: "post",
    description: "“The secret of getting ahead is getting started.” Let’s crush this week! 🔥",
    tags: ["motivation", "monday", "quote"],
    status: "draft"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Content.deleteMany(); // Optional: clear old data
    await Content.insertMany(sampleContent);

    console.log('Sample content seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding content:', err);
    process.exit(1);
  }
};

seedDB();
