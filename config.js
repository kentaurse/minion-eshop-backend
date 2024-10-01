module.exports = {
  secret: "super secret passphrase",
  db_collection_prefix: "ciis_",
  lang: "en",
  allowed_origin: ["https://minion-eshop-frontend.vercel.app", "*"],

  expiresIn: 3600 * 72, // 3 days
  db_url: "mongodb+srv://vercel-admin-user:telxWP2jPuiphGpN@cluster0.nekraz9.mongodb.net/minions",
  db_options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  serviceUrl:
    process.env.REACT_APP_SERVICE_URL || "http://localhost:5005/api",
};
