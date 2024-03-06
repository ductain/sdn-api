const ConstructionTypes = require("../models/ConstructionType");

class ConstructionTypeController {
  getAll(req, res, next) {
    ConstructionTypes.find({ status: true })
      .then((constructionTypes) => {
        res.status(200).json(constructionTypes);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const constructionTypeId = req.params.Id;
    ConstructionTypes.findOne({_id: constructionTypeId, status: true})
      .then((constructionType) => {
        res.status(200).json(constructionType);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    const constructionType = new ConstructionTypes(req.body);
    ConstructionTypes.findOne({ name: constructionType.name, status: true })
      .then((constructionTypeName) => {
        if (constructionTypeName) {
          return res
            .status(404)
            .json("Construction Type with the same name already exist");
        } else {
          return constructionType
            .save()
            .then(() => {
              res.status(200).json("Created successfully");
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  updateById(req, res, next) {
    const Id = req.params.Id;
    ConstructionTypes.findOne({
      name: req.body.name,
      _id: { $ne: Id },
      status: true,
    })
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Construction Type with the same name already exist");
        }
        return ConstructionTypes.findByIdAndUpdate(
          { _id: req.params.Id },
          {
            $set: req.body,
          },
          { new: true }
        )
          .then(() => {
            res.status(200).json("Updated successfully!");
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  delete(req, res, next) {
    ConstructionTypes.findByIdAndUpdate(
      { _id: req.params.Id },
      {
        $set: { status: false },
      },
      { new: true }
    )
      .then(() => {
        res.status(200).json("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new ConstructionTypeController();
