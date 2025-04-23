import axios from 'axios';

const sendToTelegram = async (data: {
  fullName: string;
  age: string;
  tgUsername: string;
  phoneNumber: string;
  city: string;
  location: string;
}) => {
  const { fullName, age, tgUsername, phoneNumber, city, location } = data;

  // Telegram Bot Token and Chat ID from environment variables
  const botToken = process.env.VITE_BOT_TOKEN;
  const chatId = process.env.VITE_CHAT_ID;

  // Prepare message
  const message = `
    New form submission:
    
    Full Name: ${fullName}
    Age: ${age}
    Telegram Username: ${tgUsername}
    Phone Number: ${phoneNumber}
    City/Town: ${city}
    Location: ${location}
  `;

  try {
    // Send data to Telegram using Bot API
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    throw error;
  }
};

export default sendToTelegram;
