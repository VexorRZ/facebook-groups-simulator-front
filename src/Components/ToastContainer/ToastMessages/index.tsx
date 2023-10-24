import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSuccess = () => {
  const message = "Login realizado com sucesso";
  toast.dismiss();
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};

export const ToastError = () => {
  const message = "erro mano";
  toast.dismiss();
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};
