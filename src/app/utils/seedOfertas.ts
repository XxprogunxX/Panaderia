import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ofertasEjemplo = [
  {
    titulo: "¡Pan Recién Horneado!",
    descripcion: "Todos los días de 7 AM a 9 AM, 20% de descuento en panes tradicionales",
    imagen: "/images/carousel/pan-tradicional.jpg",
    fechaInicio: new Date().toISOString(),
    fechaFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días después
    activa: true
  },
  {
    titulo: "Dulces Momentos",
    descripcion: "Lleva 3 pasteles individuales y paga solo 2",
    imagen: "/images/carousel/pasteles.jpg",
    fechaInicio: new Date().toISOString(),
    fechaFin: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 días después
    activa: true
  },
  {
    titulo: "Café y Pan Dulce",
    descripcion: "Combo especial: Café americano + pan dulce a elegir por solo $50",
    imagen: "/images/carousel/cafe-pan.jpg",
    fechaInicio: new Date().toISOString(),
    fechaFin: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 días después
    activa: true
  }
];

export const seedOfertas = async () => {
  try {
    const ofertasRef = collection(db, 'ofertas');
    const ofertasSnap = await getDocs(ofertasRef);
    
    if (ofertasSnap.empty) {
      console.log('No hay ofertas, agregando ofertas de ejemplo...');
      
      for (const oferta of ofertasEjemplo) {
        await addDoc(ofertasRef, oferta);
      }
      
      console.log('Ofertas de ejemplo agregadas exitosamente');
    } else {
      console.log('Ya existen ofertas en la base de datos');
    }
  } catch (error) {
    console.error('Error al sembrar ofertas:', error);
  }
}; 