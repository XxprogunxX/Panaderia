import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-brown text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Cafetería "El Buen Sabor"</h3>
        <p className="mb-6">Disfruta del mejor café, hecho con pasión y tradición.</p>
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:text-accent-warm transition-colors"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-accent-warm transition-colors"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-accent-warm transition-colors"><FaTwitter size={24} /></a>
        </div>
        <div className="text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cafetería "El Buen Sabor". Todos los derechos reservados.</p>
          <p>Diseñado con ❤️ por tu Asistente de IA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 