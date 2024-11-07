import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    username: string,
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;