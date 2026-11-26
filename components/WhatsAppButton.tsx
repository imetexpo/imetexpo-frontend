"use client";

import React from "react";

const WhatsAppButton = () => {
  // Replace with your actual WhatsApp number
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919148319993";

  const message = "Hello! I would like to know more about IndiaMet Expo 2027 Exihibition.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="BOOK A STALL"
    >
      <span className="whatsapp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="27"
          height="27"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 .5C7.45.5.5 7.45.5 16c0 2.74.72 5.43 2.09 7.8L.5 31.5l7.9-2.07A15.4 15.4 0 0 0 16 31.5c8.55 0 15.5-6.95 15.5-15.5S24.55.5 16 .5Zm0 28.1c-2.4 0-4.75-.65-6.8-1.9l-.49-.3-4.68 1.23 1.25-4.56-.32-.5A12.58 12.58 0 1 1 16 28.6Zm6.91-9.42c-.38-.19-2.24-1.1-2.59-1.23-.35-.13-.6-.19-.85.19-.25.38-.98 1.23-1.2 1.48-.22.25-.44.28-.82.09-.38-.19-1.6-.59-3.04-1.88-1.12-1-1.88-2.24-2.1-2.62-.22-.38-.02-.59.17-.78.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.85-2.05-1.17-2.81-.31-.74-.63-.64-.85-.65h-.72c-.25 0-.66.09-1 .47-.35.38-1.32 1.29-1.32 3.14s1.35 3.64 1.54 3.89c.19.25 2.65 4.04 6.42 5.66.9.39 1.6.62 2.15.79.9.29 1.72.25 2.37.15.72-.11 2.24-.91 2.56-1.79.31-.88.31-1.63.22-1.79-.09-.16-.35-.25-.73-.44Z" />
        </svg>
      </span>

      <span className="whatsapp-text">BOOK A STALL </span>
    </a>
  );
};

export default WhatsAppButton;
