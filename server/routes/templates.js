import Template from "../models/Template.js"
import User from "../models/User.js"
import auth from "../middleware/authentication.js"
import express from "express"

const router = express.Router();


router.get("/templates", async (req, res) => {
  const templates = await Template.find();
  res.json(templates);
});

router.post("/templates", async (req, res) => {

  const { title, description, imageUrl, category } = req.body;
  try {
    const newTemplate = new Template({
      title,
      description,
      imageUrl,
      category,
    });

    await newTemplate.save();

    res.status(201).json(newTemplate);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/favorites/:templateId", auth, async (req, res) => {
  const user = await User.findById(req.user);

  if (!user.favorites.includes(req.params.templateId)) {
    user.favorites.push(req.params.templateId);
    await user.save();
  }

  res.json({ message: "Added to favorites" });
});

router.get("/favorites", auth, async (req, res) => {
  const user = await User.findById(req.user).populate("favorites");
  res.json(user.favorites);
});

router.delete("/favorites/:templateId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.templateId
    );

    await user.save();
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing favorite" });
  }
});


router.get("templates/:id", async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) return res.status(404).json({ message: "Not found" });
  res.json(template);
});


export default router;