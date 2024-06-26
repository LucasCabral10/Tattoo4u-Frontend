import axios from "axios";

//Trocar todos endereços de uma vez
const linkApi = "https://backend-backend.fwhe6r.easypanel.host/api";
//const linkApi = "http://localhost:3333/api";

export default async function formConsult(id) {
  try {
    if (!id) {
      throw new Error("Formulário não encontrado.");
    }
    const response = await axios.get(`${linkApi}/form/consult/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}

export async function sharedConsult(session, limit, offset) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    };
    const response = await axios.get(`${linkApi}/shared/allconsult/${session.id}`, config);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}

export async function sharedDelete(session, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  };
  await axios.delete(`${linkApi}/shared/delete/${id}`, config);
}

export async function sharedSchedule(session, id, Schedule) {
  const config = {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  };
  await axios.put(`${linkApi}/shared/update/${id}`, Schedule, config);
}
