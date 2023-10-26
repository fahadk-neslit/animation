// "use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { AwesomeButton } from "react-awesome-button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";

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
  const [slidesPerView, setSlidesPerView] = useState(0);

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
        20
      );

      setRandomizedData(newRandomizedData);
    }
  }, [spinnerRewardData]);

  const sliderRef = useRef(null);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleTestSpin = async () => {
    if (!sliderRef.current.swiper.animating) {
      const winnerIndex = getRandomNumber(
        randomizedData.length - 40,
        randomizedData.length - 8
      );
      sliderRef.current?.swiper.slideTo(7, 0, false);
      await delay(50);
      sliderRef.current?.swiper.slideTo(winnerIndex, 10000);
    }
  };

  useEffect(() => {
    // add slides as screen changes
    const conatinerSize = document.querySelector(".swiper-wrapper");
    window.addEventListener("resize", () => {
      const slidesAsPerScreen = Math.floor(conatinerSize.offsetWidth / 130);
      setSlidesPerView(
        slidesAsPerScreen % 2 === 0 ? slidesAsPerScreen - 1 : slidesAsPerScreen
      );
    });
    const slidesAsPerScreen = Math.floor(conatinerSize.offsetWidth / 130);
    setSlidesPerView(
      slidesAsPerScreen % 2 === 0 ? slidesAsPerScreen + 1 : slidesAsPerScreen
    );
  }, []);

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

          <div className="h-[1px] relative z-50 mb-4 rounded-xl linear-bg">
            <TbTriangleInvertedFilled className="icon-arrow-down m-auto text-[28px] text-[#00E5ED]" />
          </div>
          <Swiper
            allowTouchMove={false}
            ref={sliderRef}
            centeredSlides={true}
            initialSlide={7}
            direction="horizontal"
            slidesPerView={slidesPerView}
            spaceBetween={3}
            observer
            observeParents
            centerInsufficientSlides
            onSlideChange={(swiper) => {
              console.log("====================================");
              console.log("slide change");
              console.log("====================================");
            }}
            onSlideChangeTransitionEnd={() => {
              console.log("====================================");
              console.log("slide change transition start");
              console.log("====================================");
            }}
            onSlideNextTransitionEnd={() => {
              console.log("====================================");
              console.log("slide change transition end");
              console.log("====================================");
            }}
          >
            {randomizedData.map((reward, index) => {
              if (
                reward.type === "TOKEN" ||
                reward.type === "SOL" ||
                reward.type === "ALPHAPOINTS"
              ) {
                return (
                  <SwiperSlide key={index}>
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
                  </SwiperSlide>
                );
              } else if (reward.type === "NFT") {
                return (
                  <SwiperSlide key={index}>
                    <div className="spinner-prize-img-container">
                      <img
                        src={`${reward.image}`}
                        alt="spinner"
                        className="nft-img-spinner"
                        draggable={false}
                      />
                    </div>
                  </SwiperSlide>
                );
              } else {
                return null;
              }
            })}
          </Swiper>
          <div className="h-[1px] relative z-50 mt-4 rounded-xl linear-bg">
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
