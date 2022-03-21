const express = require('express');
import * as Sentry from "@sentry/node";
//import mongoose from "mongoose";
//require('dotenv').config();
import { env } from "../config/global"
//import { router } from "./deck/deckRoutes"

const app = express();
const URI = env.MONGO_URI;

// parse requests
app.use(express.json());
//app.use('/', express.static('public'));



import router=require("./deck/deckRoutes")
app.use('/deck', router);

app.listen(env.NODE_PORT, () => {
    console.log(`Server is listening on port ${env.NODE_PORT}`);
    //mongoose.connection.close()
});