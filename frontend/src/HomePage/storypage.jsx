import { useParams, useNavigate } from "react-router-dom";
import { Header } from "./home";
import { useContext, useEffect, useState } from "react";
import './storyPage.css';
import parse from 'html-react-parser';
import { userDataContext } from "../App";
import moment from "moment";

const fetchStory = async (id) => {
  const response = await fetch(`http://localhost:8000/story/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const publishedStory = await response.json();
  console.log("Fetched story:", publishedStory);
  return publishedStory;
};
const InteractionButtons = ({ id, responsesCount, clapsCount, isClapped, setClapsCount, setIsClapped, authorId, viewCount, setCopyLink }) => {
  const userData = useContext(userDataContext);
  const navigate = useNavigate();
  const isUser = userData[0].id === authorId;
  const copyUrl = () => {
    setCopyLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setCopyLink(false)
    }, 1300);
  };

  const handleResponse = function () {
    navigate(`/storyPage/${id}/responesPage`);
  };

  const handleClap = async () => {
    const response = await fetch(`http://localhost:8000/story/${id}/clap`, {
      method: "PUT",
      credentials: "include",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    setClapsCount(data.clapsCount);
    setIsClapped(data.isClapped);
  };
  return (
    <div className="interaction-buttons">
      {!isClapped ?
        <button className={isUser ? 'not-allowed' : 'action-button'} title={isUser ? "You can't applaud your own story" : "clap"} onClick={!isUser ? handleClap : undefined}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="clap">
            <path fillRule="evenodd" d="M11.37.828 12 3.282l.63-2.454zM13.916 3.953l1.523-2.112-1.184-.39zM8.589 1.84l1.522 2.112-.337-2.501zM18.523 18.92c-.86.86-1.75 1.246-2.62 1.33a6 6 0 0 0 .407-.372c2.388-2.389 2.86-4.951 1.399-7.623l-.912-1.603-.79-1.672c-.26-.56-.194-.98.203-1.288a.7.7 0 0 1 .546-.132c.283.046.546.231.728.5l2.363 4.157c.976 1.624 1.141 4.237-1.324 6.702m-10.999-.438L3.37 14.328a.828.828 0 0 1 .585-1.408.83.83 0 0 1 .585.242l2.158 2.157a.365.365 0 0 0 .516-.516l-2.157-2.158-1.449-1.449a.826.826 0 0 1 1.167-1.17l3.438 3.44a.363.363 0 0 0 .516 0 .364.364 0 0 0 0-.516L5.293 9.513l-.97-.97a.826.826 0 0 1 0-1.166.84.84 0 0 1 1.167 0l.97.968 3.437 3.436a.36.36 0 0 0 .517 0 .366.366 0 0 0 0-.516L6.977 7.83a.82.82 0 0 1-.241-.584.82.82 0 0 1 .824-.826c.219 0 .43.087.584.242l5.787 5.787a.366.366 0 0 0 .587-.415l-1.117-2.363c-.26-.56-.194-.98.204-1.289a.7.7 0 0 1 .546-.132c.283.046.545.232.727.501l2.193 3.86c1.302 2.38.883 4.59-1.277 6.75-1.156 1.156-2.602 1.627-4.19 1.367-1.418-.236-2.866-1.033-4.079-2.246M10.75 5.971l2.12 2.12c-.41.502-.465 1.17-.128 1.89l.22.465-3.523-3.523a.8.8 0 0 1-.097-.368c0-.22.086-.428.241-.584a.847.847 0 0 1 1.167 0m7.355 1.705c-.31-.461-.746-.758-1.23-.837a1.44 1.44 0 0 0-1.11.275c-.312.24-.505.543-.59.881a1.74 1.74 0 0 0-.906-.465 1.47 1.47 0 0 0-.82.106l-2.182-2.182a1.56 1.56 0 0 0-2.2 0 1.54 1.54 0 0 0-.396.701 1.56 1.56 0 0 0-2.21-.01 1.55 1.55 0 0 0-.416.753c-.624-.624-1.649-.624-2.237-.037a1.557 1.557 0 0 0 0 2.2c-.239.1-.501.238-.715.453a1.56 1.56 0 0 0 0 2.2l.516.515a1.556 1.556 0 0 0-.753 2.615L7.01 19c1.32 1.319 2.909 2.189 4.475 2.449q.482.08.971.08c.85 0 1.653-.198 2.393-.579.231.033.46.054.686.054 1.266 0 2.457-.52 3.505-1.567 2.763-2.763 2.552-5.734 1.439-7.586z" clipRule="evenodd"></path>
          </svg>
          {clapsCount}
        </button> :
        <button className={isUser ? 'not-allowed' : 'action-button'} title="clap" onClick={handleClap}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="clap">
            <path fillRule="evenodd" d="M11.37.828 12 3.282l.63-2.454zM15.421 1.84l-1.185-.388-.338 2.5zM9.757 1.452l-1.184.389 1.523 2.112zM20.253 11.84 17.75 7.438c-.238-.353-.57-.584-.93-.643a.96.96 0 0 0-.753.183 1.13 1.13 0 0 0-.443.695c.014.019.03.033.044.053l2.352 4.138c1.614 2.95 1.1 5.771-1.525 8.395a7 7 0 0 1-.454.415c.997-.13 1.927-.61 2.773-1.457 2.705-2.704 2.517-5.585 1.438-7.377M12.066 9.01c-.129-.687.08-1.299.573-1.773l-2.062-2.063a1.123 1.123 0 0 0-1.555 0 1.1 1.1 0 0 0-.273.521z" clipRule="evenodd"></path>
            <path fillRule="evenodd" d="M14.741 8.309c-.18-.267-.446-.455-.728-.502a.67.67 0 0 0-.533.127c-.146.113-.59.458-.199 1.296l1.184 2.503a.448.448 0 0 1-.236.755.445.445 0 0 1-.483-.248L7.614 6.106A.816.816 0 1 0 6.459 7.26l3.643 3.644a.446.446 0 1 1-.631.63L5.83 7.896l-1.03-1.03a.82.82 0 0 0-1.395.577.81.81 0 0 0 .24.576l1.027 1.028 3.643 3.643a.444.444 0 0 1-.144.728.44.44 0 0 1-.486-.098l-3.64-3.64a.82.82 0 0 0-1.335.263.81.81 0 0 0 .178.89l1.535 1.534 2.287 2.288a.445.445 0 0 1-.63.63l-2.287-2.288a.813.813 0 0 0-1.393.578c0 .216.086.424.238.577l4.403 4.403c2.79 2.79 5.495 4.119 8.681.931 2.269-2.271 2.708-4.588 1.342-7.086z" clipRule="evenodd"></path>
          </svg>
          {clapsCount}
        </button>
      }
      <div className='action-button' title="views">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 33 33" aria-label="clap">
          <path fillRule="evenodd" stroke="black" strokeLinejoin="round" strokeWidth="1" d="M29 16c0 3-5.82 9-13 9S3 19 3 16s5.82-9 13-9 13 6 13 9z"></path>
          <circle cx="16" cy="16" r="5" stroke="black" strokeLinejoin="round" strokeWidth="1"></circle>
        </svg>
        {viewCount}
      </div>
      <button className='action-button' title="Responses" onClick={handleResponse}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="gv">
          <path d="M18.006 16.803c1.533-1.456 2.234-3.325 2.234-5.321C20.24 7.357 16.709 4 12.191 4S4 7.357 4 11.482c0 4.126 3.674 7.482 8.191 7.482.817 0 1.622-.111 2.393-.327.231.2.48.391.744.559 1.06.693 2.203 1.044 3.399 1.044.224-.008.4-.112.486-.287a.49.49 0 0 0-.042-.518c-.495-.67-.845-1.364-1.04-2.057a4 4 0 0 1-.125-.598zm-3.122 1.055-.067-.223-.315.096a8 8 0 0 1-2.311.338c-4.023 0-7.292-2.955-7.292-6.587 0-3.633 3.269-6.588 7.292-6.588 4.014 0 7.112 2.958 7.112 6.593 0 1.794-.608 3.469-2.027 4.72l-.195.168v.255c0 .056 0 .151.016.295.025.231.081.478.154.733.154.558.398 1.117.722 1.659a5.3 5.3 0 0 1-2.165-.845c-.276-.176-.714-.383-.941-.59z"></path>
        </svg>
        {responsesCount}
      </button>
      <button className='action-button' title="copy URL" onClick={copyUrl}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" color="black" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m12.505 9.678.59-.59a5 5 0 0 1 1.027 7.862l-2.829 2.83a5 5 0 0 1-7.07-7.072l2.382-2.383q.002.646.117 1.298l-1.793 1.792a4 4 0 0 0 5.657 5.657l2.828-2.828a4 4 0 0 0-1.046-6.411q.063-.081.137-.155m-1.01 4.646-.589.59a5 5 0 0 1-1.027-7.862l2.828-2.83a5 5 0 0 1 7.071 7.072l-2.382 2.383a7.7 7.7 0 0 0-.117-1.297l1.792-1.793a4 4 0 1 0-5.657-5.657l-2.828 2.828a4 4 0 0 0 1.047 6.411 2 2 0 0 1-.138.155" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  )
};

