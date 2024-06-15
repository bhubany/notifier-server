const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const client = require("twilio")(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const whatsAppNumber = process.env.TWILIO_WHATS_APP_NUMBER;

export async function fetchMessage() {
  try {
    const promiseMessage = await client.messages.list();
    console.log(promiseMessage);
  } catch (error) {
    console.log("Error occured while fetching messages: ", error);
  }
}

export async function sendMessage() {
  try {
    let res = await client.messages.create({
      body: "Hello I am sending this message from App",
      to: "+9779808888909",
      from: twilioPhoneNumber,
    });
    console.log(res);
  } catch (error) {
    console.log("Error occured while sending message to mobile: ", error);
  }
}

export async function sendWhatsAppMessage() {
  try {
    let res = await client.messages.create({
      body: "Your appointment is coming up on July 21 at 3PM",
      from: whatsAppNumber,
      to: "whatsapp:+9779808888909",
    });
    console.log("WhatsApp message sent response: ", res);
  } catch (error) {
    console.log("Error occured sending what's app message: ", error);
  }
}
