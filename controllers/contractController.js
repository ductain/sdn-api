const Contracts = require("../models/Contract");

class ContractController {
  getAll(req, res, next) {
    Contracts.find({ status: true })
      .populate("quote")
      .populate("user")
      .populate("constructionItem")
      .then((contracts) => {
        res.status(200).json(contracts);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  getById(req, res, next) {
    const contractId = req.params.Id;
    Contracts.findOne({ _id: contractId, status: true })
      .populate("quote")
      .populate("user")
      .populate("constructionItem")
      .then((contract) => {
        res.status(200).json(contract);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
  create(req, res, next) {
    const contract = new Contracts(req.body);
    Contracts.findOne({
      quote: contract.quote,
      user: contract.user,
      constructionItem: contract.constructionItem,
      status: true,
    })
      .then((contract) => {
        if (contract) {
          return res.status(404).json("The contract has already exist");
        } else {
          return contract
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
    Contracts.findOne({
      quote: req.body.quote,
      user: req.body.user,
      constructionItem: req.body.constructionItem,
      _id: { $ne: Id },
      status: true,
    })
      .then((existingData) => {
        if (existingData) {
          return res.status(404).json("The contract has already exist");
        }
        return Contracts.findByIdAndUpdate(
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
    Contracts.findByIdAndUpdate(
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

module.exports = new ContractController();
