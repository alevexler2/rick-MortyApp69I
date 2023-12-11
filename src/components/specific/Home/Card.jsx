import React from 'react'
import styles from './styles.module.css';

const Card = ({ character: { name, image, species, status } }) => {
  const { cardText } = styles;

  return (
    <div className="card col-3">
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Nombre: {name}</h5>
        <ul>
          <li className={cardText}>Especie: {species}</li>
          <li className={cardText}>Estatus: {status}</li>
        </ul>
      </div>
    </div>
  )
}

export default Card