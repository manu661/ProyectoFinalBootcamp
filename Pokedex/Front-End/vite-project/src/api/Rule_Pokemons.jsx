import API from "./Rule_Api";

export const lista = async () => {
  let url = "/api/pokemons";
  return await API.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error.response.data.error || "Error procesando la solicitud";
    });
};
