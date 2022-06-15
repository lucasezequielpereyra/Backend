import twilio from "twilio";
import logger from "../config/winston";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const sendWhatssap = async (user) => {
  let message = "";
  try {
    message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.ADMIN_CEL}`,
      body: `
      El usuario ${user.name}, correo electronico ${user.email} ha realizado una compra!
    `,
    });
  } catch (err) {
    logger.error.error(err);
  }
};
