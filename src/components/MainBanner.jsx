import React from 'react'
import bannerSmallImg from "../assets/posterSmall.png";
import newBannerr from "../assets/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera.jpg";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import homeImage from "../assets/image_no_white_bg.png"

function MainBanner() {
    return (
        <div className="flex flex-wrap items-center justify-center w-full overflow-hidden h-[700px] bg-gradient-to-b from-indigo-200 via-white to-indigo-100 rounded-br-[40%]" data-aos="fade-up">
            {/* Background images */}
            <img src={homeImage} alt="banner" className="md:w-1/2 w-full object-cover" />
            {/* <img src={bannerSmallImg} alt="banner" className="w-full h-full object-cover md:hidden" /> */}

            {/* Text Container */}
            <div className=" flex items-center px-4 md:px-16">
                <div className="max-w-md text-left">
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 leading-tight">
                        Everything You Need, 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Just a Click Away.</span>
                    </h1>
                    <p className="text-black mb-8 text-sm md:text-base">
                        Discover amazing products curated just for you
                    </p>
                    <Link to="/products">
                        <button className="flex items-center gap-2 bg-indigo-200 hover:bg-indigo-300 text-gray-800 font-bold py-3 px-6 md:py-4 md:px-10 rounded-lg transition-all duration-300 ease-in-out text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-bounce">
                            Explore Now
                            <FaArrowRightLong className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
}

export default MainBanner;
