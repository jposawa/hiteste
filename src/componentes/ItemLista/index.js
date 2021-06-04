import React, { useState } from 'react';

import styles from './styles.module.css';

export default function ItemLista(props) {
  // const {dadosItem} = props;
  const { id, name, children } = props;
  const [itemAberto, setItemAberto] = useState(false);

  return (
    <div className={styles.item}>
      <p>
        <span>
          <input id={id} type="checkbox" />

          <label htmlFor={id}>
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
            id={child.id}
            name={child.name}
            children={child.children}
          />
        ))}
      </div>
    </div>
  );
}