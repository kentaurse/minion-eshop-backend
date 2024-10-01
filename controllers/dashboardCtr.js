const User = require("../Models/UserModel");
const Transaction = require("../Models/TransactionModel");
const Product = require("../Models/ProductModel");
const Article = require("../Models/ArticleModel");

exports.getAllInfo = async (req, res) => {
  const sDate = req?.body?.sDate;
  const eDate = req?.body?.eDate;
  const currentUserNum = await User.aggregate([
    {
      $match: {
        delete: false,
        createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
        role: { $ne: "admin" },
      },
    },
    {
      $count: "currentUserNum",
    },
  ]);
  const totalUserNum = await User.aggregate([
    {
      $match: {
        delete: false,
        role: { $ne: "admin" },
      },
    },
    {
      $count: "totalUserNum",
    },
  ]);
  const totalProduct = await Product.find({ deleted: false });
  const currentProduct = await Product.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
      },
    },
    { $count: "currentProductNum" },
  ]);
  const totalProductTran = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
      },
    },
    {
      $group: {
        _id: {},
        allPriceProduct: { $sum: "$price" },
      },
    },
  ]);
  const currentProductTran = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
        date: { $gte: new Date(sDate), $lte: new Date(eDate) },
      },
    },
    {
      $group: {
        _id: {},
        currentPriceProduct: { $sum: "$price" },
      },
    },
  ]);
  const totalProductProfit = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
              price: 1,
              quantity: 1,
              remain: 1,
              discount: 1,
            },
          },
        ],
        as: "productDetail",
      },
    },
    { $unwind: { path: "$productDetail", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: null,
        price: {
          $sum: {
            $subtract: [
              "$price",
              {
                $multiply: [
                  {
                    $subtract: [
                      "$productDetail.price",
                      "$productDetail.discount",
                    ],
                  },
                  "$quantity",
                ],
              },
            ],
          },
        },
      },
    },
  ]);
  const currentProductProfit = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
        date: { $gte: new Date(sDate), $lte: new Date(eDate) },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              deleted: false,
            },
          },
          {
            $project: {
              _id: 0,
              name: 1,
              price: 1,
              quantity: 1,
              remain: 1,
              discount: 1,
            },
          },
        ],
        as: "productDetail",
      },
    },
    { $unwind: { path: "$productDetail", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: null,
        price: {
          $sum: {
            $subtract: [
              "$price",
              {
                $multiply: [
                  {
                    $subtract: [
                      "$productDetail.price",
                      "$productDetail.discount",
                    ],
                  },
                  "$quantity",
                ],
              },
            ],
          },
        },
      },
    },
  ]);
  const eachProductProfit = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
        date: { $gte: new Date(sDate), $lte: new Date(eDate) },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              price: 1,
              quantity: 1,
              remain: 1,
              discount: 1,
              thumbnail: 1,
              name: 1,
            },
          },
        ],
        as: "productDetail",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              deleted: false,
            },
          },
          {
            $project: {
              _id: 0,
              title: 1,
            },
          },
        ],
        as: "categoryDetail",
      },
    },
    { $unwind: { path: "$productDetail", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$categoryDetail", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: {
          productId: "$productId",
          categoryId: "$categoryDetail.title",
          thumbnail: "$productDetail.thumbnail",
          name: "$productDetail.name",
        },
        allSold: { $sum: "$price" },
        allPrice: {
          $sum: {
            $multiply: [
              {
                $subtract: ["$productDetail.price", "$productDetail.discount"],
              },
              "$quantity",
            ],
          },
        },
        allProfit: {
          $sum: {
            $subtract: [
              "$price",
              {
                $multiply: [
                  {
                    $subtract: [
                      "$productDetail.price",
                      "$productDetail.discount",
                    ],
                  },
                  "$quantity",
                ],
              },
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        productId: "$_id.productId",
        thumbnail: "$_id.thumbnail",
        category: "$_id.categoryId",
        sold: "$allSold",
        price: "$allPrice",
        profit: "$allProfit",
        productName: "$_id.name",
      },
    },
    { $sort: { profit: -1 } },
  ]);
  const categoryProfit = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
        date: { $gte: new Date(sDate), $lte: new Date(eDate) },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              title: 1,
            },
          },
        ],
        as: "categoryDetail",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
              price: 1,
              quantity: 1,
              remain: 1,
              discount: 1,
            },
          },
        ],
        as: "productDetail",
      },
    },
    { $unwind: { path: "$categoryDetail", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$productDetail", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: {
          _id: "$categoryId",
          title: "$categoryDetail.title",
        },
        categoryProfit: {
          $sum: {
            $subtract: [
              "$price",
              {
                $multiply: [
                  {
                    $subtract: [
                      "$productDetail.price",
                      "$productDetail.discount",
                    ],
                  },
                  "$quantity",
                ],
              },
            ],
          },
        },
      },
    },
  ]);
  const chartTransaction = await Transaction.aggregate([
    {
      $match: {
        deleted: false,
        date: { $gte: new Date(sDate), $lte: new Date(eDate) },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        },
        price: { $sum: "$price" },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id.date",
        price: "$price",
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);
  const bestArticleUser = await Article.aggregate([
    {
      $match: {
        del: false,
        createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
        title: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              avatar: 1,
              email: 1,
            },
          },
        ],
        as: "userInfo",
      },
    },
    { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: {
          userId: "$userInfo._id",
          avatar: "$userInfo.avatar",
          email: "$userInfo.email",
          like: "$like",
          view: "$view",
        },
        articleNum: { $count: {} },
      },
    },
    {
      $group: {
        _id: { _id: "$_id.userId", avatar: "$_id.avatar", email: "$_id.email" },
        like: { $count: {} },
        view: { $count: {} },
        articleNum: { $sum: "$articleNum" },
      },
    },
    {
      $sort: { articleNum: -1 },
    },
    { $limit: 8 },
  ]);
  const popularArticle = await Article.aggregate([
    {
      $match: {
        del: false,
        createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
        title: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              avatar: 1,
              email: 1,
              firstName: 1,
            },
          },
        ],
        as: "userInfo",
      },
    },
    { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: {
          _id: "$title",
          articleId: "$_id",
          avatar: "$userInfo.avatar",
          email: "$userInfo.email",
          name: "$userInfo.firstName",
          view: "$view",
          like: "$like",
          date: "$createdAt",
        },
      },
    },
    {
      $project: {
        _id: 0,
        articleId: "$_id.articleId",
        title: "$_id._id",
        email: "$_id.email",
        avatar: "$_id.avatar",
        name: "$_id.name",
        date: "$_id.date",
        view: { $size: "$_id.view" },
        like: { $size: "$_id.like" },
      },
    },
    { $sort: { like: -1 } },
    { $sort: { view: -1 } },
    { $limit: 10 },
  ]);
  res.status(200).json({
    user: {
      currentUser: currentUserNum[0]?.currentUserNum,
      totalUser: totalUserNum[0]?.totalUserNum,
    },
    product: {
      totalProduct: totalProduct?.length,
      currentProduct: currentProduct[0]?.currentProductNum,
    },
    ProductTran: {
      totalTran: totalProductTran[0]?.allPriceProduct,
      currentTran: currentProductTran[0]?.currentPriceProduct,
    },
    profit: {
      totalProfit: totalProductProfit[0]?.price,
      currentProfit: currentProductProfit[0]?.price,
    },
    chartDate: { date: chartTransaction, product: eachProductProfit },
    categoryDate: categoryProfit,
    bestUser: bestArticleUser,
    popularArticle: popularArticle,
  });
};
