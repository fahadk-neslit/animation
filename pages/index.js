import Image from "next/image";
import Spinner from "@/components/spinner";
import axios from "axios";

export default function Home({ spinnerRewardsData }) {
  return (
    <>
      <div className="main-container h-[100vh] w-[100vw] bg-[#022728]">
        <Spinner spinnerRewardsData={spinnerRewardsData} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  let spinnerRewardsData;

  try {
    const spinnerRewards = await axios.get(
      "https://www.alphaline.wtf/api/spinner/getRewards"
    );
    spinnerRewardsData = spinnerRewards.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      spinnerRewardsData: spinnerRewardsData || [],
    },
    revalidate: 500,
  };
}
