import { useEffect } from 'react'
import MainBanner from '../components/MainBanner'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import AOS from 'aos';
import "aos/dist/aos.css";

function Home() {

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      delay: 100,
      once: true,
    });
  });
  return (
    <div>
      <MainBanner />
      <Category />
      <BestSeller />
      <BottomBanner />
    </div>
  )
}

export default Home