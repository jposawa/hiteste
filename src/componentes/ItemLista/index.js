import React, { useState } from 'react';
import {Checkbox} from 'antd';
import { useControle } from '../../hooks/controle';

import styles from './styles.module.css';

export default function ItemLista(props) {
  const {dadosItem} = props;
  const { id, name, children, marcado, indeterminate } = dadosItem;
  const [itemAberto, setItemAberto] = useState(false);
  const {controleItem} = useControle();

  const selecionaItem = (evento) =>{
    dadosItem.marcado = evento.target.checked;
    
    controleItem(dadosItem);
  }

  return (
    <div className={styles.item}>
      <p>
        <span>
          <Checkbox
            id={id}
            onChange={selecionaItem}  
            checked = {marcado}
            indeterminate = {indeterminate}
          />
          {/* <input id={id} type="checkbox" /> */}

          <label className={styles.etiquetaItem} htmlFor={id}>
            {name}
          </label>
        </span>
        
        {children && Object.values(children).length > 0 &&
          <button type="button" className={itemAberto ? styles.setaItemAberto : undefined} onClick={() => { setItemAberto(!itemAberto); }}>
            &#10095;
        </button>
        }
      </p>

      <div className={itemAberto ? `${styles.listaFilhos} ${styles.itemAberto}` : `${styles.listaFilhos}`}>
        {children && Object.values(children).length > 0 && Object.values(children).map(child => (
          <ItemLista
            key={child.id}
            dadosItem={child}
          />
        ))}
      </div>
    </div>
  );
}