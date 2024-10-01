const ArticleCat = require("../Models/ArticleCategoryModel");
const Article = require("../Models/ArticleModel");

exports.FirstCat = async (req, res) => {
  try {
    const firstCat = {};
    firstCat.title = req.body.firstCat;
    const firstItem = new ArticleCat(firstCat);
    firstItem.idPath = firstItem._id + ".";
    await firstItem.save((err) => {
      if (err) throw err;
      else
        res.status(201).json({
          message: "The first category is created successfully!",
          data: firstItem,
        });
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.GetAllCat = async (req, res) => {
  try {
    // const { view } = req.query;
    // let query = {};
    // if (view !== "all") query.del = false;
    const articleCategory = await ArticleCat.find({}).sort({});
    const article = await Article.find(
      { $expr: { $eq: ["$_id", "$ancestor"] } },
      {
        category: 1,
        browse: 1,
        user: 1,
      }
    );
    res.status(200).json({
      message: "All categories are catched successfully",
      data: articleCategory,
      article: article,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.ActionArticleCat = async (req, res) => {
  try {
    const { parentId, title, updateId } = req.body;
    const group = await ArticleCat.findOne({ title: title });
    if (updateId) {
      const uGroup = await ArticleCat.findByIdAndUpdate(updateId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!uGroup) {
        return res
          .status(400)
          .json({ message: `No Group with id:${updateId}` });
      } else {
        return res.status(202).json({
          message: `Group with id:${updateId} updated successfully.`,
          result: uGroup,
        });
      }
    } else {
      const pGroup = await ArticleCat.findOne({ _id: parentId });
      if (!pGroup) {
        return res.status(400).json({ message: "No selected parentId" });
      }
      const nGroup = new ArticleCat(req.body);
      nGroup.idPath = pGroup.idPath + `${nGroup._id}`;
      nGroup.numPath = nGroup.numPath + `-${nGroup.num}`;
      await nGroup.save((err) => {
        if (err) throw err;
        else
          res.status(201).json({
            message: "Create a new Group succssfully.",
            result: nGroup,
          });
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.DeleteArticleCat = async (req, res) => {
  try {
    const articlecategories = await ArticleCat.find({});
    const toDeleteId = articlecategories.find(
      (item) => item._id == req.params.id
    );
    let toDeleteArticleCategoryList = [toDeleteId._id];
    const makeTree = (item, arr) => {
      arr.forEach((elem) => {
        if (String(elem.parentId) === String(item._id)) {
          toDeleteArticleCategoryList.push(elem._id);
          makeTree(elem, arr);
        }
      });
    };
    await makeTree(toDeleteId, articlecategories);
    const deletedArticleCategories = await ArticleCat.deleteMany({
      _id: { $in: toDeleteArticleCategoryList },
    });
    const dArticles = await PostModel.deleteMany({
      category: { $in: toDeleteArticleCategoryList },
    });
    res.status(200).send({
      deletedArticleCategoriescount: deletedArticleCategories.deleteCount,
      deletedArticleCount: dArticles.deleteCount,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
