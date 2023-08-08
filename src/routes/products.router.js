import { Router } from "express"
import productManager from "../ProductManager.js"

const router = Router()


router.get("/", async (request, response) => {
    try {
      const products = await productManager.getProducts(); 
  
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
  });


  router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productManager.getProductById(+pid);
      res.status(200).json({ message: "Product", product });
    } catch (error) {
      res.status.apply(500).json({ error });
    }
  });

  router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({ message: 'Product added', product: newProduct })
        
    } catch (error) {
        res.status(500).json({ error })
    }
  });

  router.delete('/:pid', async(req, res) => {
    const {pid} = req.params
    try {
      const response = await productManager.deleteProduct(+pid)
      res.status(200).json({message: 'Prodcut deleted'})
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  router.put('/:pid', async(req, res) => {
    const {pid} = req.params
    try {
      const productUpdate = await productManager.updateProduct(+pid, req.body)
      res.status(200).json({message: 'User updated'})
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  

export default router