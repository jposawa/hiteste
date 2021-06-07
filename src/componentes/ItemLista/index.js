import React, { useEffect, useState } from 'react';
import { useControle } from '../../hooks/controle';

import styles from './styles.module.css';

export default function ItemLista(props) {
  const {dadosItem} = props;
  const { id, name, children, marcado, indeterminate } = dadosItem;
  const [itemAberto, setItemAberto] = useState(false);
  const {controleItem} = useControle();

  const selecionaItem = (evento) =>{
    if(dadosItem.indeterminate){
      evento.target.checked = true;
    }

    dadosItem.marcado = evento.target.checked;
    dadosItem.indeterminate = false;
    
    controleItem(dadosItem);
  }

  useEffect(()=>{
    // console.log(marcado);
    const _campo = document.getElementById(id);

    _campo.checked = marcado;
    _campo.indeterminate = indeterminate;
  },[id, marcado, indeterminate])

  return (
    <div className={styles.item}>
      <p>
        <span>
          <input type="checkbox" id={id} onChange={selecionaItem} defaultChecked={marcado}/>

          <label className={styles.etiquetaItem} htmlFor={id}>
            <span>{name}</span>
          </label>
        </span>
        
        {children && Object.values(children).length > 0 &&
          <button type="button" className={itemAberto ? styles.setaItemAberto : undefined} onClick={() => { setItemAberto(!itemAberto); }}>
            <span>&#10095;</span>
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