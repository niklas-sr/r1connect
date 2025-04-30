import logger from '../../../helpers/logger.js';
import transporter from '../common/transporter.js';

const verifyCredentials = async ($) => {
  logger.info('[SMTP] Starting verification', {
    host: $.auth.data.host,
    port: $.auth.data.port,
    secure: $.auth.data.useTls,
    username: $.auth.data.username,
    // Omit password for security
  });

  try {
    const smtp = transporter($);
    
    // Add debug event listeners
    smtp.on('connection', () => {
      logger.info('[SMTP] Connection established');
    });

    smtp.on('error', (err) => {
      logger.error('[SMTP] Transport error', { error: err.message });
    });

    smtp.on('log', (log) => {
      logger.debug('[SMTP] Transport log', { log });
    });

    // Set longer timeout for verify
    const verifyResult = await smtp.verify({ timeout: 10000 });
    
    logger.info('[SMTP] Verification successful', { result: verifyResult });

    await $.auth.set({
      screenName: $.auth.data.username,
    });
  } catch (error) {
    logger.error('[SMTP] Verification failed', {
      error: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
      stack: error.stack
    });
    throw error;
  }
};

export default verifyCredentials;