const express = require("express");
const connectToDatabase = require("./db");
const cors = require('cors')
const dotenv = require("dotenv");

const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const commentRoutes = require("./routes/comment")

const app = express()

connectToDatabase()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

const port = parseInt(process.env.PORT) || 5000;

app.listen(port, () => console.log(`Server started on port ${port}...`))