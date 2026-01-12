import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Rules from "./components/Rules/Rules";
import HowToGet from "./components/HowToGet/HowToGet";
import Footer from "./components/Footer/Footer";
import Reviews from "./components/Reviews/Reviews";
import GuestPhotos from "./components/GuestPhotos/GuestPhotos";

export default function Home() {
  return (
    <>
      <Header />
      <Main id="main" />
      <About id="about" />
      <Rules id="rules" />
      <HowToGet id="howtoget" />
      <Reviews id="reviews" />
      <GuestPhotos id="guestphotos" />
      <Footer />
    </>
  );
}
