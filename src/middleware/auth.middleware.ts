
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';
import RequestWithUser from '../interfaces/requestuser.interface';
import UserModel from '../models/user.model';
import DataStoredInToken from '../interfaces/data.storage.in.token';
import LogAuthModel from '../models/log.auth.model';

export default async function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) : Promise<void> {
  //get Token from header
  const token = req.header('AuthorizationApp');
   
  // Check if token is not present
  if (!token) {
    res.status(401).json({
      status: 'errorAuth',
      info: 'Token no valido'
    });
  } else {
    //Verify Token
    try {
      const decoded = jwt.verify(token, keys.JWT) as DataStoredInToken;
      const data = await UserModel.findById(decoded.user._id);
      if (!data) {
        res.status(401).json({
          status: 'errorAuth',
          info: 'Token no valido'
        });
      }
      const logauth = await LogAuthModel.findOne({ token: token });
      if (logauth && logauth.active && data) {
        req.user = data;
        req.token = token;
        // Continue to the next middleware or route handler
        next();
      } else {
        res.status(401).json({
          status: 'errorAuth',
          info: 'Token no valido'
        });
      }
    } catch (err) {
      res.status(401).json({
        status: 'errorAuth',
        info: 'Token no valido'
      });
    }
  }
}
