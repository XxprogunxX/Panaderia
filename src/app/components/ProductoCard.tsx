import Image from 'next/image';
import FancyButton from './FancyButton';
import React from 'react';

interface ProductoCardProps {
  etiqueta: string;
  etiquetaClase?: string;
  imagen: string;
  alt: string;
  rating: string;
  reviews: number;
  nombre: string;
  precio: string;
  notas: string;
  tueste: string;
  onComprar?: () => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({
  etiqueta,
  etiquetaClase = '',
  imagen,
  alt,
  rating,
  reviews,
  nombre,
  precio,
  notas,
  tueste,
  onComprar
}) => (
  <div className="producto-card">
    <div className={`producto-etiqueta ${etiquetaClase}`}>{etiqueta}</div>
    <Image src={imagen} alt={alt} width={180} height={180} className="producto-img" />
    <div className="producto-info">
      <div className="producto-rating">{rating} <span>({reviews})</span></div>
      <h3 className="producto-nombre">{nombre}</h3>
      <p className="producto-precio">{precio}</p>
      <p className="producto-notas">{notas}</p>
      <p className="producto-tueste">{tueste}</p>
      <FancyButton onClick={onComprar}>Comprar</FancyButton>
    </div>
  </div>
);

export default ProductoCard; 