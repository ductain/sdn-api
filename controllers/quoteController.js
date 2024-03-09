const Quote = require("../models/Quote");
const Projects = require("../models/Project");
class QuoteController {
  getAll(req, res, next) {
    Quote.find({ status: true })
    .populate("project")
      .then((quote) => {
        res.status(200).json(quote);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const quoteId = req.params.Id;
    Quote.findOne({ _id: quoteId, status: true }) 
      .populate("project")
      .then((quote) => {
        res.status(200).json(quote);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
  async create(req, res, next) {
    try {
      // Get the project
      const project = await Projects.findById(req.body.project);
      if (!project) {
        return res.status(404).json("Project not found");
      }
  
      // Calculate total
      const total = project.packageCost + project.totalItemsCost;
  
      // Create the quote
      const quote = new Quote({
        ...req.body,
        total: total
      });
  
      // Save the quote
      await quote.save();
  
      return res.status(200).json("Success");
    } catch (error) {
      next(error);
    }
  }

  //update by project id
  async updateById(req, res, next) {
    try {
      // Find the quote
      let quote = await Quote.findOne({project : req.params.Id});
      if (!quote) {
        return res.status(404).send({ message: "Quote not found" });
      }
  
      // Get the project
      const project = await Projects.findById(req.body.project || quote.project);
      if (!project) {
        return res.status(404).send({ message: "Project not found" });
      }
  
      // Calculate total
      const total = project.packageCost + project.totalItemsCost;
  
      // Update the quote
      quote = await Quote.findOneAndUpdate({project : req.params.Id}, {
        ...req.body,
        total: total
      }, { new: true });  // option { new: true } ensures the updated document is returned
  
      res.status(200).json('Updated success');
    } catch (error) {
      next(error);
    }
  }
  delete(req, res, next) {
    Quote.findOneAndUpdate(
      {project : req.params.Id},
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

module.exports = new QuoteController();
