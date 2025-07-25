"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.theme': 'Theme',
    
    // Contact Form
    'contact.title': 'Contact Me',
    'contact.description': 'Have a project in mind? I\'d love to hear from you and collaborate together!',
    'contact.name': 'Name',
    'contact.name.placeholder': 'Your name',
    'contact.email': 'Email',
    'contact.email.placeholder': 'your@email.com',
    'contact.subject': 'Subject',
    'contact.subject.placeholder': 'What would you like to talk about?',
    'contact.message': 'Message',
    'contact.message.placeholder': 'Tell me about your project or idea...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully. I\'ll get back to you soon!',
    'contact.error': 'Error sending message. Please try again.',
    
    // Validation messages
    'validation.name.min': 'Name must be at least 2 characters.',
    'validation.email.invalid': 'Please enter a valid email address.',
    'validation.subject.min': 'Subject must be at least 5 characters.',
    'validation.message.min': 'Message must be at least 10 characters.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.theme': 'Tema',
    
    // Contact Form
    'contact.title': 'Contáctame',
    'contact.description': '¿Tienes un proyecto en mente? ¡Me encantaría escuchar de ti y colaborar juntos!',
    'contact.name': 'Nombre',
    'contact.name.placeholder': 'Tu nombre',
    'contact.email': 'Email',
    'contact.email.placeholder': 'tu@email.com',
    'contact.subject': 'Asunto',
    'contact.subject.placeholder': '¿De qué quieres hablar?',
    'contact.message': 'Mensaje',
    'contact.message.placeholder': 'Cuéntame sobre tu proyecto o idea...',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensaje enviado correctamente. ¡Te responderé pronto!',
    'contact.error': 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
    
    // Validation messages
    'validation.name.min': 'El nombre debe tener al menos 2 caracteres.',
    'validation.email.invalid': 'Por favor ingresa un email válido.',
    'validation.subject.min': 'El asunto debe tener al menos 5 caracteres.',
    'validation.message.min': 'El mensaje debe tener al menos 10 caracteres.',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
  },
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export type { Language };