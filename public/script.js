const API_URL = "http://localhost:4000"

// DOM Elements
const productForm = document.getElementById("productForm")
const productsContainer = document.getElementById("productsContainer")
const searchInput = document.getElementById("searchInput")
const toast = document.getElementById("toast")

let allProducts = []

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  productForm.addEventListener("submit", handleAddProduct)
  searchInput.addEventListener("input", handleSearch)
})

// Load all products
async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) throw new Error("Failed to load products")

    allProducts = await response.json()
    renderProducts(allProducts)
    updateStats()
  } catch (error) {
    console.error("Error loading products:", error)
    showToast("Failed to load products", "error")
    productsContainer.innerHTML =
      '<div class="empty-state"><div class="empty-state-icon">⚠️</div><h3>Unable to connect to API</h3><p>Make sure the server is running on port 4000</p></div>'
  }
}

// Render products
function renderProducts(products) {
  if (products.length === 0) {
    productsContainer.innerHTML =
      '<div class="empty-state"><div class="empty-state-icon">📦</div><h3>No products yet</h3><p>Add your first product using the form above</p></div>'
    return
  }

  productsContainer.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-header">
                <span class="product-id">ID: ${product.id}</span>
            </div>
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <span class="product-category">${escapeHtml(product.category)}</span>
            <p class="product-description">${escapeHtml(product.description || "No description provided")}</p>
            <div class="product-details">
                <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">$${Number.parseFloat(product.price).toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Stock</span>
                    <span class="detail-value">${product.stock} units</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Handle add product
async function handleAddProduct(e) {
  e.preventDefault()

  const newProduct = {
    name: document.getElementById("productName").value,
    price: Number.parseFloat(document.getElementById("productPrice").value),
    category: document.getElementById("productCategory").value,
    stock: Number.parseInt(document.getElementById("productStock").value),
    description: document.getElementById("productDescription").value,
  }

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })

    if (!response.ok) throw new Error("Failed to add product")

    showToast("Product added successfully!", "success")
    productForm.reset()
    loadProducts()
  } catch (error) {
    console.error("Error adding product:", error)
    showToast("Failed to add product", "error")
  }
}

// Delete product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return

  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete product")

    showToast("Product deleted successfully!", "success")
    loadProducts()
  } catch (error) {
    console.error("Error deleting product:", error)
    showToast("Failed to delete product", "error")
  }
}

// Handle search
function handleSearch(e) {
  const query = e.target.value.toLowerCase()
  const filtered = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query),
  )
  renderProducts(filtered)
}

// Update statistics
function updateStats() {
  const totalProducts = allProducts.length
  const totalValue = allProducts.reduce((sum, p) => sum + p.price * p.stock, 0)
  const avgPrice = totalProducts > 0 ? totalValue / allProducts.reduce((sum, p) => sum + p.stock, 1) : 0

  document.getElementById("totalProducts").textContent = totalProducts
  document.getElementById("totalValue").textContent = `$${totalValue.toFixed(2)}`
  document.getElementById("avgPrice").textContent = `$${avgPrice.toFixed(2)}`
}

// Show toast notification
function showToast(message, type = "success") {
  toast.textContent = message
  toast.className = `toast show ${type}`
  setTimeout(() => toast.classList.remove("show"), 3000)
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}
