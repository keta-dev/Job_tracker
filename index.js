import express from "express";

const app = express();
const port = 8080;

app.use('/', (req, res) => {
    res.send("Job Tracker App!");
});

app.listen(port, () => {
    console.log(`You are listening on port ${port}`);
});