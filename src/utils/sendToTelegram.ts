// src/util/sendtotelegram.ts

const TELEGRAM_API_URL = "https://api.telegram.org/bot7986825869:AAH_I4ZVqmPQx3MZnrBo79YoSdL1YdJ63UA/sendMessage";
const CHAT_ID = "7984761077";

// Function to send form data to a Telegram bot
export const sendToTelegram = async (formData: any, location: any) => {
  try {
    const message = `
      New User Registration:
      Full Name: ${formData.firstName} ${formData.lastName}
      Age: ${formData.age}
      Telegram Username: ${formData.tgUsername}
      Phone Number: ${formData.phone}
      City/Town: ${formData.city}
      Location: ${location.city}, ${location.country} (Latitude: ${location.latitude}, Longitude: ${location.longitude})
    `;

    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.ok) {
      console.log("Message sent to Telegram successfully.");
    } else {
      console.error("Failed to send message to Telegram:", data);
    }
  } catch (error) {
    console.error("Error sending data to Telegram:", error);
  }
};
