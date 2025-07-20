import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import CarResult from "./CarResult";
import "./HeroQuiz.css";

// Mock data – replace with real API/database later
import carData from "./mockCars";

// Define the quiz questions and answer choices
const questions = [
  {
    id: "budget",
    question: "What's your budget?",
    options: [
      { label: "Under $10k", value: "<10000" },
      { label: "$10k – $20k", value: "10000-20000" },
      { label: "$20k – $30k", value: "20000-30000" },
      { label: "$30k+", value: ">30000" },
    ],
  },
  {
    id: "type",
    question: "Which body style do you prefer?",
    options: [
      { label: "Sedan", value: "sedan" },
      { label: "SUV", value: "suv" },
      { label: "Truck", value: "truck" },
      { label: "Hatchback", value: "hatchback" },
      { label: "Sports", value: "sports" },
    ],
  },
  {
    id: "fuel",
    question: "How important is fuel efficiency?",
    options: [
      { label: "Very", value: "high" },
      { label: "Somewhat", value: "medium" },
      { label: "Not important", value: "low" },
    ],
  },
  {
    id: "seats",
    question: "How many seats do you need?",
    options: [
      { label: "2", value: 2 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "7+", value: 7 },
    ],
  },
];

// Helper to filter cars based on answers
const applyFilters = (cars, answers) => {
  return cars
    .filter((c) => {
      if (!answers.budget) return true;
      const price = c.price;
      switch (answers.budget) {
        case "<10000":
          return price < 10000;
        case "10000-20000":
          return price >= 10000 && price <= 20000;
        case "20000-30000":
          return price > 20000 && price <= 30000;
        case ">30000":
          return price > 30000;
        default:
          return true;
      }
    })
    .filter((c) => (answers.type ? c.type === answers.type : true))
    .filter((c) => {
      if (!answers.fuel) return true;
      if (answers.fuel === "high") return c.mpg >= 30;
      if (answers.fuel === "medium") return c.mpg >= 20;
      return true; // low importance -> no filter
    })
    .filter((c) => (answers.seats ? c.seats >= answers.seats : true));
};

const QuizStepper = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (value) => {
    const q = questions[step];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    // Advance step; allow final state equal to questions.length
    const next = step + 1;
    if (next <= questions.length) {
      setStep(next);
    }
  };

  const filteredCars = applyFilters(carData, answers);

  // celebrate on completion
  useEffect(() => {
    if (step === questions.length) {
      // dynamic import keeps bundle small if user never reaches the end
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      }).catch(() => {});
    }
  }, [step]);

  // Completed quiz
  if (step === questions.length) {
    return (
      <div className="hero-quiz-result">
        <CarResult car={filteredCars[0]} />
      </div>
    );
  }

  // Current question
  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <section className="hero-quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <QuestionCard
        key={current.id}
        question={current.question}
        options={current.options}
        onSelect={handleAnswer}
      />
    </section>
  );
};

export default QuizStepper;
