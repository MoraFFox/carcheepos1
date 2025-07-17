import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Found my dream car in just 2 days! The process was smooth and the dealer was fantastic.",
      author: "Sarah Johnson",
      location: "Los Angeles, CA"
    },
    {
      id: 2,
      rating: 5,
      text: "CarCHeepo saved me thousands! Great deals and honest dealers. Highly recommended!",
      author: "Mike Chen",
      location: "New York, NY"
    },
    {
      id: 3,
      rating: 5,
      text: "The financing process was incredibly fast. Got approved and drove home the same day!",
      author: "Emma Rodriguez",
      location: "Miami, FL"
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p>"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;