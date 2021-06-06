import React, { createContext, useContext, useEffect, useState } from 'react';
import data from '../dados/data.json';

export const ControleContext = createContext();

export const ControleProvider = ({ children }) => {
  const config = {
    prefixoLS: "hiTeste@",
    urlBase: "",
  };
  const [dados, setDados] = useState();

  const definePai = (item) => {
    item.caminho = item.caminho ? [...item.caminho] : [];
    item.filhosMarcados = 0;

    if (item.children) {
      Object.values(item.children).forEach(child => {
        child.caminho = [...item.caminho, item.id];

        if (child.marcado) {
          item.filhosMarcados++;
        }

        if (child.children && Object.values(child.children).length > 0) {
          definePai(child);
        }
      })
    }

    item.marcado = Object.values(item.children).length > 0 && item.filhosMarcados === Object.values(item.children).length;
    item.indeterminate = item.filhosMarcados > 0 && !item.marcado;
  }

  const preparaDados = (dadosBrutos) => {
    if (dadosBrutos) {
      Object.values(dadosBrutos).forEach(dado => {
        definePai(dado);
      });

      setDados({ ...dadosBrutos });
    }
  }

  useEffect(() => {
    const _dadosLS = JSON.parse(localStorage.getItem(`${config.prefixoLS}dados`));
    // console.log(_dadosLS);
    if (_dadosLS && Object.values(_dadosLS).length > 0) {
      setDados({ ..._dadosLS });
    }
    else {
      // setDados({...data});
      preparaDados(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salvaDados = () => {
    if (dados) {
      localStorage.setItem(`${config.prefixoLS}dados`, JSON.stringify(dados));
    }
  }

  useEffect(() => {
    if (dados && Object.values(dados).length > 0) {
      salvaDados();
      // console.warn("Lembrar chamar salvaDados()");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados]);

  const marcaTodosFilhos = (item) => {
    if (!item.children || Object.values(item.children).length === 0) {
      return;
    }

    item.filhosMarcados = item.marcado ? Object.values(item.children).length : 0;
    item.indeterminate = false;

    Object.values(item.children).forEach(child => {
      child.marcado = item.marcado;

      if (child.children && Object.values(child.children).length > 0) {
        marcaTodosFilhos(child);
      }
    })
  }

  const encontraItem = (_dados, caminho) => {
    

    for (let i = 0; i < caminho.length; i++) {
      const _id = caminho[i];
      _dados = Object.values(_dados).filter(dado => (dado.id === _id))[0];

      if (_dados && i < caminho.length - 1) {
        _dados = _dados.children;
      }
    }

    return _dados;
  }

  const atualizaPais = (_dados, caminho) => {
    const _referencias = [];

    caminho.forEach(_id => {
      _dados = Object.values(_dados).filter(dado => (dado.id === _id))[0];

      _referencias.push(_dados);

      _dados = _dados.children;
    });

    _referencias.reverse();

    for (let i = 0; i < _referencias.length; i++) {
      const _ref = _referencias[i];
      _ref.filhosMarcados = Object.values(_ref.children).filter(child => child.marcado).length;

      if (_ref.filhosMarcados > 0) {
        _ref.indeterminate = true;
        _ref.marcado = true;

        if (_ref.filhosMarcados >= Object.values(_ref.children).length) {
          _ref.filhosMarcados = Object.values(_ref.children).length;
          _ref.indeterminate = false;
        }
      }
      else {
        _ref.filhosMarcados = 0;
        _ref.marcado = false;
        _ref.indeterminate = false;
      }

    }
  }

  const controleItem = (dadosItem) => {
    const _dados = { ...dados };

    let _item = encontraItem(_dados, [...dadosItem.caminho, dadosItem.id]);

    marcaTodosFilhos(_item);

    atualizaPais(_dados, dadosItem.caminho);

    setDados({ ..._dados });
  }

  const valores = {
    dados,
    config,
    salvaDados,
    controleItem,
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