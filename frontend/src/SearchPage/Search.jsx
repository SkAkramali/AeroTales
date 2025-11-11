import { useState } from "react";
import { MediumTitle } from "../HomePage/home";
import { Profile } from "../HomePage/home";
import './search.css'
import parse from 'html-react-parser';
import moment from "moment";
import { useNavigate } from "react-router-dom";


const SearchHeader = function ({ setContent, setMount }) {
  const [searchText, setSearchText] = useState('');

  const fetchContent = async function (serachContent) {
    if (!serachContent.length) {
      setContent([]);
      return;
    }
    const respone = await fetch(`http://localhost:8000/search?keyword=${serachContent}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await respone.json();
    console.log(data);

    setContent(data.contentBased);
  };

  const handleKeyDown = function (e) {
    if (e.key === 'Enter') {
      fetchContent(searchText.split(' ').join('%20'));
        setMount(true);
    }
  };

  return (
    <header className="home-header">
      <div className='titleSearch'>
        <MediumTitle />
        <div className='searchBar searchPage'>
          <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clipRule="evenodd"></path>
          </svg>
          <input type="text" placeholder='Search' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} onKeyDown={handleKeyDown} autoFocus/>
        </div>
      </div>
      <Profile />
    </header>
  )
};

export const Search = function () {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [mount, setMount] = useState(false);
  return (
    <>
      <SearchHeader setContent={setContent} setMount={setMount}/>
      {(!content.length && mount) ? <h2 className="notFound">No stories found </h2> : <main className="storiesContainer">
        {content.map((story, index) => {
          return (
            <div key={index} className="mostRecentStories">
              <div className="author">
                <img className="authorProfile" src={story.avatar_url} />
                <p className="authorName" onClick={() => { navigate(`/authorProfile`, { state: { authorId: story.authorId } }) }}>{story.author}</p>
              </div>
              <div className="storyContainer" onClick={() => { navigate(`/storypage/${story.id}`, { state: { id: story.id } }) }}>
                <h5 className="storyTitle">{parse(story.title)}</h5>
                <p className="storyOutline">{story.content[0] !== undefined ? parse(story.content[0].data.text) : ''}</p>
                <p className="publishedAt">Published at {moment(story.published_at).fromNow()}</p>
              </div>
            </div>
          )
        })}
      </main>
      }
    </>
  )
};
