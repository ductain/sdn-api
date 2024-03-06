const ConstructionItems = require("../models/ConstructionItem");
class ConstructionItemController {
  getAll(req, res, next) {
    ConstructionItems.find({ status: true })
      .then((constructionItems) => {
        res.status(200).json(constructionItems);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const constructionItemId = req.params.Id;
    ConstructionItems.findOne({ _id: constructionItemId, status: true })
      .then((constructionItem) => {
        res.status(200).json(constructionItem);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    const constructionItem = new ConstructionItems(req.body);
    ConstructionItems.findOne({ name: constructionItem.name, status: true })
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Construction Item with the same name is already exist");
        } else {
          return ConstructionItems.create(req.body)
            .then((constructionItem) => {
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
    ConstructionItems.findOne({
      name: req.body.name,
      _id: { $ne: Id },
      status: true,
    })
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Construction Item with the same name is already exist");
        } else {
          return ConstructionItems.findByIdAndUpdate(
            req.params.Id,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then((constructionItem) => {
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
    ConstructionItems.findByIdAndUpdate(
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

module.exports = new ConstructionItemController();
