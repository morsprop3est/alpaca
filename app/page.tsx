import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ReservationModule from "./components/ReservationModule/ReservationModule";
import About from "./components/About/About";
import Rules from "./components/Rules/Rules";
import HowToGet from "./components/HowToGet/HowToGet";
import Footer from "./components/Footer/Footer";
import Reviews from "./components/Reviews/Reviews";
import GuestPhotos from "./components/GuestPhotos/GuestPhotos";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import CallButton from "./components/CallButton/CallButton";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Header />
      <Main id="main" />
      <ReservationModule />
      <About id="about" />
      <Rules id="rules" />
      <HowToGet id="howtoget" />
      <Reviews id="reviews" />
      <GuestPhotos id="guestphotos" />
      <Footer />
      <CallButton />
    </>
  );
}
