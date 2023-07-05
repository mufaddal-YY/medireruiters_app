import Blog from "../mongodb/models/blog.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).limit(req.query._end);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBlogs = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      cover,
      publish,
      comments,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      creator,
    } = req.body;

    const blogExists = await Blog.findOne({ title });

    if (blogExists) {
      return res
        .status(400)
        .json({ message: "Blog with the provided title already exists" });
    }

    const newBlog = await Blog.create({
      title,
      description,
      content,
      cover,
      publish,
      comments,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      creator,
    });

    res.status(200).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const updateBlogs = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlogs = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndRemove(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogInfoById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBlogs, createBlogs, getBlogInfoById, updateBlogs, deleteBlogs };
