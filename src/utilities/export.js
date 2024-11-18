import Swal from "sweetalert2";
import { axios } from "../axios-client";
import { LoadingSwal } from "../components/resources/swal/LoadingSwal";
import { api } from "./axios-gateway";

//EXPORT CSV/EXCEL
const exportFiles = (url, name) => {
  Swal.fire(LoadingSwal);

  api
    .get(url, { responseType: "blob" })
    .then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = name + ".csv";

      // Append the anchor to the document and trigger a click
      document.body.appendChild(a);
      a.click();

      // Remove the anchor from the document
      document.body.removeChild(a);
    })

    .catch((error) => {
      console.error("Error deleting item", error);
    })
    .finally(() => {
      Swal.close();
    });
};

export default exportFiles;
