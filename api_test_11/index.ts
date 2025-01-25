import express from "express";
import cors from "cors";
import usersRouter from "./routers/users";
import * as mongoose from "mongoose";
import config from "./config";
import categoriesRouter from "./routers/categories";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(err => console.log(err));