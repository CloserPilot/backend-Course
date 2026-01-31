import mongoose from 'mongoose';

const connectDB = async (uri) => {
    try {
        const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);   
        console.log(`\n MongoDB connected!!! ${conectionInstance.connection.host}`);
        
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

export default connectDB;