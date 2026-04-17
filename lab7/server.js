const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

/*
===========================
In-memory storage
===========================
*/

let posts = [];
let idCounter = 1;

/*
===========================
GET all posts
===========================
*/

app.get("/posts", (req, res) => {
    res.json(posts);
});

/*
===========================
GET post by ID
===========================
*/

app.get("/posts/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.json(post);

});

/*
===========================
CREATE post
===========================
*/

app.post("/posts", (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required"
        });
    }

    const newPost = {
        id: idCounter++,
        title: title,
        content: content,
        likes: 0
    };

    posts.push(newPost);

    res.status(201).json(newPost);

});

/*
===========================
UPDATE post
===========================
*/

app.put("/posts/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const { title, content } = req.body;

    if (title)
        post.title = title;

    if (content)
        post.content = content;

    res.json(post);

});

/*
===========================
DELETE post
===========================
*/

app.delete("/posts/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const deletedPost = posts.splice(index, 1);

    res.json({
        message: "Post deleted",
        post: deletedPost[0]
    });

});

/*
===========================
LIKE post (optional but common)
===========================
*/

app.post("/posts/:id/like", (req, res) => {

    const id = parseInt(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    post.likes++;

    res.json({
        message: "Post liked",
        likes: post.likes
    });

});

/*
===========================
Server start
===========================
*/

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});