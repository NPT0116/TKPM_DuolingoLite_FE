import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

const moneyToPay = 100000;
const description = encodeURIComponent("Thanh toán Premium");

export const getVNPaymentUrl = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}VnpayPayment/CreatePaymentUrl?moneyToPay=${moneyToPay}&description=${description}`,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting payment url:", error);
    return null;
  }
};
