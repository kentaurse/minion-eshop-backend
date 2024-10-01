const Store = require("../Models/StoreModel");
const Product = require("../Models/ProductModel");
const User = require("../Models/UserModel");
const _ = require("lodash");
// const { default: message } = require("../../Admin/src/pages/messgae");

exports.createStore = async (req, res) => {
  try {
    await Store.findOne({ name: req.body.name, deleted: false }).then(
      async (matched) => {
        if (matched) {
          return res.json({
            message: "Same store exist!",
            error: true,
          });
        } else {
          await Store.findOne({
            manager: req.body.manager,
            deleted: false,
          }).then(async (matched) => {
            if (matched) {
              return res.json({
                message: "Choose another manager!",
                error: true,
              });
            }
            const newStore = new Store(req.body);
            await newStore.save((err) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              } else {
                return res.status(200).json({
                  message: "Create store sucessfully!",
                });
              }
            });
            const findUser = await User.findByIdAndUpdate(
              req.body.manager,
              {
                role: "storeManager",
              },
              {
                new: true,
                runValidators: true,
              }
            );
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({ deleted: false })
      .populate({
        path: "manager",
        select: "firstName lastName avatar",
      })
      .sort({ updatedAt: -1 });
    return res.status(200).json({
      message: "Get all stores successfully!",
      stores: stores,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAStore = async (req, res) => {
  try {
    const { id: storeId } = req.params;
    const store = await Store.findById(storeId).populate({
      path: "manager product",
      select: "firstName lastName",
    });

    const product = await Product.find({ deleted: false }).sort({
      updatedAt: -1,
    });
    const userList = await User.find({ delete: false })
      .sort({ createdAt: -1 })
      .skip(req.body.page)
      .limit(req.body.perpage);

    if (!store) {
      return res.status(404).json({
        messgae: `No store with id: ${storeId} exist`,
      });
    } else {
      return res.status(200).json({
        message: "Get store successfully!",
        store: store,
        products: product,
        userList,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateStore = async (req, res) => {
  const { id: storeId } = req.params;
  const store = await Store.findById(storeId);

  try {
    if (!store) {
      return res.status(404).json({
        message: `No store with id: ${storeId} exist!`,
      });
    } else {
      const name = await Store.findOne({ name: req.body.name });
      const manager = await Store.findOne({ name: req.body.manager });
      await Store.findOne(
        { name: req.body.name } || { manager: req.body.manager }
      ).then(async (matched) => {
        if (matched) {
          if (matched._id === storeId) {
            await Store.findByIdAndUpdate(
              storeId,
              {
                name: req.body.name,
                product: req.body.product,
                manager: req.body.manager,
              },
              {
                new: true,
                runValidators: true,
              }
            );
            return res.status(200).json({
              message: "Store information changed successfully!",
            });
          } else {
            if (matched.name !== req.body.name) {
              return res.json({
                message: "Choose another manager!",
                error: true,
              });
            } else if (matched.manager !== req.body.manager) {
              return res.json({
                message: "Same store already exist!",
                error: true,
              });
            }
          }
        } else {
          await Store.fineByIdAndUpdate(
            categoryId,
            {
              name: req.body.name,
              product: req.body.product,
              manager: req.body.manager,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            message: "Store infomation changed successfully!",
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteAStore = async (req, res) => {

  const { id: storeId } = req.params;
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      {
        deleted: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!store) {
      return res.status(404).json({
        message: `No store with id: ${storeId} exist!`,
      });
    } else {
      return res.status(200).json({
        message: "Delete store successfully!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.messgae,
    });
  }
};

exports.deleteStores = async (req, res) => {
  const delStoreList = req.body.data;

  try {
    _.map(delStoreList, async (id, key) => {
      const store = await Store.findByIdAndUpdate(
        id,
        { deleted: true },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!store) {
        res.status(404).json({
          message: `No store with id:${id} exist`,
        });
      } else {
        if (key == delStoreList.length - 1) {
          const stores = await Store.find({ deleted: false }).sort({
            updatedAt: -1,
          });
          res.status(200).json({
            message: "Delete selected stores successfully!",
            stores: stores,
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
