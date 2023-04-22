const Route = require("../router/router");
const { products } = require("../repositories");
const FilesDao = require("../dao/Files.dao");

const file = "mockData.json";
const filesDao = new FilesDao(file);

class ProductRouter extends Route {
  init() {
    //👍
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const { category, stock, limit = 10, page = 1, sort } = req.query;
        const linkMold = `${req.protocol}://${req.get("host")}/api/products/`;
        const filter = {};

        if (category) {
          filter.category = { $regex: category };
        }

        if (stock) {
          filter.stock = { $gte: stock };
        }

        const conditionsQuery = {
          page,
          limit,
          sort: { price: sort === "desc" ? -1 : 1 },
        };
        console.log("controller prodget");
        const prod = await products.getProducts();
        const prevSort = sort === "desc" ? "asc" : "desc";
        const prevLink = products.hasPrevPage
          ? `${linkMold}?page=${products.prevPage}&limit=${limit}&sort=${prevSort}`
          : null;
        const nextLink = products.hasNextPage
          ? `${linkMold}?page=${products.nextPage}&limit=${limit}&sort=${sort}`
          : null;
        console.log("jojojo");
        const respuestaInfo = {
          status: "success",
          playload: products.docs,
          totalPages: products.totalPages,
          prevPage: products.prevPage,
          nextPage: products.nextPage,
          page: products.page,
          hasPrevPage: products.hasPrevPage,
          hasNextPage: products.hasNextPage,
          prevLink,
          nextLink,
          linkMold,
        };

        // const { user } = req.session;
        res.sendSuccess(prod);
        // res.status(200).render("products", { respuestaInfo, user });
        // res.status(200).json(respuestaInfo);
      } catch (error) {
        res.status(500).sendServerError(`${error}`);
      }
    });

    //👍
    this.get("/:id", ["PUBLIC"], async (req, res) => {
      try {
        const { id } = req.params;
        const product = await products.getProductById(id);
        res.sendSuccess(product);
      } catch (error) {
        res.status(400).sendUserError("Product not found");
      }
    });
    //👍
    this.post("/", ["PUBLIC"], async (req, res) => {
      try {
        const newProd = req.body;
        if (
          !newProd.title ||
          !newProd.description ||
          !newProd.price ||
          !newProd.thumbnail ||
          !newProd.code ||
          !newProd.stock ||
          !newProd.category
        ) {
          return res
            .status(400)
            .sendUserError("Product with missing information");
        }

        const createdProduct = await products.addProduct(newProd);
        // res.json({ mesagge: createdProduct });
        res.sendSuccess(createdProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    //👍
    this.put("/:id", ["PUBLIC"], async (req, res) => {
      try {
        const productId = req.params.id;
        const newUpdatedProduct = req.body;
    
        const verifyExistenceUndefined =
          Object.values(newUpdatedProduct).indexOf(undefined);
        if (verifyExistenceUndefined === -1) {
          const UpdatedProduct = await products.updateProduct(
            productId,
            newUpdatedProduct
          );
          console.log(UpdatedProduct)
          res.json({ message: UpdatedProduct });
        } else {
          res.status(406).json({ message: "Product with missing information" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    //👍
    this.delete("/:id", ["PUBLIC"], async (req, res) => {
      try {
        const productId = req.params.id;
        const result = await products.deleteById(productId);
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: result });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //👍
    this.post("/json", ["PUBLIC"], async (req, res) => {
      try {
        const pJson = await filesDao.loadItems();
        console.log("controller");
        const response = await products.addToDB(pJson);
        res.json({ message: response });
      } catch (error) {
        res.status(500).sendServerError(`Internal Server Error${error}`);
      }
    });

    //👍
    this.delete("/", ["PUBLIC"], async (req, res) => {
      console.log("controller delete");
      await products.deleteAll();
      res.sendSuccess("Products deleted");
    });
  }
}

module.exports = ProductRouter;
