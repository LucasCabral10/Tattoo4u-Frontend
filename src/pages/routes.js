import axios from "axios";

export default async function formConsult(id) {
  try {
    if (!id) {
      throw new Error("Formulário não encontrado.");
    }
    const response = await axios.get(`https://tattoo4ubackend.onrender.com/api/form/consult/${id}`);
    const data = response.data;
    console.log("Dados do formulário:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}

export async function uploadImages(images) {
  const response = [];
  for (images of images) {
    const formData = new FormData();
    formData.append("image", images);
    const response = await axios.post("http://localhost:3333/api/upload", formData);
    responses.push(response.data);
  }
  return response;
}
