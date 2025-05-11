import mongoose from 'mongoose';
import { config } from 'dotenv';
config()

const dbUri: string = process.env.LEAVE_TRACKING_SYSTEM_MONGO_URL || '';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const connectDatabase = async (retries = 0): Promise<void> => {
    try {

        const connection = await mongoose.connect(dbUri);
        console.log(`MongoDB connected. Host: ${connection.connection.host}`);
    } catch (error: any) {
        console.error(`MongoDB connection failed (attempt ${retries + 1}): ${error.message}`);

        if (retries < MAX_RETRIES - 1) {
            setTimeout(() => connectDatabase(retries + 1), RETRY_DELAY_MS);
        } else {
            console.error('Maximum retry attempts reached. Terminating application.');
            process.exit(1);
        }
    }
};

export default connectDatabase;
