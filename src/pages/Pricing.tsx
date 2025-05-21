
import React from "react";
import Navbar from "@/components/LandingPage/Navbar";
import PricingSection from "@/components/LandingPage/Pricing";
import CallToAction from "@/components/LandingPage/CallToAction";
import Footer from "@/components/LandingPage/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold font-poppins text-center mb-8">
            Planos e Preços
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16 font-inter">
            Escolha o plano ideal para o seu consultório ou clínica odontológica.
          </p>
        </div>
        <PricingSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
