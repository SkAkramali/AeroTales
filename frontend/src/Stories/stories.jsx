import { useContext, useEffect, useState } from "react";
import { Header } from "../HomePage/home";
import '../HomePage/home.css';
import { idContext, storyContext } from "../App";
import parse from 'html-react-parser';
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import moment from 'moment';

const DraftPopup = ({ storyId, setIsDelete, isDelete, setPopup }) => {
  const handleDelete = async (id) => {
    const draftDeleteRes = await fetch(`http://localhost:8000/draft`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftId: id })
    });
    await draftDeleteRes.json();
    setIsDelete(!isDelete);
    setPopup(false);
  };

  return (
    <div className="delete-popup">
      <h1>Delete story</h1>
      <p>Deletion is not reversible, and the story will be completely deleted.</p>
      <div className="cancel-delete-btns">
        <button className="cancel-btn draft-btns" onClick={() => setPopup(false)}>Cancel</button>
        <button className="confirm-btn draft-btns" onClick={() => handleDelete(storyId)}>Confirm</button>
      </div>
    </div>
  )
};

const DraftPageMain = () => {
  const navigate = useNavigate();
  const [draftStories, setDraftStories] = useState([]);
  const [publishStories, setPublishStories] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const setStory = useContext(storyContext);
  const setStoryId = useContext(idContext);

  const handleDraftStory = async (id) => {
    const storyRes = await fetch(`http://localhost:8000/draft/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const storyData = await storyRes.json();
    setStory[1](storyData);
    setStoryId[1](id);
    navigate('/edit');
  };

  const [isPopup, setPopup] = useState(false);
  const [storyIdToDelete, setStoryIdToDelete] = useState(null);
  const [dropDown, setDropDown] = useState({ state: false, id: '' });

  const handlePopup = (id) => {
    setPopup(true);
    setStoryIdToDelete(id);
  };

  useEffect(() => {
    const Stories = async () => {
      const response = await fetch(`http://localhost:8000/user/stories`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setDraftStories(data.drafts.map((story, index) => {
        const timeAgo = moment(story.last_modified).fromNow();
        console.log(timeAgo)
        return (
          <>
            <div className="draft-story" key={index}>
              <div className="draft-title-delete-btn">
                <h3 onClick={() => handleDraftStory(story.id)}> {(story.title === undefined || story.title === '') ? 'untitled story' : parse(story.title)}</h3>
              </div>
              <p className="last-Modifed">{timeAgo}
                <button className="arrow-btn" onClick={() => setDropDown({ state: !dropDown.state, id: story.id })} >
                  {(dropDown.state && story.id === dropDown.id) ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                      <path fillRule="evenodd" d="m4 13.669 6.032-6.67.495-.547.495.547 5.973 6.603-.989.895-5.974-6.603h.99l-6.033 6.67z"></path>
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" className="cg"><path fillRule="evenodd" d="m4 7.331 6.032 6.67.495.547.495-.547 5.973-6.603-.989-.895-5.974 6.603h.99l-6.033-6.67z"></path>
                    </svg>}
                  {(dropDown.state && story.id === dropDown.id) && <div className="delete-drop-down">
                    <button className="delete-btn" onClick={() => { handlePopup(story.id) }}>Delete</button>
                  </div>
                  }
                </button>
              </p>
            </div >
            {isPopup &&
              <div className="overlay">
                <DraftPopup storyId={storyIdToDelete} setIsDelete={setIsDelete} isDelete={isDelete} setPopup={setPopup} />
              </div >
            }
          </>
        )
      }))
      setPublishStories(data.published.map((story, index) => {
        const timeAgo = moment(story.published_at).fromNow();
        const handlePublish = (id) => {
          navigate(`/storypage/${id}`, {
            state: {
              id: id,
            }
          });
        }
        return (
          <div className="draft-story" key={index}>
            <h3 onClick={() => handlePublish(story.id)}> {(story.title === undefined || story.title === '') ? 'untitled story' : parse(story.title)} </h3>
            <p className="last-published">{timeAgo}</p>
          </div>
        )
      }))
    }
    Stories();
  }, [isDelete, isPopup, dropDown])

  return (
    <div className="draft-stories">
      <div className="draft-stories-main-header">
        <h1>Your Stories</h1>
        {/* <button id="write-story-btn" onClick={() => navigate('/writeStory')}>Write a Story</button> */}
      </div>
      <nav className="drafts-published-responses">
        <NavLink className={({ isActive }) => { return isActive ? 'activeLink' : 'inActiveLink' }} to='draftStories'>Drafts {draftStories.length}</NavLink>
        <NavLink className={({ isActive }) => { return isActive ? 'activeLink' : 'inActiveLink' }} to='publishStories' >Published {publishStories.length}</NavLink>
      </nav>
      <Outlet context={{ draftStories, publishStories }} />
    </div>
  )
};

const Stories = () => {
  return (
    <>
      <Header />
      <DraftPageMain />
    </>
  )
};

export { Stories };
