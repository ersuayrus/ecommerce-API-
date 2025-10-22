const express = require("express")
const router = express.Router()

const products = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
  { id: 2, name: "Mouse", price: 29.99, category: "Accessories" },
  { id: 3, name: "Keyboard", price: 79.99, category: "Accessories" },
]

let nextId = 4

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.get("/:id", (req, res) => {
  try {
    const product = products.find((p) => p.id === Number.parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.post("/", (req, res) => {
  try {
    const { name, price, category } = req.body

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, price, category",
      })
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        error: "Price must be a positive number",
      })
    }

    const newProduct = {
      id: nextId++,
      name,
      price,
      category,
    }

    products.push(newProduct)

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.put("/:id", (req, res) => {
  try {
    const product = products.find((p) => p.id === Number.parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    const { name, price, category } = req.body
    if (name) product.name = name
    if (price) product.price = price
    if (category) product.category = category

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.delete("/:id", (req, res) => {
  try {
    const index = products.findIndex((p) => p.id === Number.parseInt(req.params.id))
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    const deletedProduct = products.splice(index, 1)
    res.json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct[0],
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router
