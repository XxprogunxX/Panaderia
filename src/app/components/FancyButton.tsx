import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './FancyButton.css';

interface FancyButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const FancyButton: React.FC<FancyButtonProps> = ({ onClick, children }) => (
  <button className="fancy-btn" onClick={onClick}>
    <span className="fancy-cta-icon"><FaShoppingCart /></span>
    <span>{children}</span>
  </button>
);

export default FancyButton; 