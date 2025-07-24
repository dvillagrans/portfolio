"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { trackContactForm } from "@/components/analytics";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });
    
    // Track form submission
    trackContactForm('submit');

    try {
      // Simular envío de email (aquí puedes integrar con un servicio real)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En un caso real, aquí harías la llamada a tu API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setStatus({ 
        type: 'success', 
        message: 'Mensaje enviado correctamente. Te responderé pronto!' 
      });
      
      toast.success('Mensaje enviado correctamente');
      
      // Track successful submission
      trackContactForm('success');
      
      // Limpiar formulario
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' 
      });
      
      toast.error('Error al enviar el mensaje');
      
      // Track error
      trackContactForm('error');
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contáctame
        </CardTitle>
        <CardDescription>
          ¿Tienes un proyecto en mente? ¡Me encantaría escuchar de ti!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={status.type === 'loading'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={status.type === 'loading'}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Asunto *</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="¿De qué quieres hablar?"
              value={formData.subject}
              onChange={handleInputChange}
              required
              disabled={status.type === 'loading'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Cuéntame sobre tu proyecto o idea..."
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={status.type === 'loading'}
              rows={5}
            />
          </div>
          
          {status.message && (
            <div className={`flex items-center gap-2 p-3 rounded-md ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span className="text-sm">{status.message}</span>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || status.type === 'loading'}
          >
            {status.type === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensaje
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}