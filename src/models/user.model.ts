
import {Schema, model} from 'mongoose';
import UserInterface from '../interfaces/user.interface';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    index: true,
  },
  typeRegister: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
  },
  role: {
    type: String,
  },
  idCard: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model<UserInterface>('UserData', UserSchema);

export default UserModel;
