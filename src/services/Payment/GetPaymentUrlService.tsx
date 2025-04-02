import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

const description = encodeURIComponent("Thanh toán Premium");

export const getVNPaymentUrl = async (money: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}VnpayPayment/CreatePaymentUrl?moneyToPay=${money}&description=${description}`,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting payment url:", error);
    return null;
  }
};
