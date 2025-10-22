const express = require("express")
const cors = require("cors")
const os = require("os")
const http = require("http")
const productRoutes = require("./routes/products")

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

app.use("/products", productRoutes)

app.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running" })
})

app.use((err, req, res, next) => {
  console.error("Error:", err.message)
  res.status(500).json({ error: "Internal Server Error" })
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log("\n========================================")
  console.log("🚀 E-commerce API Server Started")
  console.log("========================================")
  console.log(`Server running on: http://localhost:${PORT}`)
  console.log("\n📊 System Information:")
  console.log(`Platform: ${os.platform()}`)
  console.log(`CPU Cores: ${os.cpus().length}`)
  console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`)
  console.log(`Free Memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`)
  console.log(`Architecture: ${os.arch()}`)
  console.log("========================================\n")
})
