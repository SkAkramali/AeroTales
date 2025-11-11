import { useNavigate } from 'react-router-dom';
import RecentStories from '../recentStories';
import './home.css';
import { useContext, useState } from 'react';
import { userDataContext } from '../App';
import { Link } from 'react-router-dom';

export const Profile = function () {
  const userData = useContext(userDataContext);
  const [checkDraft, setCheckDraft] = useState(false);
  const [popup, setPopup] = useState(false)
  const navigate = useNavigate();
  const toggleClose = () => {
    setCheckDraft(!checkDraft);
  }
  const showPopup = () => {
    setPopup(true);
    toggleClose();
  }
  const closePopup = () => {
    setPopup(false);
  }
  const handleLogout = async () => {
    const response = await fetch(`http://localhost:8000/user/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const status = await response.json();
    if (status.status === 'Logged out') {
      // window.location.reload();
      navigate('/');
    }
    console.log(status.status);
  }
  return (
    <>
      {userData[0] !== undefined ? <img src={userData[0].profile} className='profile' alt='Profile' onClick={toggleClose} /> : null}
      {checkDraft && <div className='profilePopup'>
        <p className='iconName' onClick={() => navigate('/profile/following')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Profile"><circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle><path stroke="currentColor" strokeLinecap="round" d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"></path></svg>Profile</p>
        <p className='iconName' onClick={() => navigate('/writeStory')}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write">
          <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
          <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path>
        </svg>Write</p>
        <p className='iconName' onClick={() => navigate('/stories/draftStories')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Stories">
            <path stroke="currentColor" d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"></path><path stroke="currentColor" strokeLinecap="round" d="M8 8.5h8M8 15.5h5M8 12h8"></path>
          </svg> Stories</p>
        <p className='iconName' onClick={showPopup}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Stories">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.11256 0.75C2.1001 0.75 2.08765 0.75031 2.07522 0.75093C1.49768 0.779719 0.955076 1.03617 0.566199 1.46413C0.181579 1.88741 -0.021668 2.44436 -0.000443399 3.01539V20.9848C-0.0213439 21.5557 0.181993 22.1124 0.566503 22.5356C0.955205 22.9634 1.49744 23.2199 2.0747 23.249C2.08731 23.2497 2.09993 23.25 2.11256 23.25H14.3856C14.398 23.25 14.4105 23.2497 14.4229 23.2491C15.0004 23.2203 15.543 22.9639 15.9321 22.5361C16.3169 22.1129 16.5204 21.556 16.4996 20.9849V16.5C16.4996 16.0858 16.1638 15.75 15.7496 15.75C15.3353 15.75 14.9996 16.0858 14.9996 16.5V21C14.9996 21.0045 14.9996 21.0089 14.9997 21.0134C14.9997 21.0164 14.9998 21.0194 14.9999 21.0225L15.0003 21.0338C15.0085 21.2153 14.9445 21.3926 14.8223 21.527C14.7035 21.6576 14.5392 21.7373 14.3635 21.75H2.13496C1.95943 21.7372 1.79527 21.6574 1.67665 21.5268C1.55454 21.3925 1.4906 21.2152 1.49879 21.0338C1.4993 21.0226 1.49956 21.0113 1.49956 21V3C1.49956 2.98854 1.49929 2.97709 1.49877 2.96564C1.49046 2.78437 1.55431 2.60719 1.67634 2.47288C1.79495 2.34235 1.95913 2.26267 2.13465 2.25H14.3635C14.5392 2.26268 14.7035 2.34241 14.8223 2.47302C14.9445 2.60741 15.0085 2.78473 15.0003 2.96619C14.9998 2.97745 14.9996 2.98873 14.9996 3V7.5C14.9996 7.91421 15.3353 8.25 15.7496 8.25C16.1638 8.25 16.4996 7.91421 16.4996 7.5V3.01514C16.5204 2.444 16.3169 1.88707 15.9321 1.46387C15.543 1.03605 15.0004 0.779717 14.4229 0.75093C14.4105 0.75031 14.398 0.75 14.3856 0.75H2.11256ZM18.9697 7.72367C19.2626 7.43077 19.7374 7.43077 20.0303 7.72367L23.7803 11.4737C23.8522 11.5456 23.9065 11.6285 23.9431 11.7169C23.9798 11.8053 24 11.9023 24 12.004C24 12.1959 23.9268 12.3879 23.7803 12.5343L20.0303 16.2843C19.7374 16.5772 19.2626 16.5772 18.9697 16.2843C18.6768 15.9914 18.6768 15.5166 18.9697 15.2237L21.4393 12.754H7.5C7.08579 12.754 6.75 12.4182 6.75 12.004C6.75 11.5898 7.08579 11.254 7.5 11.254H21.4393L18.9697 8.78433C18.6768 8.49143 18.6768 8.01656 18.9697 7.72367Z" fill="#767676" />
          </svg>Logout</p>
      </div>}

      {popup && <div className='logoutPopupContainer'>
        <div className="logoutPopup">
          <p className='logoutText'>want to logout ?</p>
          <button className='cancleLogoutButton' onClick={closePopup}>cancel</button>
          <button className='logoutButton' onClick={handleLogout}>confirm</button>
        </div>
      </div>}
    </>
  )
};

const AddStoryAndProfile = () => {
  const userData = useContext(userDataContext);
  console.log(userData[0]);

  const navigate = useNavigate();
  const writeStory = () => {
    navigate('/writeStory');
  };

  return (
    <div className="story-profile">
      <p className='iconName' onClick={writeStory}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write">
          <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
          <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path>
        </svg>
        write</p>
      <Profile />
    </div>
  )
};

export const MediumTitle = () => {
  return (
    <Link to={'/home'} className='mediumTitle' >
      <h1>
        <svg viewBox="0 0 21 21" fill="none" width="33" height="33" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12.0004 18.5816V12.5M12.7976 18.754L15.8103 19.7625C17.4511 20.3118 18.2714 20.5864 18.7773 20.3893C19.2166 20.2182 19.5499 19.8505 19.6771 19.3965C19.8236 18.8737 19.4699 18.0843 18.7624 16.5053L14.2198 6.36709C13.5279 4.82299 13.182 4.05094 12.7001 3.81172C12.2814 3.60388 11.7898 3.60309 11.3705 3.80958C10.8878 4.04726 10.5394 4.8182 9.84259 6.36006L5.25633 16.5082C4.54325 18.086 4.18671 18.875 4.33169 19.3983C4.4576 19.8528 4.78992 20.2216 5.22888 20.394C5.73435 20.5926 6.55603 20.3198 8.19939 19.7744L11.2797 18.752C11.5614 18.6585 11.7023 18.6117 11.8464 18.5933C11.9742 18.5769 12.1036 18.5771 12.2314 18.5938C12.3754 18.6126 12.5162 18.6597 12.7976 18.754Z" stroke="#5c5c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            </path>
          </g>
        </svg>
        erotales</h1>
    </Link>
  )
}

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="home-header">
      <div className='titleSearch'>
        <MediumTitle />
        <div className='searchBar'>
          <svg className='searchIcon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clipRule="evenodd"></path>
          </svg>
          <input type="text" placeholder='Search' onSelect={() => { navigate('/search') }} />
        </div>
      </div>
      <AddStoryAndProfile />
    </div>
  )
};

export const Home = () => {
  return (
    <>
      <Header />
      <RecentStories></RecentStories>
    </>
  )
}