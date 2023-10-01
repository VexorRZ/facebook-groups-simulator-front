// /* eslint-disable multiline-ternary */
// import React, { useState } from "react";

// // import api from './config/configApi';

// import defaulpic from "../../assets/images/default-pic.jpg";
// function App() {
//   const [image, setImage] = useState<Blob | MediaSource | null>(null);
//   const [endImg] = useState(defaulpic);
//   const [status, setStatus] = useState({
//     type: "",
//     mensagem: "",
//   });

//   const uploadImage = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);

//     const headers = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     await api
//       .post("/upload-image", formData, headers)
//       .then((response) => {
//         setStatus({
//           type: "success",
//           mensagem: response.data.mensagem,
//         });
//       })
//       .catch((err) => {
//         if (err.response) {
//           setStatus({
//             type: "error",
//             mensagem: err.response.data.mensagem,
//           });
//         } else {
//           setStatus({
//             type: "error",
//             mensagem: "Erro: Tente mais tarde!",
//           });
//         }
//       });
//   };

//   return (
//     <div>
//       <h1>Upload</h1>

//       {status.type === "success" ? (
//         <p style={{ color: "green" }}>{status.mensagem}</p>
//       ) : (
//         ""
//       )}
//       {status.type === "error" ? (
//         <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
//       ) : (
//         ""
//       )}

//       <form>
//         <label>Imagem: </label>
//         <input
//           type="file"
//           name="image"
//           onChange={(e: any) => {
//             setImage(e.target.files[0]);
//           }}
//         />
//         <br />
//         <br />

//         {image ? (
//           <img
//             alt="Imagem"
//             src={URL.createObjectURL(image)}
//             width={150}
//             height={150}
//           />
//         ) : (
//           <img src={endImg} alt="imagem" width="150" height="150" />
//         )}

//         <button type="submit">Salvar</button>
//       </form>
//     </div>
//   );
// }

// export default App;
