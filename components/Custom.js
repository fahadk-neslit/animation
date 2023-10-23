import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const sliderRef = useRef(null);
  const [autoplaySpeed, setAutoplaySpeed] = useState(500);

  const handleAfterChange = (currentSlide) => {
    if (currentSlide === 20) {
      setAutoplaySpeed(3000); // Slow down the speed when index 20 is near
    } else {
      setAutoplaySpeed(500); // Reset the speed to normal
    }
  };

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 11, // Adjusted to 5 for center mode
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: autoplaySpeed, // Use the dynamic autoplaySpeed
    centerMode: true, // Enable center mode
    centerPadding: "0", // Adjust as needed
    afterChange: handleAfterChange, // Attach the afterChange event
  };

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        <div className="bg-gray  flex justify-center">
          <p>1</p>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>destinatin</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
      </Slider>

      <div onClick={() => sliderRef.current.slickGoTo(11)}>Jump</div>
    </div>
  );
};

export default SliderComponent;
