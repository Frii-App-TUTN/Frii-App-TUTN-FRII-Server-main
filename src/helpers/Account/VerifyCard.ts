import axios from "axios";

interface cardVerification {
  status: boolean;
  data: {
    brand: string;
    bank: string;
  };
}

export async function verifyCard(cardBin: Number) {
  try {
    const response: cardVerification = await axios.get(
      `https://api.paystack.co/decision/bin/${cardBin}}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("An error occured");
  }
}
