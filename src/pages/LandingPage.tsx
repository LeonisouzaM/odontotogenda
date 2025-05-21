
import React from "react";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import Testimonials from "@/components/LandingPage/Testimonials";
import Pricing from "@/components/LandingPage/Pricing";
import WhyChooseUs from "@/components/LandingPage/WhyChooseUs";
import FreeTrial from "@/components/LandingPage/FreeTrial";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import CallToAction from "@/components/LandingPage/CallToAction";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <FreeTrial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
