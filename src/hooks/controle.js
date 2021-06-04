import React, { createContext, useContext, useEffect, useState } from 'react';
import data from '../dados/data.json';

export const ControleContext = createContext();

export const ControleProvider = ({ children }) => {
  const config = {
    prefixoLS: "hiTeste@",
    urlBase: "",
  };
  const [dados, setDados] = useState();

  const definePai = (item) =>{
    item.marcado = false;
    
    if(item && item.children){
      Object.values(item.children).forEach(child => {
        child.pai = item.id;
        
        if(child.children && Object.values(child.children).length > 0){
          definePai(child);
        }
      })
    }
  }

  const preparaDados = (dadosBrutos) =>{
    if(dadosBrutos){
      Object.values(dadosBrutos).forEach(dado => {
        definePai(dado);
      });

      setDados({...dadosBrutos});
    }
  }

  useEffect(()=>{
    const _dadosLS = JSON.parse(localStorage.getItem(`${config.prefixoLS}dados`));

    if(_dadosLS && Object.values(_dadosLS).length > 0){
      setDados({..._dadosLS});
    }
    else{
      // setDados({...data});
      preparaDados(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const salvaDados = () =>{
    if(dados){
      localStorage.setItem(`${config.prefixoLS}dados`, JSON.stringify(dados));
    }
  }

  const valores = {
    dados,
    config,
    salvaDados,
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