const Product = require("../models/Product");

// GET /api/products — list with pagination, search, category filter
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 16,
      category,
      search,
      sort = "-createdAt",
      featured,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
      },
    });
  } catch (error) {
    console.error("GetProducts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/products/:id — single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    console.error("GetProduct error:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/products/categories — list all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json({ categories });
  } catch (error) {
    console.error("GetCategories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
