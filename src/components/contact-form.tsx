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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

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
        message: 'Message sent successfully. I\'ll get back to you soon!' 
      });
      
      toast.success('Message sent successfully');
      
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
      
      toast.error(errorMessage);
      
      // Track error
      trackContactForm('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Efectos de fondo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-60 -z-10" />
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-sparkle opacity-60" />
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-500 rounded-full animate-sparkle opacity-80" style={{ animationDelay: '1s' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        
        <Card className="relative bg-background/70 backdrop-blur-sm border border-border/50 group-hover:border-primary/30 transition-all duration-300 shadow-lg group-hover:shadow-xl">
          <CardHeader className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Contact Me
                </span>
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardDescription className="text-base leading-relaxed">
                Have a project in mind? I'd love to hear from you and collaborate together!
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          Name *
                          <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Your name"
                              {...field}
                              disabled={status.type === 'loading'}
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          Email *
                          <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            disabled={status.type === 'loading'}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          Subject *
                          <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What would you like to talk about?"
                            {...field}
                            disabled={status.type === 'loading'}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          Message *
                          <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project or idea..."
                            {...field}
                            disabled={status.type === 'loading'}
                            rows={5}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover:border-primary/50 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm ${
                      status.type === 'success' 
                        ? 'bg-green-50/80 text-green-700 border-green-200/50 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800/50' 
                        : 'bg-red-50/80 text-red-700 border-red-200/50 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800/50'
                    }`}
                  >
                    <div className={`p-1 rounded-full ${
                      status.type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                    }`}>
                      {status.type === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{status.message}</span>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500" />
                  <Button 
                    type="submit" 
                    className="relative w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
                    disabled={status.type === 'loading'}
                  >
                    {status.type === 'loading' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                        <span>Send Message</span>
                        <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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