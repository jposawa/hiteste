import React from 'react';
import ItemLista from '../../componentes/ItemLista';
import { useControle } from '../../hooks/controle';

// import data from '../../dados/data.json';
import "antd/dist/antd.css";
import styles from './styles.module.css';

export default function Inicio(){
  const {dados} = useControle();

  return(
    <div className={`temaPrincipal ${styles.corpoPagina}`}>
      {dados && Object.values(dados).length > 0 && Object.values(dados).map(d => (
        <ItemLista
          key = {d.id}
          dadosItem = {d}
        />
      ))}
    </div>
  );
}