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
        validate: [
            {
                validator: async function (value: string): Promise<boolean> {
                    return value === value.trim();
                },
                message: "Заголовок не должен содержать пробелов."
            },
            {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Заполните заголовок.",
            },
        ],
    },
    description:{
        type: String,
        validate: [
            {
                validator: async function (value: string): Promise<boolean> {
                    return value === value.trim();
                },
                message: "Описание не должен содержать пробелов."
            },
            {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Заполните описание.",
            },
        ],
    },
    image: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        validate: {
            validator: function (value: number) {
                return value > 0;
            },
            message: "Цена должна быть больше нуля."
        }
    }
})

const Item = mongoose.model("Item", ItemSchema);

export default Item;