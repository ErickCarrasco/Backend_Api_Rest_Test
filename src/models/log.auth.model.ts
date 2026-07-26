
import { Schema, model } from 'mongoose';
import LogAuthInterface from '../interfaces/log.auth.interface';

export const LogAuthSchema = new Schema({
  token: {
    type: String,
    required: true,
    indexes: true
  },
  active: {
    type: Boolean,
    required: true,
  },
  userId: { // Foreign key to User
    type: Schema.Types.ObjectId,
    required: true,
    indexes: true,
    ref: 'users'
  }
});

const LogAuth =  model<LogAuthInterface>('logAuthData', LogAuthSchema);

export default LogAuth;
    
    