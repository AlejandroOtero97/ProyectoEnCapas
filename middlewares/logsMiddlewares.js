import logger from './logger.js'

export const logInfo = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}

export const logWarning = (req, res, next) => {
    logger.warn(`${req.method} ${req.url}`);
    next();
}
