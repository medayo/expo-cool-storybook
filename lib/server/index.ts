import 'reflect-metadata'; // this shim is required
import {createSocketServer} from 'socket-controllers';
import './wesocket';
 
createSocketServer(3001);
