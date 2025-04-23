import axios from "axios";

export const sendToTelegram = async (formData: any) => {
  try {
    // Log the bot token and chat ID to check if they are being correctly loaded from environment
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    console.log("Bot Token:", botToken); // Log the token to verify
    console.log("Chat ID:", chatId);     // Log the chat ID to verify

    // Prepare the message
    const message = `
      Full Name: ${formData.fullName}
      Age: ${formData.age}
      Telegram Username: ${formData.tgUsername}
      Phone: ${formData.phone}
      City/Town: ${formData.city}
      Location: ${formData.location.latitude}, ${formData.location.longitude}
    `;

    // Log the message to be sent
    console.log("Sending message:", message);

    // Send the message via the Telegram API
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }
    );

    // Log the response from Telegram API
    console.log('Telegram response:', response.data);

    return response.data; // Return the response to be used in .then()
  } catch (error) {
    console.error('Error sending message to Telegram:', error); // Log any errors
    throw new Error('Failed to send message to Telegram');
  }
};
