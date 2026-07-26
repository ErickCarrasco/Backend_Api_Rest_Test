import mongoose from 'mongoose';
import keys from './keys';

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(keys.MONGO_URL);
    console.log('DB CONNECTED');
  } catch (error) {
    console.log(error);
  }
}
