import React from 'react';
import ItemLista from '../../componentes/ItemLista';

import data from '../../dados/data.json';

import styles from './styles.module.css';

export default function Inicio(){

  return(
    <div className={`temaPrincipal ${styles.corpoPagina}`}>
      {data && Object.values(data).length > 0 && Object.values(data).map(d => (
        <ItemLista
          key = {d.id}
          id = {d.id}
          name = {d.name}
          children = {d.children}
        />
      ))}
    </div>
  );
}