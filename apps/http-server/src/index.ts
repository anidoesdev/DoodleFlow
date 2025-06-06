import express from "express";
import router from "./routes/route";

const app = express();

app.use('',router)


app.listen(3001)