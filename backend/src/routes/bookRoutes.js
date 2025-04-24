import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoutes from "../middleware/auth.middleware.js";
const router = express.Router();

// get all books
router.post("/", protectRoutes, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!image || !title || !caption || !rating) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    //upload the image to cloudinary also save mongodb
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();
    return res.status(201).json(newBook);
  } catch (error) {
    console.log("Error in create book route", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", protectRoutes, async (req, res) => {
  try {
    const page = req.query.page | 1;
    const limit = req.query.limit | 5;
    const skip = (page - 1) * limit;
    const books = Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); //desc

    //pagination

    const total = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks: total,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in getting all books", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user", protectRoutes, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(books);
  } catch (error) {
    console.log("Get user books error", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", protectRoutes, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // check if user is the creator of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // delete the image from  cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error deleting image from cloudinary", error);
      }
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting books", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
