import mongoose from "mongoose";
import config from "./config";
import { randomUUID } from "node:crypto";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

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
            title: "Компьютеры",
        },
        {
            title: "Телефоны",
        },
        {
            title: "Телевизоры",
        },
    );

    await Item.create(
        {
            user: user1._id,
            category: category1._id,
            title: 'ASUS',
            description: "Топ комп",
            image: 'asusuComp.jpg',
            price: 17000,

        },
        {
            user: user1._id,
            category: category1._id,
            title: 'MacBook',
            description: "Лучший",
            image: 'macBook.jpg',
            price: 400000,
        },
        {
            user: user1._id,
            category: category2._id,
            title: 'Iphone',
            description: "Топ компания",
            image: 'catygory_1_user_1.jpg',
            price: 80000,
        },
        {
            user: user1._id,
            category: category2._id,
            title: 'Samsung',
            description: "Клаасный телик",
            image: 'samsungTelevisions.jpg',
            price: 55500,
        },
        {
            user: user2._id,
            category: category1._id,
            title: 'Samsung',
            description: "Телефон тож ниче",
            image: 'samsungPhone.jpg',
            price: 35000,
        },{
            user: user2._id,
            category: category2._id,
            title: 'Redmi',
            description: "Ваще не знаю",
            image: 'RedmiPhone.jpg',
            price: 12000,
        }
        ,{
            user: user2._id,
            category: category3._id,
            title: 'LG',
            description: "Топчик",
            image: 'LGTelevisions.jpg',
            price: 120000,
        }
    )

    await db.close();
};

run().catch(console.error);