export const FollowComponent = ({ id }) => {
  const [isFollow, setIsFollow] = useState(true);
  const handleFollowFollowing = async (id) => {
    const response = await fetch(`http://localhost:8000/user/${isFollow ? 'unFollow' : 'follow'} `, {
      method: "POST",
      credentials: "include",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId: id
      }),
    });
    console.log(await response.json())
    setIsFollow(!isFollow);
  };

  return (
    <>
      <button onClick={() => handleFollowFollowing(id)} className={isFollow ? 'red followUnfollowBtn' : 'green followUnfollowBtn'}>{isFollow ? 'Unfollow' : 'Follow'}</button>
    </>
  )
};

const ShowStory = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState(undefined);
  const { id } = useParams();
  console.log('showStory')
  useEffect(() => {
    const fetchCall = async () => {
      try {
        const storyResponse = await fetchStory(id);
        setStoryData(storyResponse);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    }
    fetchCall();
  }, [id])

  const authorProfile = (id) => {
    navigate(`/authorProfile/${id}`, { state: { authorId: id } })
  }
  const [clapsCount, setClapsCount] = useState(storyData && storyData.story.clapsCount);
  const [isClapped, setIsClapped] = useState(storyData && storyData.story.isClapped);
  const [viewCount, setViewCount] = useState(storyData && storyData.story.views);
  const [copyLink, setCopyLink] = useState(false);
  useEffect(() => {
    setViewCount(storyData && storyData.story.views);
    setClapsCount(storyData && storyData.story.clapsCount);
    setIsClapped(storyData && storyData.story.isClapped);
  }, [storyData])

  if (!storyData) {
    return <div className="loader">Loading...</div>;
  }
  console.log(storyData)
  return (
    <>
      <Header></Header>
      {copyLink && <div className="copyPopup">
        <p>link copied</p>
        <p className="closePopup" onClick={() => setCopyLink(false)}>X</p>
      </div>}
      <div className="publishStoryContainer">
        <h1 className="publishStoryTitle">{parse(storyData.story.title)}</h1>

        <div className="authorProfileContainer">
          <div className="profileInfo">
            <img src={storyData.story.avatar_url} className="authorImage" />
            <div className="info">
              <div className="authorFollow">
                <p className="ProfileAuthorName" onClick={() => authorProfile(storyData.story.authorId)}>{storyData.story.author}</p>
                <FollowComponent id={storyData.story.authorId} />
              </div>
              <p className="published">Published at {moment(storyData.story.published_at).fromNow()}</p>
            </div>
          </div>
          <InteractionButtons id={id} responsesCount={storyData.story.responsesCount}
            clapsCount={clapsCount} isClapped={isClapped} setClapsCount={setClapsCount} setIsClapped={setIsClapped} authorId={storyData.story.authorId} viewCount={viewCount} setCopyLink={setCopyLink} />
        </div>
        {console.log(storyData.story.content)}
        <div className="storyBody">
          {storyData.story.content.map((content, index) => {
            let Tag;
            if (content.type === 'header' || content.type === 'paragraph') {
              Tag = (content.type === 'header') ? `h${content.data.level}` : 'p';
            } else {
              Tag = (content.type === 'code') ? 'code' : 'div';
            }

            return (
              <div className="contents" key={index}>
                {Tag === 'code' ? <Tag className="subTitles">{content.data.code}</Tag> :
                  <Tag className='subTitles'> {Object.keys(content.data).length === 0 ? <div className="delimeter">***</div> : parse(content.data.text)} </Tag>}
              </div>
            )
          })}
        </div>
        <div className="footer-icons">
          <InteractionButtons id={id} responsesCount={storyData.story.responsesCount}
            clapsCount={clapsCount} isClapped={isClapped} setClapsCount={setClapsCount} setIsClapped={setIsClapped} authorId={storyData.story.authorId} viewCount={viewCount} setCopyLink={setCopyLink} />
        </div>
      </div>
    </>
  )
}

export { ShowStory };
