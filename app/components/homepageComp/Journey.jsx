import React from "react";
import CustomCards from "./CustomCards";
const cards = [
  {
    title: "Take The Skin Test",
    description: "Lorem ipsum dolor sit adipiscing elitsed do eiusmod",
    image: "/images/cardimg01.png",
    step: "step 1",
    timeTaken: "(takes 2-4 min)",
  },
  {
    title: "Take The Skin Test",
    description: "Lorem ipsum dolor sit adipiscing elitsed do eiusmod",
    image: "/images/cardimg01.png",
    step: "step 1",
    timeTaken: "(takes 2-4 min)",
  },
  {
    title: "Take The Skin Test",
    description: "Lorem ipsum dolor sit adipiscing elitsed do eiusmod",
    image: "/images/cardimg01.png",
    step: "step 1",
    timeTaken: "(takes 2-4 min)",
  },
];
const Journey = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-around py-5">
        <div className="text-center py-5">
          <h1 className="md:text-[3vmax] xs:mb-2 text-[4vmax] font-juanaRegular">YOUR JOURNEY HERE</h1>
          <p className="w-[80vw] md:mb-10 mb-8 xs:text-sm " >you are not alone our “ experts “ are here for you</p>
        </div>
        <div className="cards flex flex-col items-center justify-center w-[80vw] lg:flex-row  gap-8 lg:gap-12 ">
          {cards.map((card) => (
            <CustomCards
              key={card.title}
              title={card.title}
              description={card.description}
              step={card.step}
              image={card.image}
              timeTaken={card.timeTaken}
            />
          ))}
        </div>
        
      </div>
    </>
  );
};

export default Journey;
