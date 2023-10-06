import {
  findAll,
  create,
  findById,
  update,
  deleteOne,
} from "../services/products.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = findAll();

    const limit = request.query.limit;
    if (limit) {
      const resLimit = products.slice(0, parseInt(limit, 10));
      response.status(200).json({ message: "productos", products: resLimit });
    } else {
      response.status(200).json({ message: "productos", products });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = create(req.body);
    res.status(200).json({ message: "Product added", product: newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = findById(+pid);
    res.status(200).json({ message: "Product", product });
  } catch (error) {
    res.status.apply(500).json({ error });
  }
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdate = update(+pid, req.body);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const response = deleteOne(+pid);
    res.status(200).json({ message: "Prodcut deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
