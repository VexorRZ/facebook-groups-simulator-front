import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSuccess = (message: string) => {
  toast.dismiss();
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};

export const ToastError = (message: string) => {
  toast.dismiss();
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};

export const ToastMessage = (message: string) => {
  toast.dismiss();
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};
