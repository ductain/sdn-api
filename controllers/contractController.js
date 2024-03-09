const Contracts = require("../models/Contract");

class ContractController {
  getAll(req, res, next) {
    Contracts.find({})
      .populate({
        path: "quote",
        populate: { path: "project", populate: { path: "constructionType" } },
      })
      .populate("user")
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
    Contracts.findOne({ _id: contractId })
      .populate({
        path: "quote",
        populate: { path: "project" },
      })
      .populate("user")
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
      status: true,
    })
      .then((existContract) => {
        if (existContract) {
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
      _id: { $ne: Id },
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
}

module.exports = new ContractController();
