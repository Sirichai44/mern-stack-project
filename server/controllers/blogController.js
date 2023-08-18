//connect DB // implement with DB
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");


//save Data
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  //validate
  if (!slug) slug = uuidv4();

  switch (true) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
      break;
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" });
      break;
  }

  //save data
  Blogs.create({ title, content, author, slug })
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(400).json({ error: "มีบทความชื่อซ้ำกัน" });
    });
};

//get data
exports.getAllBlogs = (req, res) => {
  Blogs.find({}).then((blog) => {
    res.json(blog);
  });
};

//get data with slug
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).then((blog) => {
    res.json(blog);
  });
};

//delete data
exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug })
    .then((blog) => {
      res.json({
        message: "ลบบทความเรียบร้อย",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update data
exports.update = (req, res) => {
  const { slug } = req.params;

  //sent data => title, content, author
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate({ slug }, { title, content, author }, {new:true})
  .then((blog) => {
    res.json(blog)
  })
  .catch((err) => console.log(err))
};
