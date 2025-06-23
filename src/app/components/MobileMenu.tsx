import Link from "next/link";
import React from "react";

interface Ruta {
  nombre: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  rutas: Ruta[];
  carritoCount?: number;
  onCarritoClick?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  setOpen,
  rutas,
  carritoCount = 0,
  onCarritoClick,
}) => {
  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger${open ? " active" : ""}`}></span>
      </button>
      <nav className={`nav${open ? " nav-abierto" : ""}`}>
        <ul>
          {rutas.map((ruta) => (
            <li key={ruta.href}>
              <Link href={ruta.href} onClick={() => setOpen(false)}>
                {ruta.nombre}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                if (onCarritoClick) onCarritoClick();
                setOpen(false);
              }}
              className="btn-carrito-toggle"
            >
              <span className="icono-carrito">🛒</span>
              <span>Carrito</span>
              {carritoCount > 0 && (
                <span className="notificacion-carrito">{carritoCount}</span>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu; 