const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.FINAL_SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ashish.t@crestinfosystems.net',
    subject: 'Welcome to Task Manager App',
    text: `Welcome to the app, ${name}. let me know how you get along with the app`,
  });
};
const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ashish.t@crestinfosystems.net',
    subject: `Sorry to see you go`,
    text: `GoodBye, ${name}. I hope to see you back after sometime`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
