import { singIn } from "./WelcomePage";

const WelcomePageMain = function () {
  return(
    <div className="heroSection">
      <div className="heroSectionContent">
        <h1>Human</h1>
        <h1>Stories & ideas</h1>
        <h3>A place to read, write, and deepen your understanding</h3>
        <button className="button startReadingBtn" onClick={singIn}>Start reading</button>
      </div>
      <img className="heroSectionImg" src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" />
    </div>
  )
};

export default WelcomePageMain;
