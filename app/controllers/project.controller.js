const moment = require("moment");
const Project = require("../models/project.model");

function getReportingQuarter(month) {
  switch (true) {
    case month >= 7 && month <= 9:
      return "QUARTER 1";
      break;
    case month >= 10 && month <= 12:
      return "QUARTER 2";
      break;
    case month >= 1 && month <= 3:
      return "QUARTER 3";
      break;
    default:
      return "QUARTER 4";
  }
}
module.exports = {
  getAll: async (req, res) => {
    try {
      const projects = await Project.find();
      return res.send({ data: projects });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },
  get: async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
      return res.send({ data: project });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },
  create: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const nextMonth3Date = moment(endDate)
        .date(3)
        .month(moment(startDate).month() + 1);
      let reportingStatus = "late";
      if (moment().diff(nextMonth3Date) <= 0) {
        if (Math.abs(moment(endDate).diff(moment(), "days")) <= 7) {
          reportingStatus = "early";
        } else {
          reportingStatus = "on_time";
        }
      }
      const projectId = `RCBKB${moment().year()}${Date.now()}`;
      const project = await new Project({
        ...req.body,
        reportingStatus,
        createdBy: req.user._id,
        projectId,
        reportingMonth: moment(endDate).format("MMMM"),
        reportingQuarter: getReportingQuarter(moment(endDate).month() + 1),
      }).save();
      return res.send({
        message: "Project created!",
        data: project,
      });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },
  update: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { _id, ...props } = req.body;
      const project = await Project.findByIdAndUpdate(
        projectId,
        { ...props },
        {
          new: true,
        }
      );
      return res.send({ message: "Project updated!", data: project });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },

  // admin routes
  // create: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
