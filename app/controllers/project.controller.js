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

function getReportingStatus(startDate, endDate) {
  const nextMonth3Date = moment(endDate)
    .date(3)
    .month(moment(startDate).month() + 1);
  let reportingStatus = "late";
  // Reporting time is more than 3rd of expected month
  if (moment().diff(nextMonth3Date) > 0) {
    reportingStatus = "late";
  } else if (moment().diff(nextMonth3Date) <= 0) {
    if (Math.abs(moment(endDate).diff(moment(), "days")) <= 7) {
      reportingStatus = "early";
    } else {
      reportingStatus = "on time";
    }
  }
  return reportingStatus;
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
      if (project) {
        return res.send({ data: project });
      }
      return res.status(404).send({ message: "Project not found!" });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },
  create: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const reportingStatus = getReportingStatus(startDate, endDate);
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
      const { _id, startDate, endDate, ...props } = req.body;
      const reportingStatus = getReportingStatus(startDate, endDate);
      const project = await Project.findByIdAndUpdate(
        projectId,
        { ...props, reportingStatus, startDate, endDate },
        {
          new: true,
        }
      );
      if (project) {
        return res.send({ message: "Project updated!", data: project });
      }
      return res.status(404).send({ message: "Project not found!" });
    } catch (error) {
      return res.status(500).send({ message: error.message || "Server error" });
    }
  },

  // admin routes
  // create: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
