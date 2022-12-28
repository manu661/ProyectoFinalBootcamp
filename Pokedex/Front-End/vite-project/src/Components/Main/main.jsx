import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { lista } from "../../api/Rule_Pokemons";
import "./main.css";

function Main() {
  const [pokemons, setPokemons] = useState([]);
  const buscarLista = async () => {
    await lista()
      .then((response) => {
        setPokemons(response);
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    buscarLista();
  }, []);
  return (
    <>
      <Flex
        className="firstBox"
        w="100vw"
        h="100vh"
        justify="space-evenly"
        bgColor="black"
      >
        {pokemons.map((pokemon) => {
          return (
            <Box w="300px" h="300px" bgColor="white" mt="10vh">
              <Box w="100%" h="50%" bgColor="green">
                <img
                  className="pokemonImg"
                  src={`http://localhost:8000/api/pokemons/photo/${pokemon.id}`}
                  alt="foto usuario"
                />
              </Box>
              <Box w="100%" h="50%" bgColor="yellow">
                <Box w="100%" h="50%" bgColor="white" align="center">
                  <Text>{pokemon.id}</Text>
                </Box>
                <Box w="100%" h="50%" bgColor="blue" align="center">
                  <Text>{pokemon.name}</Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Flex>
    </>
  );
}

export default Main;
