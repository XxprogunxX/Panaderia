"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import "../styles.css"; // Estilos generales
import footerStyles from "../footer.module.css"; // Estilos específicos del footer
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Importa los hooks personalizados
import { useCarrito } from "../components/usecarrito"
 // Adjust the path if necessary
import { useMercadoPago } from "../components/useMercadopago"; 
import FormularioEnvio from "../components/FormularioEnvio";
import MobileMenu from "../components/MobileMenu";

// Define la interfaz Producto si no está globalmente accesible
interface Producto {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  categoria: string;
}

export default function Productos() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Usa los hooks para manejar el estado del carrito y el proceso de pago
  const { carrito, agregarAlCarrito, eliminarDelCarrito, mostrarCarrito, toggleCarrito, total } = useCarrito(); // <--- Usa useCarrito
  const { cargandoPago, handlePagar } = useMercadoPago();                                                       // <--- Usa useMercadoPago

  const rutasMenu = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Productos", href: "/productos" },
    { nombre: "Cafe", href: "/cafe" },
    { nombre: "Nosotros", href: "/nosotros" },
  ];

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const lista: Producto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.push({
          nombre: data.product,
          descripcion: data.description,
          imagen: data.pic || "/images/default.jpg",
          precio: data.price,
          categoria: data.category,
        });
      });

      setProductos(lista);
    };

    obtenerProductos();
  }, []);

  const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const esImagenExterna = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  // Prepara los ítems del carrito para Mercado Pago
  const itemsParaPago = carrito.map(({ nombre, cantidad, precio }) => ({
    title: nombre,
    quantity: cantidad,
    unit_price: precio,
  }));

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const irACheckout = () => {
    router.push('/checkout');
  };

  return (
    <main>
      <header className="header">
        <div className="logo-link-header">
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="logo-img" />
          <h1 className="logo">Panadería El Pan de Cada Día</h1>
        </div>
        <MobileMenu
          open={menuAbierto}
          setOpen={setMenuAbierto}
          rutas={rutasMenu}
          carritoCount={carrito.reduce((sum, p) => sum + p.cantidad, 0)}
          onCarritoClick={() => {
            toggleCarrito();
            setMenuAbierto(false);
          }}
        />
      </header>

      <section className="productos-hero">
        <h1>Nuestros Productos</h1>
        <p>Descubre toda nuestra variedad de panes y repostería</p>
        <input
          type="text"
          placeholder="Buscar pan..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador-productos"
        />
      </section>

      <section className="categorias-productos">
        {categoriasUnicas.length > 0 ? (
          categoriasUnicas.map((categoria) => {
            const productosPorCategoria = productosFiltrados.filter(
              (p) => p.categoria === categoria
            );

            if (productosPorCategoria.length === 0) return null;

            return (
              <div key={categoria} className="categoria-productos">
                <h2 className="titulo-categoria">{categoria}</h2>
                <div className="productos-grid">
                  {productosPorCategoria.map((producto) => (
                    <div key={producto.nombre} className="producto-card">
                      <div className="producto-imagen-container">
                        {esImagenExterna(producto.imagen) ? (
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="producto-imagen"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Image
                            src={producto.imagen}
                            alt={producto.nombre}
                            fill
                            className="producto-imagen"
                            style={{ objectFit: "cover" }}
                            priority
                          />
                        )}
                      </div>
                      <div className="producto-card-content">
                        <h3>{producto.nombre}</h3>
                        <p className="descripcion">{producto.descripcion}</p>
                        <p className="precio">${producto.precio} MXN</p>
                        <button 
                          className="btn-pedir" 
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-resultados">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </section>

      {mostrarCarrito && (
        <div className="carrito-overlay" onClick={toggleCarrito}>
          <div className="carrito" onClick={(e) => e.stopPropagation()}>
            <h2>Tu Carrito</h2>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                <ul>
                  {carrito.map(({ nombre, precio, cantidad }) => (
                    <li key={nombre} className="carrito-item">
                      <span>{nombre} x {cantidad}</span>
                      <span>${precio * cantidad} MXN</span>
                      <button className="btn-eliminar" onClick={() => eliminarDelCarrito(nombre)}>
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="carrito-total">
                  <strong>Total: </strong>${total} MXN
                </div>
                <button
                  className="btn-pagar"
                  onClick={irACheckout}
                  disabled={carrito.length === 0}
                >
                  Proceder al pago
                </button>
              </>
            )}
            <button className="btn-cerrar" onClick={toggleCarrito}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className={footerStyles.footer}>
        {/* Aquí tu footer */}
      </footer>
    </main>
  );
}