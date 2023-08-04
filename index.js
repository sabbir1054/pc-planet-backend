require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://university-admin:As9YqEiswwEnn3Bt@cluster0.pe8bb.mongodb.net/pc-planet?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("pc-planet");
    const productCollection = db.collection("products");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });

    app.get("/products/:category", async (req, res) => {
      const category = req.params.category;
      const cursor = productCollection.find({
        category: { $regex: new RegExp(category, "i") },
      });
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to pc PLanet");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
