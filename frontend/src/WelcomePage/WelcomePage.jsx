import WelcomePageHeader from "./WelcomePageHeader";
import WelcomePageMain from "./HeroSection";
import WelcomePageFooter from "./WelcomePageFooter";
import './WelcomePage.css';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const singIn = function () {
  window.location.replace(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
};

const WelcomePage = function () {
  return(
    <div className="welcomePage">
      <WelcomePageHeader />
      <WelcomePageMain />
      <WelcomePageFooter />
    </div>
  )
};

export default WelcomePage;
