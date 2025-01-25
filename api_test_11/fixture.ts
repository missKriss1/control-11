import mongoose from "mongoose";
import config from "./config";
import { randomUUID } from "node:crypto";
import User from "./models/User";
import Category from "./models/Category";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("posts");
        await db.dropCollection("comments");
    } catch (e) {
        console.error(e);
    }

    const [user1, user2] = await User.create(
        {
            username: "Сергей",
            displayName: "Серега123",
            phone: "0555333444",
            password: "123",
            token: randomUUID(),
        },
        {
            username: "Юлия",
            displayName: "Юлик456",
            phone: "0555555555",
            password: "123",
            token: randomUUID(),
        }
    );

    const [category1, category2, category3] = await Category.create(
        {
            title: "Computers",
        },
        {
            title: "Phone",
        },
        {
            title: "Television",
        },
    );

    await db.close();
};

run().catch(console.error);
