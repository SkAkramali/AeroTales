import { useContext, useEffect, useState } from "react";
import './recentStories.css';
import { useNavigate } from "react-router-dom";
import { userDataContext } from "./App";
import moment from "moment";
import parse from 'html-react-parser';
function RecentStories() {
  const [recentStories, setRecentStories] = useState();
  const data = useContext(userDataContext);
  const [views, setViews] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (data[0] !== undefined) {
      setRecentStories(data[0].stories);
    }
  }, [data]);
  const fetchStory = async (id) => {
    const response = await fetch(`http://localhost:8000/story/${id}/responses`, {
      method: "GET",
      credentials: "include",
    });
    const publishedStory = await response.json();
    console.log("Fetched story:", publishedStory);
    return publishedStory;
  };
  const fetchCall = async (id) => {
    const storyResponse = await fetchStory(id);
    setViews(prevViews => ({ ...prevViews, [id]: storyResponse }));
  };
  useEffect(() => {
    if (recentStories) {
      recentStories.forEach(story => {
        fetchCall(story.id);
      });
    }
  }, [recentStories]);
  const handleStory = (presentId) => {
    console.log('iddddd')
    navigate(`/storypage/${presentId}`, {
      state: {
        id: presentId,
      }
    });
  };
  const authorProfile = (id) => {
    navigate(`/authorProfile/${id}`, { state: { authorId: id } });
  };
  return (
    <div className="storiesContainer">
      <h4>For You</h4>
      {
        (recentStories !== undefined && recentStories.length !== 0) ?
          recentStories.map(story => {
            if (!story) {
              return <p key={story.id}>no stories found....!</p>
            }
            return (
              <div key={story.id} className="mostRecentStories">
                <div className="author">
                  <img className="authorProfile" src={story.author_avatar_url} alt="Author"></img>
                  <p className="authorName" onClick={() => authorProfile(story.authorId)}>{story.author}</p>
                </div>
                <div className="storyContainer" onClick={() => handleStory(story.id)}>
                  <h5 className="storyTitle">{parse(story.title)}</h5>
                  <p className="storyOutline">{story.content[0] !== undefined ? parse(story.content[0].data.text) : ''}</p>
                  {/* <img className="dashboardStoryImage" src={story.coverImageName} alt="Story Cover" /> */}
                  <p className="publishedAt">Published: {moment(story.published_at).fromNow()}</p>
                  <div className='views' title="views">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 33 33" aria-label="clap">
                      <path fillRule="evenodd" stroke="black" strokeLinejoin="round" strokeWidth="1" d="M29 16c0 3-5.82 9-13 9S3 19 3 16s5.82-9 13-9 13 6 13 9z"></path>
                      <circle cx="16" cy="16" r="5" stroke="black" strokeLinejoin="round" strokeWidth="1"></circle>
                    </svg>
                    {views[story.id] && views[story.id].story.views}
                  </div>
                </div>
              </div>
            )
          }) : <p className="note">no stories found....!</p>
      }
    </div>
  );
}
export default RecentStories;