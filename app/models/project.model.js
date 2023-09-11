const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: [
      "instagram",
      "facebook",
      "twitter",
      "spotify",
      "threads",
      "snapchat",
      "pinterest",
    ],
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
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    reportingStatus: {
      type: String,
      enum: ["early", "on_time", "late"],
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
    jointProjectWith: {
      type: String,
      required: function () {
        return this.isJointProject;
      },
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
    coverImageUrl: {
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: String,
      index: {
        unique: true,
      },
      required: true,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    reportingMonth: {
      type: String,
      required: true,
    },
    reportingQuarter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
