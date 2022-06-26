import { transporter } from '../config/mailer';

export const newUserEmail = async user => {
  const tmailOptions = {
    toEmail: process.env.ADMIN_EMAIL,
    userName: user.name,
    userEmail: user.email,
  };

  await transporter.sendMail({
    from: '"Node APP" <app@nodeapp.example>', // sender address
    to: tmailOptions.toEmail, // list of receivers
    subject: 'Nuevo Usuario Registrado ✔', // Subject line
    html: `
      <h1>Nuevo Usuario Registrado ✔</h1>
      <p>El usuario ${tmailOptions.userName} ha sido registrado en la aplicación</p>
      <p>Email del usuario: ${tmailOptions.userEmail} </p>
    `,
  });
};

export const newBuyerEmail = async user => {
  const tmailOptions = {
    toEmail: user.email,
    userName: user.name,
    userEmail: user.email,
  };

  await transporter.sendMail({
    from: '"Node APP" <app@nodeapp.example>', // sender address
    to: tmailOptions.toEmail, // list of receivers
    subject: 'Nueva Compra Registrada !', // Subject line
    html: `
      <h1>Nueva Compra</h1>
      <h3>El usuario ${tmailOptions.userName} ha realizado una compra</h3>
      <p>Email del usuario: ${tmailOptions.userEmail} </p>
    `,
  });
};
