const express = require("express");
const { connect } = require("./config/connect.js");
const { notFound,errorHandler } = require("./meddielweer/errorHandler.js");
require("dotenv").config();

const app = express();

connect();

const PORT = process.env.PORT || 9000;
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(
        `server is running in ${process.env.NODE_ENV} mood on port ${PORT}`
    );
});
