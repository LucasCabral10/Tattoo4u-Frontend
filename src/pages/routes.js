import axios from "axios";

export default async function formConsult(id) {
  try {
    if (!id) {
      throw new Error("Formulário não encontrado.");
    }
    const response = await axios.get(
      `https://backend-4u-backend.fwhe6r.easypanel.host/api/form/consult/${id}`
    );
    const data = response.data;
    console.log("Dados do formulário:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}
