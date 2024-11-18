import Swal from 'sweetalert2';

export const LoadingSwal = {
  title: "Please Wait",
  text: "Processing request ...",
  icon: "info",
  allowOutsideClick: false,
  showCancelButton: false,
  showConfirmButton: false,
  didOpen: () => {
    Swal.showLoading();
  }
};
