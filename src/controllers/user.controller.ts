
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';



import RequestUserInterface from '../interfaces/requestuser.interface';
import UserModel from '../models/user.model';
import LogAuthModel from '../models/log.auth.model';
import keys from '../config/keys';
import Quotation from '../models/quotation.mode';


class UserController {

  /**
   * -----------------------------------------------
   * Create User
   * -----------------------------------------------
   * This method allows the creation of a new user.
   * This is an optional method for testing purposes,
   * it allows the creation of a user with email, password, and name.
   * It may also include an optional ID for testing the login with ID feature.
   * However, it is recommended to checkt the MongoDB database to verify 
   * if the user has been created successfully.
   * -----------------------------------------------
   * @body email, password, name, id (optional)
   * @returns status, info, token, user
   * 
   */
  public async createUser (req: Request, res: Response) {
    const {
      email,
      password,
      name,
      id,  
    } = req.body;
    try {
      if (  email && password && name ) {
        // Verify Existing email
        const emailExists = await UserModel.findOne({email: email, typeRegister: 'email'});
        if (emailExists) {
          return res.status(400).json({
            status: 'error',
            info: 'Correo ya existe'
          });
        }
        
        // Hash Password & Create User
        const salt = await bcrypt.genSalt(keys.saltPassword);
        const hashPassword = await bcrypt.hash(password, salt);
        const dataUser = new UserModel({
          email: email,
          name: name,
          password: hashPassword,
          typeRegister: 'email',
          idCard: id || '0000000000',
        });
        // Save User
        await dataUser.save();
        // Payload for JWT
        const user = {
          _id: dataUser._id,
          email: dataUser.email,
          name: dataUser.name,
          verified: dataUser.verified,
          typeRegister: dataUser.typeRegister,
          role: 'user', 
        };
        const payload = {user};
        const options: SignOptions = {
          expiresIn: keys.TIMEJWT as SignOptions["expiresIn"],
        };

        const token = jwt.sign(payload, keys.JWT, options);
        const dataLogAuth = new LogAuthModel({
          token: token,
          userId: dataUser._id,
          active: true,
        });
        // Save LogAuth for Token Validation
        await dataLogAuth.save();
        res.json({
          status: 'success',
          info: 'Se creo el usuario de manera exitosa',
          token: token,
          user: user
        });
      } else if (!password) {
        res.status(400).json({
          status: 'error',
          info: 'Contraseña no valida'
        });
      } else if (!email) {
        res.status(400).json({
          status: 'error',
          info: 'Correo no definido'
        });
      } else if (!name) {
        res.status(400).json({
          status: 'error',
          info: 'Nombre no definido'
        });
      } else {
        res.status(400).json({
          status: 'error',
          info: 'Ninguno de los campos definidos'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: 'error',
        info: 'El correo ya existe'
      });
    }
  }

  /**
   * 
   * ----------------------------------------------
   * Login with Email
   * ----------------------------------------------
   * This method allows the user to log in using their email and password.
   * The body contains the email and password,
   * and if the credentials are valid, 
   * it returns a JWT token and user information.
   * ----------------------------------------------
   * 
   * @body email, password
   * @returns status, info, token, user
   * 
   */
  public async loginWithEmail (req: Request, res: Response) {
    const {email, password} = req.body;
    try {
      // Verify user existence
      const user = await UserModel.findOne({email: email});
      if (!user) {
        return res.status(400).json({
          status: 'error', 
          info: 'Correo no encontrado'
        });
      }
      // User Must not be locked
      if (user.accountState === 'locked') {
        return res.status(403).json({
          status: 'error',
          info: 'Su usuario ha sido bloqueado',
        });
      }
      if (user) {
        // Match Passwords  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const dataUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          };
          const payload = {user: dataUser};
          const options: SignOptions = {
            expiresIn: keys.TIMEJWT as SignOptions["expiresIn"],
          };

          const token = jwt.sign(payload, keys.JWT, options);
          const dataLogAuth = new LogAuthModel({
            token: token,
            userId: dataUser._id,
            active: true,
          });
          // Save LogAuth for Token Validation
          await dataLogAuth.save();
          res.json({
            status: 'success',
            info: 'Se ha iniciado sesión con éxito',
            token: token,
            user: dataUser
          });
        } else {
          res.status(400).json({
            status: 'error',
            info: 'Correo o contraseña no válidos'
          });
        }
      } else {
        res.status(400).json({
          status: 'error',
          info: 'Correo o contraseña no válidos'
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'error',
        info: 'Error al iniciar sesión'
      });
    }
  }

  // OPTIONAL: Login with ID for testing purposes
  public async loginWithId (req: Request, res: Response) {
    const {id, password} = req.body;
    try {
      // Verify user existence
      const user = await UserModel.findOne({idCard: id});
      if (!user) {
        return res.status(400).json({
          status: 'error', 
          info: 'ID/Usuario no encontrado'
        });
      }
      // User Must not be locked
      if (user.accountState === 'locked') {
        return res.status(403).json({
          status: 'error',
          info: 'Su usuario ha sido bloqueado',
        });
      }
      if (user) {
        // Match Passwords  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const dataUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          };
          const payload = {user: dataUser};
          const options: SignOptions = {
            expiresIn: keys.TIMEJWT as SignOptions["expiresIn"],
          };

          const token = jwt.sign(payload, keys.JWT, options);
          const dataLogAuth = new LogAuthModel({
            token: token,
            userId: dataUser._id,
            active: true,
          });
          // Save LogAuth for Token Validation
          await dataLogAuth.save();
          res.json({
            status: 'success',
            info: 'Se ha iniciado sesión con éxito',
            token: token,
            user: dataUser
          });
        } else {
          res.status(400).json({
            status: 'error',
            info: 'Correo o contraseña no válidos'
          });
        }
      } else {
        res.status(400).json({
          status: 'error',
          info: 'Correo o contraseña no válidos'
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'error',
        info: 'Error al iniciar sesión'
      });
    }
  }

  /**
   * 
   * ----------------------------------------------
   * Login with Email or ID
   * ----------------------------------------------
   * This method allows the user to log in using their email/ID and password.
   * The body contains the email/ID and password,
   * and if the credentials are valid, 
   * it returns a JWT token and user information.
   * MUST INCLUDE EITHER EMAIL OR ID, AND PASSWORD IN THE BODY.
   * ----------------------------------------------
   * 
   * @body email, password
   * @returns status, info, token, user
   * 
   */
  public async loginGeneral (req: Request, res: Response) {
    const {email, id, password} = req.body;
    try {
      // Verify user existence
      const user = await UserModel.findOne({
        $or: [
          {email: email},
          {idCard: id}
        ]
      });
      if (!user) {
        return res.status(400).json({
          status: 'error', 
          info: 'Correo o ID no encontrado'
        });
      }
      // User Must not be locked
      if (user.accountState === 'locked') {
        return res.status(403).json({
          status: 'error',
          info: 'Su usuario ha sido bloqueado',
        });
      }
      if (user) {
        // Match Passwords  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const dataUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          };
          const payload = {user: dataUser};
          const options: SignOptions = {
            expiresIn: keys.TIMEJWT as SignOptions["expiresIn"],
          };

          const token = jwt.sign(payload, keys.JWT, options);
          const dataLogAuth = new LogAuthModel({
            token: token,
            userId: dataUser._id,
            active: true,
          });
          // Save LogAuth for Token Validation
          await dataLogAuth.save();
          res.json({
            status: 'success',
            info: 'Se ha iniciado sesión con éxito',
            token: token,
            user: dataUser
          });
        } else {
          res.status(400).json({
            status: 'error',
            info: 'Correo, ID o contraseña no válidos'
          });
        }
      } else {
        res.status(400).json({
          status: 'error',
          info: 'Correo o contraseña no válidos'
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'error',
        info: 'Error al iniciar sesión'
      });
    }
  }

  
  /**
   *  ----------------------------------------------
   *  Change Password
   *  ----------------------------------------------
   *  This is an optional method for testing purposes, 
   *  it allows the user to change their password.
   *  User must provide the current password, new password, and confirmation of the new password.
   *  Must be logged in to change the password. 
   *  ----------------------------------------------
   * @param req 
   * @param res 
   */
  public async changePassword (req: RequestUserInterface, res: Response) {
    const {body, user} = req;
    const {currentPassword, newPassword, confirmNewPassword} = body;
    try {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (isMatch && (newPassword === confirmNewPassword) && newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        await UserModel.updateOne({_id: user._id}, {
          $set: {
            password: hashPassword
          }
        });
        res.json({
          status: 'success',
          info: 'Se ha actualizado la contraseña'
        });
      } else if (!isMatch) {
        res.status(400).json({
          status: 'error',
          info: 'Contraseña actual incorrecta'
        });
      } else if (newPassword !== confirmNewPassword) {
        res.status(400).json({
          status: 'error',
          info: 'Error las contraseñas no coinciden'
        });
      } else if (!newPassword) {
        res.status(400).json({
          status: 'error',
          info: 'Contraseña no válida'
        });
      } else {
        res.status(400).json({
          status: 'error',
          info: 'Error no se pudo actualizar la contraseña'
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'error',
        info: 'Error no se pudo actualizar la contraseña'
      });
    }
  }

  /**
   *  ----------------------------------------------
   *  Logout
   *  ----------------------------------------------
   *  This method allows the user to log out by deactivating
   *  the token in the LogAuth collection.
   *  
   * 
   */
  public async logout (req: RequestUserInterface, res: Response) {
    const {token, user} = req;
    try {
      await LogAuthModel.updateOne({ token, userId: user._id }, {
        $set: {
          active: false
        }
      });
      res.json({
        status: 'success',
        info: 'Se cerro la sesión'
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        info: 'Error al cerrar la sesión'
      });
    }
  }

  // OPTIONAL: Used to retrieve the logged-in user's information for testing purposes
  public async getLoggedUser (req: RequestUserInterface, res: Response) {
    const {user} = req;
    if (user.accountState === 'locked') {
      return res.status(403).json({
        status: 'error',
        info: 'Usuario Bloqueado',
      });
    }
    res.json({
      status: 'success',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      }
    });
  }

  // OPTIONAL: Used to delete the logged-in user's account and all associated data for testing purposes
  public async lowUser (req: RequestUserInterface, res: Response) {
    try {
      const {user} = req;
      await UserModel.deleteOne({_id: user._id});
			await Quotation.updateMany({userId: user._id.toString()}, {
        $set: {
          isActive: false
        }
      });

      res.json({
        status: 'success',
        info: 'Se elimino de manera exitosa toda tu información',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        info: 'Error al procesar la peticion'
      });
    }
  }

}

export default new UserController();
