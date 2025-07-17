import React from "react";
import { Shield, DollarSign, Zap, Users } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Verified Dealers",
      description:
        "All our dealers are thoroughly vetted and verified for your peace of mind.",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      description:
        "Competitive pricing and exclusive deals you won't find anywhere else.",
    },
    {
      icon: Zap,
      title: "Quick Financing",
      description:
        "Get pre-approved in minutes with our instant financing options.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description:
        "Our car experts are here to help you every step of the way.",
    },
  ];

  return (
    <section className="why-choose">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose CarCHeepo?</h2>
          <p className="section-subtitle">
            We make car buying simple, secure, and satisfying
          </p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  <IconComponent />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
