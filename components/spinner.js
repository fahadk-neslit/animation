// "use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { AwesomeButton } from "react-awesome-button";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Function to generate a new array based on probability
function generateProbabilityArray(data, minItems = 50) {
  let newArray = [];

  data.forEach((item) => {
    for (let i = 0; i < item.probability; i++) {
      newArray.push({ ...item });
    }
  });

  // Ensure there are at least minItems segments in the spinner
  while (newArray.length < minItems) {
    const randomItem = data[Math.floor(Math.random() * data.length)];
    newArray.push({ ...randomItem });
  }

  return newArray;
}

function Spinner({ spinnerRewardsData }) {
  const [marketType, setMarketType] = useState(false);
  const [randomizedData, setRandomizedData] = useState([]); // This will be the array that is used to render the spinner
  const [spinnerRewardData, setSpinnerRewardData] =
    useState(spinnerRewardsData);
  const settings = {
    arrows: false,
    draggable: false,
    useTransform: true,
    useCSS: true,
    centerMode: true,
    easing: "linear",
    // cssEase: "cubic-bezier(.24,1.41,.54,1.01)",
    speed: 10,
    waitForAnimate: true,
    dots: false,
    infinite: true,
    // autoplaySpeed: 500,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    autoplay: false,
    centerPadding: "50px",
  };

  useEffect(() => {
    if (spinnerRewardData) {
      // Function to duplicate and shuffle the rewards
      const duplicateAndShuffleRewards = (rewards, times) => {
        let newRewards = [];
        for (let i = 0; i < times; i++) {
          newRewards.push(...rewards.map((reward) => ({ ...reward })));
        }
        return shuffleArray(newRewards); // Assuming shuffleArray is your function for shuffling the array
      };

      // Duplicate rewards 5 times (or however many times you want) and shuffle
      const newRandomizedData = duplicateAndShuffleRewards(
        spinnerRewardData,
        5
      );

      setRandomizedData(newRandomizedData);
    }
  }, [spinnerRewardData]);

  const sliderRef = useRef(null);

  const handleTestSpin = () => {
    const winnerIndex = Math.floor(Math.random() * randomizedData.length);

    let slidesTraveled = 0;
    let speed = 50;

    const changeSlideHandler = async () => {
      sliderRef.current.slickNext();
      slidesTraveled++;

      if (slidesTraveled !== randomizedData.length * 2) {
        if (slidesTraveled + 10 > randomizedData.length * 2) {
          speed += 50;
        }
        return setTimeout(() => {
          changeSlideHandler();
        }, speed);
      } else {
        return sliderRef.current.slickGoTo(winnerIndex);
      }
    };
    changeSlideHandler();
  };

  return (
    <>
      <div className="stat-container">
        <div className="mb-[25px]">
          <h1 className="text-left text-[26px] text-[#fff] font-medium pt-10 flex items-start">
            <span>
              alpha<span className="text-[#00E5ED]">rewards</span>
            </span>
            <span className="text-[#BBDCDD] text-[18px] font-normal ml-1">
              BETA
            </span>
          </h1>
        </div>
        <div className="spinner-container ">
          <div className="justify-between flex spinner-titles">
            <h2 className="ml-auto">Prizes Won: -/-</h2>
          </div>

          <div className="h-[1px] relative z-50 rounded-xl linear-bg">
            <TbTriangleInvertedFilled className="icon-arrow-down m-auto text-[28px] text-[#00E5ED]" />
          </div>

          <Slider
            {...settings}
            ref={sliderRef}
            className={`flex mt-3 mb-5 h-[130px] overflow-hidden`}
          >
            {randomizedData.map((reward, index) => {
              if (
                reward.type === "TOKEN" ||
                reward.type === "SOL" ||
                reward.type === "ALPHAPOINTS"
              ) {
                return (
                  <div key={index}>
                    {" "}
                    <div className="spinner-prize-img-container">
                      <Image
                        src={`${reward.image}`}
                        alt="spinner"
                        width={reward.logoWidth}
                        height={300}
                        draggable={false}
                      />
                      <div className="spinner-prize-description">
                        <p>{reward.description}</p>
                      </div>
                    </div>
                  </div>
                );
              } else if (reward.type === "NFT") {
                return (
                  <div key={index}>
                    <div className="spinner-prize-img-container">
                      <img
                        src={`${reward.image}`}
                        alt="spinner"
                        className="nft-img-spinner"
                        draggable={false}
                      />
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </Slider>

          <div className="h-[1px] rounded-xl linear-bg">
            <TbTriangleInvertedFilled className="icon-on-top text-[28px] text-[#00E5ED]" />
          </div>
        </div>

        <div className="flex justify-center mt-10 gap-2">
          <div className="spinner-btn-container green-glow-button">
            <AwesomeButton type="primary" className="w-[175px]">
              <p className="daily-spin-text">Daily Spin</p>
            </AwesomeButton>
          </div>

          <div className="spinner-btn-container blue-glow-button">
            <AwesomeButton type="primary" className="w-[300px]">
              <p className="font-normal flex">
                Spin for &nbsp;
                <Image
                  src="/spinner/alphacoin.svg"
                  alt="alphapoints"
                  className="mr-1"
                  width={25}
                  height={25}
                />
                5,000
              </p>
            </AwesomeButton>
          </div>
          <div className="spinner-btn-container ">
            <AwesomeButton
              type="primary "
              className="w-[175px]"
              onPress={handleTestSpin}
            >
              <p className="font-normal flex">Test Spin </p>
            </AwesomeButton>
          </div>
        </div>
        <p className="text-center pt-3 text-[12px] text-[#fff] opacity-[0.6] font-normal">
          We reserve the right to update reward calculations at any time. Learn
          more here.
        </p>
      </div>
    </>
  );
}

export default Spinner;
