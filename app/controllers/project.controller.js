const Project = require("../models/project.model");
module.exports = {
  getAll: async (req, res) => {
    try {
      const projects = await Project.aggregate();
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
      const project = await new Project(req.body).save();
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
  create: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
