import axios from "axios";

interface bankVerification {
  status: boolean;
  data: {
    account_name: string;
  };
}

export async function verifyBank(accountNumber: String, bankCode: String) {
  try {
    const response: bankVerification = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
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
