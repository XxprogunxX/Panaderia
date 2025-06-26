"use client"
import { Playfair_Display, Montserrat } from 'next/font/google';
import './styles.css';
import ProductoCard from '../components/ProductoCard';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-montserrat' });

export default function ProductosCafePage() {
  const [cafes, setCafes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCafes = async () => {
      setCargando(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const lista: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.category === 'Café') {
            lista.push({ id: doc.id, ...data });
          }
        });
        setCafes(lista);
      } catch (error) {
        // Puedes mostrar un error si lo deseas
      } finally {
        setCargando(false);
      }
    };
    cargarCafes();
  }, []);

  return (
    <main className={`cafe-page ${playfair.variable} ${montserrat.variable}`}>
      <nav className="navbar">
        <div className="navbar-brand-container">
          <Link href="/" className={`nav-link logo-text ${playfair.className}`}>Cafetería</Link>
        </div>
        <div className="navbar-links-container">
          <Link href="/cafe" className={`nav-link ${montserrat.className}`}>Inicio</Link>
          <Link href="/productoscafe" className={`nav-link ${montserrat.className}`}>Productos</Link>
          <Link href="/" className={`nav-link ${montserrat.className}`}>Panadería</Link>
          <Link href="#testimonios" className={`nav-link ${montserrat.className}`}>Testimonios</Link>
          <Image
            src="/images/logo-cafe.png"
            alt="Logo de la Cafetería"
            width={50}
            height={50}
            className="navbar-logo-image"
          />
        </div>
      </nav>
      <section className="productos">
        <h2 className={`productos-titulo ${playfair.className}`}>Nuestros Cafés</h2>
        {cargando ? (
          <p className={montserrat.className}>Cargando cafés...</p>
        ) : cafes.length === 0 ? (
          <p className={montserrat.className}>No hay productos de café registrados.</p>
        ) : (
          <div className="productos-grid">
            {cafes.map((cafe) => (
              <div key={cafe.id} className="producto-card">
                <div className={`producto-etiqueta natural ${playfair.className}`}>{cafe.product}</div>
                <Image src={cafe.pic} alt={cafe.product} width={180} height={180} className="producto-img" />
                <div className={`producto-info ${montserrat.className}`}>
                  <div className="producto-rating">★★★★★</div>
                  <h3 className={`producto-nombre ${playfair.className}`}>{cafe.product}</h3>
                  <p className="producto-precio">Desde ${parseFloat(cafe.price).toFixed(2)} MXN</p>
                  <p className="producto-notas">{cafe.descripcion || ''}</p>
                  {/* Mostrar presentaciones */}
                  {Array.isArray(cafe.presentaciones) && cafe.presentaciones.length > 0 && (
                    <div style={{ margin: '10px 0' }}>
                      <strong>Presentaciones:</strong>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {cafe.presentaciones.map((pres: any, idx: number) => (
                          <li key={idx}>{pres.tamanio} - {pres.stock} unidades</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Mostrar molido y tueste */}
                  {cafe.molido && <p><strong>Molido:</strong> {cafe.molido}</p>}
                  {cafe.tueste && <p><strong>Tueste:</strong> {cafe.tueste}</p>}
                  {/* Botón Comprar */}
                  <button className="cta-button" style={{ marginTop: 16 }}>
                    <span style={{ marginRight: 8 }}>🛒</span>Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
