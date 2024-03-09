const Projects = require("../models/Project");
const ConstructionTypes = require("../models/ConstructionType");
const ConstructionItems = require("../models/ConstructionItem");
const createQuote = require("./quoteController").create;
const updateQuote = require("./quoteController").updateById;
const deleteQuote = require("./quoteController").delete;

class ProjectController {
  getAll(req, res, next) {
    Projects.find({ status: true })
      .populate("constructionType")
      .populate("constructionItemsOrder.constructionItem")
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
      .populate("constructionItemsOrder.constructionItem")
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  async create(req, res, next) {
    try {
      const constructionType = await ConstructionTypes.findOne({
        _id: req.body.constructionType,
      });
      if (!constructionType) {
        return res.status(404).json("Construction type not found");
      }
      let packageCost =
        constructionType.value * req.body.area * req.body.floors;

      let totalItemsCost = 0;
      const itemCostPromises = req.body.constructionItemsOrder.map(
        async (itemOrder) => {
          const constructionItem = await ConstructionItems.findOne({
            _id: itemOrder.constructionItem,
          });
          if (!constructionItem) {
            throw new Error("Construction item not found");
          }
          itemOrder.itemCost = constructionItem.value * itemOrder.quantity;
          totalItemsCost += itemOrder.itemCost;
        }
      );

      // Wait for all item cost promises to resolve
      await Promise.all(itemCostPromises);

      const project = new Projects({
        ...req.body,
        packageCost: packageCost,
        totalItemsCost: totalItemsCost,
        constructionItemsOrder: req.body.constructionItemsOrder,
      });

      await project.save();
      // Create the quote
      const quoteReq = {
        body: {
          project: project._id,
          total: packageCost + totalItemsCost,
        },
      };
      await createQuote(quoteReq, res, next);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateById(req, res, next) {
    try {
      // Find the project
      let project = await Projects.findById(req.params.Id);
      if (!project) {
        return res.status(404).json("Project not found");
      }

      // Get the construction type
      const constructionType = await ConstructionTypes.findById(
        req.body.constructionType || project.constructionType
      );
      if (!constructionType) {
        return res.status(404).json("Construction type not found");
      }

      // Calculate package cost
      const packageCost =
        constructionType.value *
        (req.body.area || project.area) *
        (req.body.floors || project.floors);

      // Calculate item costs and total items cost
      let totalItemsCost = 0;
      const itemCostPromises = (
        req.body.constructionItemsOrder || project.constructionItemsOrder
      ).map(async (itemOrder) => {
        const constructionItem = await ConstructionItems.findById(
          itemOrder.constructionItem
        );
        if (!constructionItem) {
          throw new Error("Construction item not found");
        }

        // Calculate item cost and add to total
        itemOrder.itemCost = constructionItem.value * itemOrder.quantity;
        totalItemsCost += itemOrder.itemCost;
      });

      // Wait for all item cost promises to resolve
      await Promise.all(itemCostPromises);

      // Update the project
      project = await Projects.findByIdAndUpdate(
        req.params.Id,
        {
          ...req.body,
          packageCost: packageCost,
          totalItemsCost: totalItemsCost,
          constructionItemsOrder:
            req.body.constructionItemsOrder || project.constructionItemsOrder,
        },
        { new: true }
      ); // option { new: true } ensures the updated document is returned

      // res.status(200).json(project);
      // Update the quote
    const quoteReq = {
      params: {
        Id: project._id  // assuming the project has a reference to its quote
      },
      body: {
        total: packageCost + totalItemsCost
      }
    };
    await updateQuote(quoteReq, res, next);
    } catch (error) {
      res.status(500).json(error);
    }
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
        const quoteReq = {
          params: {
            Id: req.params.Id  // assuming the project has a reference to its quote
          }
        };
        deleteQuote(quoteReq, res, next);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
}

module.exports = new ProjectController();
