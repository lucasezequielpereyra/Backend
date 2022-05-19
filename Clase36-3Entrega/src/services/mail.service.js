import { transporter } from "../config/mailer";

export const newUserEmail = async (user) => {
  await transporter.sendMail({
    from: '"Node APP" <app@nodeapp.example>', // sender address
    to: process.env.ADMIN_EMAIL, // list of receivers
    subject: "Nuevo Usuario Registrado ✔", // Subject line
    html: `
      <h1>Nuevo Usuario Registrado ✔</h1>
      <p>El usuario ${user.name} ha sido registrado en la aplicación</p>
      <p>Email del usuario: ${user.email} </p>
    `,
  });
};

export const newBuyerEmail = async (user) => {
  await transporter.sendMail({
    from: '"Node APP" <app@nodeapp.example>', // sender address
    to: process.env.ADMIN_EMAIL, // list of receivers
    subject: "Nueva Compra Registrada !", // Subject line
    html: `
      <h1>Nueva Compra</h1>
      <h3>El usuario ${user.name} ha realizado una compra/h3>
      <p>Email del usuario: ${user.email} </p>
    `,
  });
};
