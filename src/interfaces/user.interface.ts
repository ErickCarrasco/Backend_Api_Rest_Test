import {Document} from 'mongoose';

interface UserInterface extends Document {
  email: string;
  password: string;
  name: string;
  username: string;
  typeRegister: string;
  verified: boolean;
  role: string;
  idCard: string;
  accountState: 'active' | 'locked';
}

export default UserInterface;