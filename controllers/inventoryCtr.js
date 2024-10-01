const { model } = require("mongoose");
const TransactionModel = require("../Models/TransactionModel.js");
const Product = require("../Models/ProductModel.js");
const User = require("../Models/UserModel.js");
const moment = require("moment");
const _ = require("lodash");
const mongoose = require("mongoose");

exports.addTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;
    const products = await Product.findById({ _id: productId });
    const categoryId = products.category;
    const user = await User.findById({ _id: userId });
    const storeId = user.store;
    const price = req.body.price * req.body.quantity;
    const quantity = req.body.quantity;
    const product = await Product.findById(productId);
    const Transaction = new TransactionModel({
      userId,
      productId,
      storeId,
      categoryId,
      price,
      quantity,
      date: moment().format("MM/DD/YYYY HH:mm:ss"),
    });
    await Product.findByIdAndUpdate(
      productId,
      {
        sold: Number(product.sold) + Number(quantity),
        remain:
          Number(product.quantity) - Number(product.sold) - Number(quantity),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    await Transaction.save();
    return res.status(200).json({
      message: "Create Transaction successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: { message: err.message },
    });
  }
};

exports.getAllTransaction = async (req, res) => {
  const { category, searchWord, id, sDate, eDate  } = req.body;
  var { moreThan, lessThan } = req.body;
  if (moreThan === "") moreThan = 0;
  if (lessThan === "") lessThan = 10000000;

  try {
    const total = await TransactionModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "Product_transaction",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "User_transaction",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "Category_transaction",
        },
      },
      {
        $project: {
          Product_transaction: 1,
          User_transaction: 1,
          Category_transaction: 1,
          price: 1,
          deleted: 1,
          quantity: 1,
          date: 1,
        },
      },
      {
        $unwind: {
          path: "$Product_transaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$User_transaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$Category_transaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $and: [
            category !== ""
              ? {
                  "Category_transaction._id": mongoose.Types.ObjectId(
                    req.body.category
                  ),
                }
              : {},
            id !== null
              ? {
                  "Product_transaction._id": mongoose.Types.ObjectId(id),
                }
              : {},
            {
              price: {
                $gte: Number(moreThan),
                $lte: Number(lessThan),
              },
            }, 
            {
              date: {
                $gte: new Date(sDate),
                $lte: new Date(eDate),
              },
            },
            {
              deleted: false,
            },
            {
              "Product_transaction.deleted": false,
            },
            {
              "User_transaction.delete": false,
            },
            {
              "Category_transaction.deleted": false,
            },
            {
              $or: [
                {
                  "Product_transaction.name": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
                {
                  "User_transaction.firstName": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
                {
                  "User_transaction.lastName": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
                {
                  "Category_transaction.title": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        $count: "total",
      },
    ]);

    const allTransactions = await TransactionModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "Product_transaction",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "User_transaction",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "Category_transaction",
        },
      },
      {
        $project: {
          Product_transaction: 1,
          User_transaction: 1,
          Category_transaction: 1,
          price: 1,
          deleted: 1,
          deleted: 1,
          quantity: 1,
          date: 1,
        },
      },
      {
        $unwind: {
          path: "$Product_transaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$User_transaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$Category_transaction",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  "Product_transaction.name": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
                {
                  "User_transaction.firstName": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
                {
                  "User_transaction.lastName": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
                {
                  "Category_transaction.title": {
                    $regex: searchWord,
                    $options: "i",
                  },
                },
              ],
            },
            category !== ""
              ? {
                  "Category_transaction._id": mongoose.Types.ObjectId(
                    req.body.category
                  ),
                }
              : {},
            id !== null
              ? {
                  "Product_transaction._id": mongoose.Types.ObjectId(id),
                }
              : {},
            {
              price: {
                $gte: Number(moreThan),
                $lte: Number(lessThan),
              },
            },
            {
              date: {
                $gte: new Date(sDate),
                $lte: new Date(eDate),
              },
            },
            {
              deleted: false,
            },
            {
              "Product_transaction.deleted": false,
            },
            {
              "User_transaction.delete": false,
            },
            {
              "Category_transaction.deleted": false,
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: req.body.page,
      },
      {
        $limit: req.body.perpage,
      },
    ]);

    return res.status(200).json({
      message: "Get all transactions successfully!",
      allTransactions: allTransactions,
      total: total,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.multiDeleteTransactions = async (req, res) => {
  const delTransactionList = req.body.data;

  try {
    _.map(delTransactionList, async (id, key) => {
      const transaction = await TransactionModel.findByIdAndUpdate(
        id,
        { deleted: true },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!transaction) {
        res.status(404).json({
          message: `No category with id:${id} exist`,
        });
      } else {
        if (key == delTransactionList.length - 1) {
          const transactions = await TransactionModel.find({
            deleted: false,
          }).sort({
            updatedAt: -1,
          });
          res.status(200).json({
            message: "Delete selected categories successfully!",
            transactions: transactions,
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
