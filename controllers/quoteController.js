const Quote = require("../models/Quote");
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
  create(req, res, next) {
    const quote = new Quote(req.body);
    Quote.findOne({ name: quote.name, status: true })
    .populate("project")
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Quote with the same name is already exist");
        } else {
          return Quote.create(req.body)
            .then((quote) => {
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
    Quote.findOne({
      name: req.body.name,
      _id: { $ne: Id },
      status: true,
    })
      .then((existingData) => {
        if (existingData) {
          return res
            .status(404)
            .json("Quote with the same name is already exist");
        } else {
          return Quote.findByIdAndUpdate(
            req.params.Id,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then((quote) => {
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
    Quote.findByIdAndUpdate(
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

module.exports = new QuoteController();
