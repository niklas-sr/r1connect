import transporter from '../common/transporter.js';

const verifyCredentials = async ($) => {
  console.log('Starting SMTP verification with settings:', {
    host: $.auth.data.host,
    port: $.auth.data.port,
    secure: $.auth.data.useTls,
    // Don't log password for security
    username: $.auth.data.username
  });

  try {
    await transporter($).verify();
    console.log('SMTP verification successful');
    
    await $.auth.set({
      screenName: $.auth.data.username,
    });
  } catch (error) {
    console.error('SMTP verification failed:', {
      error: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response
    });
    throw error;
  }
};

export default verifyCredentials;