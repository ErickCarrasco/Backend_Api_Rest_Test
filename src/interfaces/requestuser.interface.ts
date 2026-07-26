
import {Request} from 'express';
import UserInterface from './user.interface';

// Extended interface for the Request object to include user information and token
interface RequestWithUser extends Request {
  user: UserInterface;
  token: string;
}

export default RequestWithUser;
