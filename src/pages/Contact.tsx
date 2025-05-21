
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log("Form submitted");
    // Add toast notification
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 font-poppins">Entre em Contato</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
              Estamos prontos para ajudar você a transformar sua clínica odontológica.
              Preencha o formulário abaixo ou utilize um de nossos canais de atendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    required
                    className="w-full font-inter"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="w-full font-inter"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    placeholder="Assunto da sua mensagem"
                    required
                    className="w-full font-inter"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem aqui..."
                    required
                    className="w-full min-h-[150px] font-inter"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded font-inter"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 font-poppins">Informações de Contato</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-medium font-poppins">Email</p>
                    <a href="mailto:contato@odontoagenda.com.br" className="text-blue-600 hover:underline font-inter">
                      contato@odontoagenda.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-medium font-poppins">Telefone</p>
                    <a href="tel:+551140028922" className="text-blue-600 hover:underline font-inter">
                      +55 11 4002-8922
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-medium font-poppins">Endereço</p>
                    <p className="text-gray-600 font-inter">
                      Av. Paulista, 1000 - Bela Vista<br />
                      São Paulo - SP, 01310-100<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 font-poppins">Horário de Atendimento</h3>
                <p className="text-gray-600 font-inter">
                  Segunda a Sexta: 08:00 às 18:00<br />
                  Sábado: 09:00 às 13:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
