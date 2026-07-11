import Swal from "sweetalert2";

type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export const showToast = (
  type: ToastType,
  message: string,
  duration = 2000
) => {
  Swal.fire({
    toast: true,
    position: "top-end",

    icon: type,

    title: message,

    showConfirmButton: false,

    timer: duration,

    timerProgressBar: true,
  });
};