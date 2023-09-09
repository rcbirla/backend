const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ["linkedin", "instagram", "facebook", "twitter"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});
const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    avenue1: {
      type: String,
      required: true,
    },
    avenue2: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    isJointProject: {
      type: Boolean,
      default: false,
    },
    aim: {
      type: String,
      default: "",
    },
    aim: {
      type: String,
      default: "",
    },
    groundWork: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    feedbacks: {
      type: [FeedbackSchema],
      default: [],
    },
    income: {
      type: Number,
      default: 0,
    },
    expense: {
      type: Number,
      default: 0,
    },
    chairperson: {
      type: String,
      required: true,
    },
    attendance: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      required: true,
    },
    supportDocumentsUrl: {
      type: String,
      required: true,
    },
    socialMediaLinks: {
      type: [SocialMediaSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
