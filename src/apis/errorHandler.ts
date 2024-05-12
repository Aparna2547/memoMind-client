import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
  message: string;
}

const errorHandle = (error: Error | AxiosError) => {
  const axiosError = error as AxiosError;
  if (axiosError.response?.data) {
    const errorResponse = axiosError.response.data as ErrorResponse;
    if (errorResponse.message) {
      toast.error(errorResponse.message);
    }
  } else {
    toast.error("server is connecting.Please wait");
  }
};

export default errorHandle;
