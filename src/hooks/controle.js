import React, { createContext, useContext } from 'react';

export const ControleContext = createContext();

export const ControleProvider = ({ children }) => {
  const config = {
    prefixoLS: "hiTeste@",
    urlBase: "",
  };

  const valores = {
    config,
  };

  return (
    <ControleContext.Provider value={valores}>
      {children}
    </ControleContext.Provider>
  );
}

export function useControle() {
  const content = useContext(ControleContext);

  if (!content) {
    console.log("Tem que estar dentro de um Provider");
  }

  return content;
}