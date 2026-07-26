import { Document, Schema } from 'mongoose';

// Logs of Auth
interface LogAuthInterface extends Document {
  token: string;
  active: boolean;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
}

export default LogAuthInterface;