const Product = require("../Models/ProductModel");

const _ = require("lodash");
const mongoose = require("mongoose");

exports.getNewHomeProducts = async (req, res) => {
  try {
    const newProducts = await Product.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    if (!newProducts) {
      return res.status(404).json({
        msg: "no new products",
      });
    } else {
      return res.status(200).json({
        message: "Get newproducts successfully!",
        newproduct: newProducts,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.popularHomeProducts = async (req, res) => {
  try {
    const popularProducts = await Product.aggregate([
      {
        $sort: {
          sold: 1,
        },
      },
      {
        $limit: 6,
      },
    ]);
    if (!popularProducts) {
      return res.status(404).json({
        msg: "no popular products",
      });
    } else {
      return res.status(200).json({
        popularProducts: popularProducts,
        message: "get popularProducts successfully.",
      });
    }
  } catch (err) {
    return res.status(200).json({
      msg: err.message,
    });
  }
};
