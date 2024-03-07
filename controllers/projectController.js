const Projects = require("../models/Project");
class ProjectController {
  getAll(req, res, next) {

    Projects.find({ status: true })
      .populate("constructionType")
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const projectId = req.params.Id;
    Projects.findOne({ _id: projectId, status: true })
      .populate("constructionType")
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    const project = new Projects(req.body);
    Projects.findOne({ name: project.name, status: true })
      .populate("constructionType")
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Project with the same name is already existed");
        } else {
          return Projects.create(req.body)
            .then((project) => {
              res.status(200).json("Created successfully");
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }

  updateById(req, res, next) {
    const Id = req.params.Id;
    Projects.findOne({
      name: req.body.name,
      _id: { $ne: Id },
      status: true,
    })
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Project with the same name is already exist");
        } else {
          return Projects.findByIdAndUpdate(
            req.params.Id,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then((project) => {
              res.status(200).json("Updated successfully");
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  delete(req, res, next) {
    Projects.findByIdAndUpdate(
      req.params.Id,
      {
        $set: { status: false },
      },
      { new: true }
    )
      .then(() => {
        res.status(200).json("Deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new ProjectController();
