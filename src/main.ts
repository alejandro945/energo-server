import mongoose from "mongoose";
import { MongoDataSource } from "./infrastructure/data-sources/mongo";
import SitesRouter from "./presentation/routers/site-router"
import server from "./server"
import dotenv from 'dotenv';
import AlertRouter from "./presentation/routers/alert-router";
import { KafkaGenericRepository } from "./infrastructure/brokers/kafka";
import { json } from "body-parser";
import { errorHandler } from "./presentation/middleware/error-middleware";
import "express-async-errors";
import cors from "cors";

// Environment variables Config
dotenv.config();

// Non relational database connection
async function getMongoDS() {
    mongoose.connect(process.env.MONGO_URL || '')
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () { console.log("MongoDB connected") })
}

(async () => {
    getMongoDS()
    const mongoDataSource = new MongoDataSource()
    const sitesMiddleWare = SitesRouter(mongoDataSource.sites)
    const alertsMiddleWare = AlertRouter(new KafkaGenericRepository(), mongoDataSource.alerts)
    server.use(cors())
    server.use(json())
    server.use("/site", sitesMiddleWare)
    server.use("/alert", alertsMiddleWare)
    server.use(errorHandler);
    server.listen(process.env.PORT, () => console.log(`Running on http://localhost:${process.env.PORT}`))
})()