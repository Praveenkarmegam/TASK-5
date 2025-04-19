const nodemailer = require('nodemailer');

exports.sendActivationEmail = async (email, token) => {
  console.log('Preparing to send activation email to:', email);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const activationLink = `${process.env.BASE_URL}/activate/${token}`;
  console.log('Activation link:', activationLink);

  try {
    await transporter.sendMail({
      to: email,
      subject: 'Activate Your Account',
      html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`
    });

    console.log('Activation email sent successfully');
  } catch (error) {
    console.error('Failed to send activation email:', error.message);
  }
};


exports.sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  });
};
