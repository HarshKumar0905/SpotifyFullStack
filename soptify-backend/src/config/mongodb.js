import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    mongoose.connection.on("Connected", () => {
        console.log("Connection established");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/spotify`)
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error : ', err));
}

export default connectDB;