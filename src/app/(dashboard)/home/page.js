import HomeRow1 from "@/components/HomeRow1/HomeRow1";
import HomeRow2 from "@/components/HomeRow2/HomeRow2";
import HomeRow3 from "@/components/HomeRow3/HomeRow3";
import React from "react";

const HomePage = () => {
  return (
    <section className="flex flex-col mt-22 w-full pl-22 pr-6 gap-4 overflow-x-hidden ">
      <div className="flex-[0.5]">
        <HomeRow1 />
      </div>
      <div className="flex-[1]">
        <HomeRow2 />
      </div>
      <div className="flex-[0.5] mb-4">
        <HomeRow3 />
      </div>
    </section>
  );
};

export default HomePage;
