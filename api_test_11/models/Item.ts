import mongoose, {Schema} from "mongoose";

const ItemSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Требуется идентификатор пользователя.'],

    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'Требуется идентификатор категории.'],
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
})

const Item = mongoose.model("Item", ItemSchema);

export default Item;