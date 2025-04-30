import nodemailer from 'nodemailer';
import logger from '../../../helpers/logger.js';

const transporter = ($) => {
  logger.info('[SMTP] Creating transport', {
    host: $.auth.data.host,
    port: $.auth.data.port,
    secure: $.auth.data.useTls,
    // Don't log password for security
    username: $.auth.data.username
  });

  const transport = nodemailer.createTransport({
    host: $.auth.data.host,
    port: $.auth.data.port,
    secure: $.auth.data.useTls,
    auth: {
      user: $.auth.data.username,
      pass: $.auth.data.password,
    },
    debug: true, // Enable debug output
    logger: {
      debug: (msg) => logger.debug('[SMTP Debug]', { msg }),
      info: (msg) => logger.info('[SMTP Info]', { msg }),
      warn: (msg) => logger.warn('[SMTP Warn]', { msg }),
      error: (msg) => logger.error('[SMTP Error]', { msg })
    }
  });

  // Add event listeners for connection events
  transport.on('error', (error) => {
    console.error('SMTP Transport error:', error);
  });

  transport.on('log', (log) => {
    console.log('SMTP Transport log:', log);
  });

  return transport;
};

export default transporter;
