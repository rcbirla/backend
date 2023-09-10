const moment = require("moment");
const Project = require("../models/project.model");
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
      const nextMonth10Date = moment(startDate)
        .date(10)
        .month(moment(startDate).month() + 1);
      let reportingStatus = "late";
      if (Math.abs(moment(startDate).diff(moment(endDate), "days") <= 6)) {
        reportingStatus = "early";
      } else if (moment(endDate).diff(nextMonth10Date) <= 0) {
        reportingStatus = "on_time";
      }
      const projectId = `PROJ${moment().year()}${Date.now()}`;
      const project = await new Project({
        ...req.body,
        reportingStatus,
        createdBy: req.user._id,
        projectId,
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
