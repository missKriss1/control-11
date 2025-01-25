import {Router} from "express";
import Item from "../models/Item";
import auth from "../middleware/auth";
import {imagesUpload} from "../multer";
import User from "../models/User";
import {Error} from "mongoose";

const itemsRouter = Router();

itemsRouter.get('/', async (req, res, next) => {
    try{
        let items

        if(req.query.category){
            items = await Item.find({category: req.query.category});
        }else{
            items = await Item.find();
        }
        res.send(items);
    }catch(e){
        next(e);
    }
});

itemsRouter.get("/:id", async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(404).send({error: "Id должны быть в url"});
        }

        const item = await Item.findById(req.params.id).populate("user", "displayName phone");
        res.send(item);
    }catch(e){
        next(e);
    }
})

itemsRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {
    const {title, description, price} = req.body;
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'Токен отсутствует.'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Пользователь, соответствующий этому токену, не найден.'});
        return;
    }

    try{

        const newItem = new Item({
            user: user._id,
            title: title,
            description: description,
            price: price,
            image: req.file ? 'images' + req.file.filename : null
        });

        await newItem.validate();
        await newItem.save();

        res.send(newItem);

    }catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

export default itemsRouter;