import express from 'express';
import morgan from 'morgan';
import http from "http";
import path from 'path';
// import cors from 'cors';
import keys from './config/keys';


// rutas
import UserRoutes from './routes/user.route';
import ProductsRoutes from './routes/product.route';
import QuotationRoute from './routes/quotation.route';


class Server {

  public app: express.Application

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config (): void {
    const { app } = this;
    // settings
    app.set('port', keys.PORT);
    // middlewares
    // app.use(cors());
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Expose-Headers', 'Content-Length');
      res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
      if (req.method === 'OPTIONS') {
        return res.send(200);
      } else {
        return next();
      }
    });
    app.use(morgan(keys.MORGAN_DEV));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
  }

  public routes (): void {
    const { app } = this;
    console.log('UserRoutes:', typeof UserRoutes);
    console.log('ProductsRoutes:', typeof ProductsRoutes);
    console.log('QuotationRoute:', typeof QuotationRoute);
    app.use('/api/user', UserRoutes);
    app.use('/api/product', ProductsRoutes);
    app.use('/api/quotation', QuotationRoute);
  }

  

  public start () : void {
    const { app } = this;
    const httpServer = http.createServer(app);

    httpServer.listen(keys.PORT, () => {
      console.log("Server running");
    });

    app.listen(app.get('port'), () => {
      console.log(`Server start http://localhost:${app.get('port')}`);
    });
  }

}

export {
  Server
};
