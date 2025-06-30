// src/hooks/useCarrito.ts
import { useState, useEffect } from "react";

// --- Interfaces ---
// Es buena práctica tener tus interfaces en un archivo separado
// (por ejemplo, src/types/index.ts) y luego importarlas.
// Por ahora, las incluimos aquí para que el archivo sea autocontenido.

interface Producto {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  categoria: string;
}

interface ProductoConCantidad {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  cantidad: number;
  categoria: string;
}

// --- Hook useCarrito ---
export function useCarrito() {
  // 1. Inicialización del estado del carrito
  // Intentamos cargar el carrito desde localStorage UNA SOLA VEZ al inicio.
  // Usamos una función para `useState` para asegurar que esto solo se ejecute en el render inicial.
  const [carrito, setCarrito] = useState<ProductoConCantidad[]>(() => {
    // Verificamos si estamos en el entorno del navegador (donde `window` existe)
    if (typeof window !== "undefined") {
      try {
        const savedCarrito = localStorage.getItem("carrito");
        // Si hay datos guardados, los parseamos. Si no, devolvemos un array vacío.
        return savedCarrito ? JSON.parse(savedCarrito) : [];
      } catch (error) {
        // En caso de que localStorage tenga datos corruptos o no válidos
        console.error("Error al parsear el carrito desde localStorage:", error);
        return [];
      }
    }
    // Si no estamos en el navegador (ej. renderizado en el servidor), devolvemos un array vacío.
    return [];
  });

  // Estado para controlar la visibilidad del overlay del carrito
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // 2. Persistencia del carrito en localStorage con manejo de errores mejorado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveToStorage = () => {
        try {
          localStorage.setItem("carrito", JSON.stringify(carrito));
        } catch (error) {
          console.error("Error al guardar el carrito en localStorage:", error);
          // Si hay un error, intentamos limpiar el localStorage y guardar de nuevo
          try {
            localStorage.removeItem("carrito");
            localStorage.setItem("carrito", JSON.stringify(carrito));
          } catch (retryError) {
            console.error("Error en el segundo intento de guardar:", retryError);
          }
        }
      };

      // Usar requestIdleCallback si está disponible, sino setTimeout
      if (window.requestIdleCallback) {
        window.requestIdleCallback(saveToStorage);
      } else {
        setTimeout(saveToStorage, 0);
      }
    }
  }, [carrito]);

  // --- Funciones del Carrito ---

  const agregarAlCarrito = (producto: Omit<ProductoConCantidad, "cantidad">) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((p) => p.nombre === producto.nombre);
      
      if (productoExistente) {
        // Si el producto ya existe, incrementar la cantidad
        return prevCarrito.map((p) =>
          p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // Si es un producto nuevo, agregarlo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (nombre: string) => {
    setCarrito((prevCarrito) => prevCarrito.filter((p) => p.nombre !== nombre));
  };

  const actualizarCantidad = (nombre: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(nombre);
      return;
    }

    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.nombre === nombre ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const toggleCarrito = () => {
    setMostrarCarrito((prev) => !prev);
  };

  // Cálculo del total del carrito
  const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  // Calcular el número total de items
  const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);

  // --- Retorno del Hook ---
  // El hook devuelve el estado y las funciones que los componentes necesitarán.
  return {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    mostrarCarrito,
    toggleCarrito,
    total,
    totalItems,
    // Opcional: `setCarrito` directo si necesitas un control más fino en algún componente
    // setCarrito,
  };
}