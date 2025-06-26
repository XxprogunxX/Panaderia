import './cafe.css'; // Asegúrate de que tu CSS esté importado
import Image from 'next/image';
import FancyButton from '../components/FancyButton';
import Head from 'next/head';
import ProductoCard from '../components/ProductoCard';
import Link from 'next/link';

export default function CafePage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main className="cafe-page">
        <section className="hero">
          {/* Navbar ajustado para el diseño de la imagen */}
          <nav className="navbar">
            {/* Contenedor para el logo y el nombre de la cafetería (parte izquierda de la navbar) */}
            <div className="navbar-brand-container"> {/* NUEVO CONTENEDOR */}
              <Link href="/" className="nav-link logo-text">Cafetería</Link> {/* El texto del nombre de la cafetería */}
            </div>
            {/* Links de navegación y (opcionalmente) el icono de búsqueda (parte derecha de la navbar) */}
            <div className="navbar-links-container"> {/* Renombrado para claridad */}
              <Link href="/cafe" className="nav-link">Inicio</Link> {/* Corregí el enlace a "Inicio" */}
              <Link href="/productoscafe" className="nav-link">Productos</Link>
              <Link href="/panaderia" className="nav-link">Panadería</Link> {/* Asumo que tienes una página /panaderia */}
              <Link href="#testimonios" className="nav-link">Testimonios</Link>
              <Image
                src="/images/logo-cafe.png" // <--- RUTA DE TU LOGO DE CAFETERÍA
                alt="Logo de la Cafetería"
                width={50} // <--- AJUSTA EL TAMAÑO DE TU LOGO AQUÍ
                height={50} // <--- AJUSTA EL TAMAÑO DE TU LOGO AQUÍ
                className="navbar-logo-image" // NUEVA CLASE para estilizar la imagen del logo
              />
            </div>
            {/* Para móviles, podrías añadir un botón de hamburguesa aquí y manejarlo con JS */}
          </nav>

          <div className="hero-text">
            <h1>El Arte <br /> del Café</h1>
            <p>Una experiencia sensorial en cada taza.</p>
            <FancyButton>Comprar Ahora</FancyButton>
          </div>
        </section>

        <section id="productos" className="productos">
          <h2 className="productos-titulo">Nuestros Favoritos</h2>
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

        <article className="left-image origen">
          <div className="info-image">
            <Image src="/images/origen-del cafe.jpeg" alt="Origen del café" width={500} height={300}/>
          </div>
          <div className="info-text">
            <h3>Origen</h3>
            <p>
              Nuestro café proviene de las montañas de Oaxaca, México, cultivado en
              altitudes ideales para un sabor intenso y aroma único.
            </p>
          </div>
        </article>
        <article className="right-image">
          <div className="info-text">
            <h3>Proceso de Tostado</h3>
            <p>
              Tostamos nuestros granos de forma artesanal para preservar los
              matices y la calidad, con perfiles que varían desde ligero hasta
              oscuro.
            </p>
          </div>
          <div className="info-image">
            <Image src="/images/tostado.jpeg" alt="Proceso de tostado" width={500} height={300} />
          </div>
        </article>
        <article className="left-image">
          <div className="info-image">
            <Image src="/images/variedades-cafe.jpg" alt="Variedades de café" width={500} height={300} />
          </div>
          <div className="info-text">
            <h3>Variedades</h3>
            <p>
              Contamos con variedades arábica y robusta, cada una con características
              especiales que satisfacen todos los gustos.
            </p>
          </div>
        </article>
        <article className="right-image">
          <div className="info-text">
            <h3>Perfil de Sabor</h3>
            <p>
              Nuestros cafés ofrecen notas florales, frutales y un cuerpo balanceado,
              ideal para amantes del café exigentes.
            </p>
          </div>
          <div className="info-image">
            <Image src="/images/sabor cafe.jpeg" alt="Perfil de sabor" width={500} height={300} />
          </div>
        </article>

        <section id="testimonios" className="testimonios fade-in">
          <h2>Lo que dicen nuestros clientes</h2>
          <blockquote>“El mejor café que he probado. Su aroma es una delicia.”</blockquote>
        </section>
      </main>
    </>
  );
}