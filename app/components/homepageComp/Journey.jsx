import React from "react";
import CustomCards from "./CustomCards";

const cards = [
  {
    title: "Take The Skin Test",
    description:
      "Receive a personalized analysis of your skin's unique needs in just a few minutes.",
    image: "/images/cardimg01.png",
    step: "01",
    timeTaken: "2-4 MINS",
    key: 1,
  },
  {
    title: "Get Expert Kit",
    description:
      "Our experts curate a powerful combination of Ayurveda and Dermatology just for you.",
    image: "/images/cardimg01.png",
    step: "02",
    timeTaken: "DELIVERED",
    key: 2,
  },
  {
    title: "Start Your Routine",
    description:
      "Follow your tailored plan and witness the transformation of your skin's health.",
    image: "/images/cardimg01.png",
    step: "03",
    timeTaken: "DAILY CARE",
    key: 3,
  },
];

const Journey = () => {
  return (
    <div className="w-full flex flex-col items-center py-12 px-4">
      <div className="text-center max-w-2xl mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-juanaBold text-[#6A4D6F] tracking-tight">
          Your Path To Radiant Skin
        </h2>
        <p className="text-gray-400 font-juanaMedium leading-relaxed">
          You are not alone in this journey. Our team of world-class experts is
          with you every step of the way.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-bottom-5 duration-700"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CustomCards
              title={card.title}
              description={card.description}
              step={card.step}
              image={card.image}
              timeTaken={card.timeTaken}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
