"use client";

import { useEffect } from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentLabel?: string;
};

export default function CustomModal({ isOpen, onClose, children, contentLabel }: CustomModalProps) {
  
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onEsc);
    }
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={contentLabel}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm"

      onClick={onClose} 
    >
      <div
        className="bg-black rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-white hover:text-gray-900"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
