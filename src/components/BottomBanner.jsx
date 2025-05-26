import React from 'react'
import bottomImg from "../assets/poster4.png";
import bannerSmall from "../assets/bottombanner.png";

function BottomBanner() {
    return (
        <div className="py-12 bg-purple-50" >
            <div className="text-center px-3 py-8" data-aos="fade-up">
                <h1 className="text-2xl md:text-4xl font-bold text-black">
                    Unbeatable Deals. Unmatched Variety. Delivered Fast.
                </h1>
            </div>
            <div className="w-full max-h-[500px] flex justify-center items-center" data-aos="fade-up">
                <img src={bottomImg} alt="banner" className='w-11/12 hidden md:block' />
                <img src={bannerSmall} alt="banner" className='w-11/12 md:hidden' />
            </div>
            
        </div>
        
        
    )
}

export default BottomBanner