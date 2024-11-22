import axios from "axios";

const API_URL = "https://api.smartsupp.com";
const API_KEY = "your_api_key"; // Replace with your SmartSupp API key

interface messageProps {
  message: string;
  conversationId: string;
}

const sendMessage = async ({ message, conversationId }: messageProps) => {
  try {
    const response = await axios.post(
      `${API_URL}/conversations/${conversationId}/messages`,
      { content: message },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export default sendMessage;
