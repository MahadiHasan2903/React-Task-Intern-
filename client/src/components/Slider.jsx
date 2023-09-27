import React, { useState, useEffect } from "react";

import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [image1, image2, image3];

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [currentSlide]);

  return (
    <div className=" m-5 800px:mt-[100px]">
      <div className="flex justify-center">
        <p className="my-5 text-3xl text-black">Latest iPhone 15 Pro Max</p>
      </div>
      <div className="relative flex justify-center">
        <BsChevronLeft
          size={40}
          className="hidden 800px:block mt-[200px] cursor-pointer"
          onClick={prevSlide}
        />

        <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
        <BsChevronRight
          size={40}
          className=" hidden 800px:block mt-[200px] cursor-pointer "
          onClick={nextSlide}
        />
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={prevSlide}
          className="px-4 py-2 mx-4 border border-[#444654] cursor-pointer hover:border-black hover:bg-[#444654] hover:text-white transition duration-300 ease-in-out"
        >
          Previous
        </button>
        <button
          onClick={nextSlide}
          className="px-7 py-2 mx-4 border border-[#444654] cursor-pointer hover:border-black hover:bg-[#444654] hover:text-white transition duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
