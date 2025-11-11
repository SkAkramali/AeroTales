import { createContext, useState, useEffect } from 'react';
import './App.css';
import { Home } from './HomePage/home';
import { WriteStory } from './HomePage/writeStory';
import WelcomePage from './WelcomePage/WelcomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DraftStories } from './Stories/draftStories';
import { Stories } from './Stories/stories';
import { PublishStories } from './Stories/publishStories';
import { Edit } from './EditPage/edit';
import { Profile } from './ProfilePage/Profile';
import { ShowStory } from './HomePage/storyPage';
import { Followers } from './ProfilePage/Followers';
import { Following } from './ProfilePage/Following';
import { ResponsePage } from './Response/ResponsePage';
import { AuthorProfile } from './ProfilePage/authorProfile';
import { Search } from './SearchPage/Search';

export const userDataContext = createContext();
export const storyContext = createContext();
export const idContext = createContext();
export const savedContext = createContext();

function App() {
  const [userData, setUserData] = useState();
  const [story, setStory] = useState();
  const [storyId, setStoryId] = useState();
  const [isSaved, setIsSaved] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('http://localhost:8000/user/dashboard', {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.id) {
        setUserData({
          id: data.id,
          profile: data.avatar_url,
          name: data.username,
          stories: data.stories
        });
        // setIsLoggedIn(true);
      } 
      // else {
      //   setIsLoggedIn(false);
      // }
    }
    fetchApi();
  }, []);

  return (
    <Router>
      <userDataContext.Provider value={[userData, setUserData]}>
        <storyContext.Provider value={[story, setStory]}>
          <idContext.Provider value={[storyId, setStoryId]}>
            <savedContext.Provider value={[isSaved, setIsSaved]}>
              <Routes>
                <Route path='/' element={<WelcomePage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/writeStory' element={<WriteStory />} />
                <Route path='/edit' element={<Edit />} />
                <Route path='/stories/' element={<Stories />}>
                  <Route path='draftStories' element={<DraftStories />} />
                  <Route path='publishStories' element={<PublishStories />} />
                </Route>
                <Route path='/Profile/' element={<Profile />}>
                  <Route path='followers' element={<Followers />} />
                  <Route path='following' element={<Following />} />
                </Route>
                <Route path='/storyPage/:id' element={<ShowStory />} />
                <Route path='/storyPage/:id/responesPage' element={<ResponsePage />} />
                <Route path='/authorProfile/:id' element={<AuthorProfile />} />
                <Route path='/search' element={<Search />} />
              </Routes>
            </savedContext.Provider>
          </idContext.Provider>
        </storyContext.Provider>
      </userDataContext.Provider>
    </Router>
  );
}

export default App;