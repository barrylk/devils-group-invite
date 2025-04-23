export async function sendToTelegram(data: any) {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing Telegram bot token or chat ID in environment variables.");
    return;
  }

  const message = `
🚨 New Invite Submission 🚨

👤 Name: ${data.fullName}
🎂 Age: ${data.age}
📞 Phone: ${data.phone}
💬 Telegram: @${data.tgUsername}
🏙️ City: ${data.city}
📍 Location: ${data.location?.latitude}, ${data.location?.longitude}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      console.error("Failed to send Telegram message:", await response.text());
      throw new Error("Telegram API error");
    }

    console.log("Message sent to Telegram successfully.");
  } catch (err) {
    console.error("sendToTelegram error:", err);
  }
}
