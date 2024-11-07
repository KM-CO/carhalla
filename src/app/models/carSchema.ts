import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICar extends Document {
    car_model: string;
    make: string;
    price: number;
    image?: string;
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
    image: {
        type: String,
        required: false,
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