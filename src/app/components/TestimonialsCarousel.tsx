'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "El mejor café que he probado en años. El aroma y el sabor son simplemente inigualables. ¡Volveré por más!",
    name: "Ana García",
    role: "Catadora de Café",
    image: "/public/images/clientes.jpeg",
  },
  {
    quote: "Un ambiente acogedor y un servicio excepcional. El Americano es mi favorito, siempre perfecto.",
    name: "Carlos Martínez",
    role: "Cliente Frecuente",
    image: "/public/images/panadero.avif",
  },
  {
    quote: "La calidad del grano es evidente en cada sorbo. Se nota la pasión que ponen en su trabajo. ¡Muy recomendado!",
    name: "Sofía Rodríguez",
    role: "Barista Profesional",
    image: "/public/images/repostera.avif",
  },
];

const TestimonialsCarousel: React.FC = () => {
  // For a real carousel, you'd use a state management for the current index
  // and buttons to navigate. For this example, we'll display them in a row.
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4 border-4 border-gray-200"
          />
          <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
          <h4 className="font-bold text-lg text-primary-brown">{testimonial.name}</h4>
          <p className="text-sm text-accent-warm">{testimonial.role}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TestimonialsCarousel; 