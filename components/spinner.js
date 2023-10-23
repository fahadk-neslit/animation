// "use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { AwesomeButton } from "react-awesome-button";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const [randomizedInitialData, setRandomizedInitialData] = useState([]); // This will be the array that is used to render the spinner
  const [spinnerRewardData, setSpinnerRewardData] =
    useState(spinnerRewardsData);

  console.log("spinnerRewardData", spinnerRewardData);
  const spinnerRef = useRef(null); // Create a ref for the spinner container

  //   spinner states
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [animationStopPoint, setAnimationStopPoint] = useState(0);
  const [finalStyle, setFinalStyle] = useState({});

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
      setRandomizedInitialData(newRandomizedData);
    }
  }, [spinnerRewardData]);

  const sliderRef = useRef(null);

  const settings = {
    arrows: false,
    draggable: false,
    useTransform: true,
    waitForAnimate: true,
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 7, // Adjusted to 5 for center mode
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 500, // Use the dynamic autoplaySpeed
    centerMode: true, // Enable center mode
    centerPadding: "0", // Adjust as needed
  };

  const randomizedDataLegth = randomizedData?.length;
  const handleTestSpin = () => {
    setRandomizedData(randomizedInitialData);
    const winnerIndex = Math.floor(
      Math.random() * randomizedInitialData.length
    );
    setRandomizedData((prev) => [...prev, ...prev, ...prev, ...prev]);
    sliderRef.current.slickGoTo(randomizedDataLegth * 3 + winnerIndex);
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
                  <div
                    key={index}
                    style={
                      {
                        // ...spinnerStyle,
                        // transition:
                        //   "transform 7.5s cubic-bezier(0.1, 0, 0.2, 1) 0s",
                      }
                    }
                  >
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
                  <div
                    key={index}
                    style={
                      {
                        // ...spinnerStyle,
                        // transition:
                        //   "transform 7.5s cubic-bezier(0.1, 0, 0.2, 1) 0s",
                      }
                    }
                  >
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
