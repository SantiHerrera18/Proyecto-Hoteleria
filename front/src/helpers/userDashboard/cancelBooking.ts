import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const cancelBooking = async (bookId: string, token: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/bookings/soft-delete/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return true;
  } catch (error: any) {
    Swal.fire({
      title: error.message,
      icon: "error",
    });
  }
};

export default cancelBooking;
