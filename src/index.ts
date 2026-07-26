import {Server} from './server';
import { connect } from './config/mongo';

const server = new Server();
connect();
server.start();
