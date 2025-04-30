import nodemailer from 'nodemailer';

const transporter = ($) => {
  console.log('Creating SMTP transport with config:', {
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
    logger: true // Enable logger output
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
