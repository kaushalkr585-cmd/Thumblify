import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        mongoose.connection.on('connected', () => console.log('MongoDB connected'));
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;