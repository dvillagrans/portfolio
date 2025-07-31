"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trackContactForm } from "@/components/analytics";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";

// We'll create the schema inside the component to access translations
const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, {
    message: t('validation.name.min'),
  }),
  email: z.string().email({
    message: t('validation.email.invalid'),
  }),
  subject: z.string().min(5, {
    message: t('validation.subject.min'),
  }),
  message: z.string().min(10, {
    message: t('validation.message.min'),
  }),
});

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const { t } = useI18n();
  
  const formSchema = createFormSchema(t);
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setStatus({ type: 'loading' });
    
    // Track form submission
    trackContactForm('submit');

    try {
      // Enviar datos a la API de contacto
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error sending message');
      }
      
      setStatus({ 
        type: 'success', 
        message: t('contact.success')
      });
      
      toast.success(t('contact.success'));
      
      // Track successful submission
      trackContactForm('success');
      
      // Limpiar formulario
      form.reset();
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error sending message. Please try again.';
      
      setStatus({ 
        type: 'error', 
        message: errorMessage
      });
      
      toast.error(t('contact.error'));
      
      // Track error
      trackContactForm('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Efectos de fondo sutiles */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-xl blur-lg opacity-40 -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500" />
        
        <Card className="relative bg-background/95 backdrop-blur-sm border border-border/60 group-hover:border-primary/40 transition-all duration-300 shadow-md group-hover:shadow-lg">
          <CardHeader className="space-y-4 pb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/15 to-blue-500/15 border border-primary/15">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground font-semibold">
                  {t('contact.title')}
                </span>
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                {t('contact.description')}
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-foreground">
                          {t('contact.name')} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('contact.name.placeholder')}
                            {...field}
                            disabled={status.type === 'loading'}
                            className="h-10 transition-all duration-200 focus:ring-1 focus:ring-primary/30 hover:border-primary/40 bg-background"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-foreground">
                          {t('contact.email')} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t('contact.email.placeholder')}
                            {...field}
                            disabled={status.type === 'loading'}
                            className="h-10 transition-all duration-200 focus:ring-1 focus:ring-primary/30 hover:border-primary/40 bg-background"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-foreground">
                          {t('contact.subject')} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('contact.subject.placeholder')}
                            {...field}
                            disabled={status.type === 'loading'}
                            className="h-10 transition-all duration-200 focus:ring-1 focus:ring-primary/30 hover:border-primary/40 bg-background"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-foreground">
                          {t('contact.message')} *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contact.message.placeholder')}
                            {...field}
                            disabled={status.type === 'loading'}
                            rows={4}
                            className="transition-all duration-200 focus:ring-1 focus:ring-primary/30 hover:border-primary/40 resize-none bg-background"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`relative p-5 rounded-xl text-sm font-medium backdrop-blur-sm border ${
                      status.type === 'success'
                        ? 'bg-green-500/10 text-green-600 border-green-500/20 shadow-green-500/10'
                        : status.type === 'error'
                        ? 'bg-red-500/10 text-red-600 border-red-500/20 shadow-red-500/10'
                        : 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-blue-500/10'
                    } shadow-lg`}
                  >
                    <div className={`absolute inset-0 rounded-xl blur-sm opacity-20 ${
                      status.type === 'success'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                        : status.type === 'error'
                        ? 'bg-gradient-to-r from-red-400 to-pink-400'
                        : 'bg-gradient-to-r from-blue-400 to-cyan-400'
                    }`} />
                    <div className="relative flex items-center gap-3">
                      <div className={`p-1 rounded-full ${
                        status.type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                      }`}>
                        {status.type === 'success' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                      <span>{status.message}</span>
                    </div>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="pt-2"
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 transition-all duration-200 hover:shadow-md" 
                    disabled={status.type === 'loading'}
                  >
                    {status.type === 'loading' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        <span>{t('contact.send')}</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}