
import React from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Features from "@/components/LandingPage/Features";
import CallToAction from "@/components/LandingPage/CallToAction";
import Footer from "@/components/LandingPage/Footer";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold font-poppins text-center mb-8">
            Recursos do OdontoAgenda
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16 font-inter">
            Conheça todos os recursos que tornam o OdontoAgenda a melhor 
            escolha para a gestão da sua clínica odontológica.
          </p>
        </div>
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
