import React from "react";
import coverImage from "../../assets/cover.jfif";

const HomePage: React.FC = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Optional overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center ">
        <h1 className=" text-white font-bold text-6xl">Welcome To</h1>
        <h3 className=" text-white font-bold text-2xl">
          SpiritX <span className="text-orange-700">Hackathon</span>
        </h3>
      </div>
    </div>
  );
};

export default HomePage;
