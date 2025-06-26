import Head from 'next/head';
import '../productoscafe/styles.css';
import ProductoCard from '../components/ProductoCard';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductosCafePage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main className="cafe-page">
        <nav className="navbar">
          <div className="navbar-brand-container">
            <Link href="/" className="nav-link logo-text">Cafetería</Link>
          </div>
          <div className="navbar-links-container">
            <Link href="/cafe" className="nav-link">Inicio</Link>
            <Link href="/productoscafe" className="nav-link">Productos</Link>
            <Link href="/panaderia" className="nav-link">Panadería</Link>
            <Link href="#testimonios" className="nav-link">Testimonios</Link>
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
          <h2 className="productos-titulo">Nuestros Cafés</h2>
          <div className="productos-grid">
            <ProductoCard
              etiqueta="ESPRESSO"
              etiquetaClase="natural"
              imagen="/images/cafe.png"
              alt="Espresso"
              rating="★★★★★"
              reviews={12}
              nombre="Espresso"
              precio="Desde $75.00 MXN"
              notas="NOTAS: CHOCOLATE / NUEZ / TOQUE FLORAL"
              tueste="Tueste Medio"
            />
            <ProductoCard
              etiqueta="AMERICANO"
              etiquetaClase="honey"
              imagen="/images/cafe.png"
              alt="Americano"
              rating="★★★★☆"
              reviews={9}
              nombre="Americano"
              precio="Desde $60.00 MXN"
              notas="NOTAS: CARAMELO / NUEZ / FINAL LIMPIO"
              tueste="Tueste Medio"
            />
            <ProductoCard
              etiqueta="CAPPUCCINO"
              etiquetaClase="lavado"
              imagen="/images/cafe.png"
              alt="Cappuccino"
              rating="★★★★★"
              reviews={17}
              nombre="Cappuccino"
              precio="Desde $85.00 MXN"
              notas="NOTAS: CREMOSO / VAINILLA / CACAO"
              tueste="Tueste Medio"
            />
            <ProductoCard
              etiqueta="LATTE"
              etiquetaClase="lavado"
              imagen="/images/cafe.png"
              alt="Latte"
              rating="★★★★★"
              reviews={15}
              nombre="Latte"
              precio="Desde $80.00 MXN"
              notas="NOTAS: SUAVE / LECHE / DULCE"
              tueste="Tueste Ligero"
            />
          </div>
        </section>
      </main>
    </>
  );
}
