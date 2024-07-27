import React from 'react'
import '../../../public/styles/homepageCss/stylesCustomCard.css'
const CustomCards = (props) => {
  return (
    <>
      <div className="cardMain lg:h-[20vmax] lg:w-[20vmax] py-5 px-5 w-[45vmax] h-[50vmax] md:py-1">
        <div className="cardText">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <div className="cardPic">
          <div className="imgDiv">
            <img src={props.image} alt="" />
          </div>
          <div className="text02">
            <h1>{props.step}</h1>
            <p>{props.timeTaken}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomCards