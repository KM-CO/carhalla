import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICar extends Document {
    car_model: string;
    make: string;
    price: number;
    img?: string;
    desc?: string;
    date_modified: Date;
}

const carSchema = new Schema<ICar>({
    car_model: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: false,
        default: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
    },
    desc: {
        type: String,
        required: false,
    },
    date_modified: {
        type: Date,
        default: Date.now(),
    }
});

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>("Car", carSchema);
export default Car;