"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9148319993"; // Replace with your WhatsApp number
  const message = "Hello, I would like to know more about your event.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float"
    >
      <MessageCircle size={30} color="#ffffff" />
    </a>
  );
};

export default WhatsAppButton;
