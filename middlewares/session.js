import session from 'express-session';
import { mongoStore } from './../configs/config.js';
export const sessionHandler = session(mongoStore);