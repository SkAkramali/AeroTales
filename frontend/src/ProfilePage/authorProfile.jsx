import { useLocation } from "react-router-dom";
import { Header } from "../HomePage/home";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import './authorProfile.css';
/* import { NavLink, Outlet } from "react-router-dom"; */

function AuthorProfile() {
/*   const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState(); */
  const [followersAndFollowing, setfollowersAndFollowing] = useState(true)
  const navigate = useNavigate();
  const data = useLocation();
  const id = data.state.authorId;
  const [authorData, setAuthorData] = useState();
  console.log(id);
  useEffect(() => {
    const fetchCall = async () => {
      const authorData = await fetchAuthorDetails(id);
      setAuthorData(authorData);
      console.log(authorData)
     /*  setFollowers(authorData.followers);
      setFollowing(authorData.following); */
    }
    fetchCall();
  }, [followersAndFollowing])
  const fetchAuthorDetails = async (id) => {
    const response = await fetch(`http://localhost:8000/user/profile/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const authorDetails = await response.json();
    return authorDetails
  }
  useEffect(() => {
    console.log(authorData)
  })

  const handleStory = (presentId) => {
    navigate(`/storypage/${presentId}`, {
      state: {
        id: presentId,
      }
    });
  }
  const authorProfile = (id) => {
    navigate(`/authorProfile/${id}`, { state: { authorId: id } });
  }

  return (
    <>
      <Header />
      {authorData &&
        <main>
          <div className="userDetails">
            <h1 className="storiesTitle">Stories </h1>
            <div className="stories">
              {(authorData.stories.length === 0) ? <h3 className="noStoriesIndicator">No Stories Published</h3> : authorData.stories.map((story, index) => {
                console.log(story)
                return (
                  <div key={index} className="storyContainer authorStoryContainer" onClick={() => handleStory(story.id)}>
                    <h5 className="storyTitle">{story.title}</h5>
                    <p className="storyOutline">{story.content[0] && story.content[0].data.text}</p>
                    {/* <img className="dashboardStoryImage" src={story.coverImageName} alt="Story Cover" /> */}
                    <p className="publishedAt authorPublish">Published at {moment(story.published_at).fromNow()}</p>
                  </div>
                );
              })
              }
            </div>

            {/* <Outlet context={{ following, followers }} /> */}
          </div>
          <div className=" userProfile profileContainer" >
            <div>
              <img src={authorData.avatar_url} className="authorAvatar"/>
              <h4>{authorData.username}</h4>
              <h4>Author id: {authorData.id}</h4>
              <div className="authorFollowingFollowers">
                <div className="numberOfFollowersFollowing">
                  <p className={ followersAndFollowing == true ? 'activeLink' : 'inActiveLink' } to='following' onClick={()=>{setfollowersAndFollowing(true)}}>{authorData.following.length} Following</p>
                  <p className={ followersAndFollowing === false ? 'activeLink' : 'inActiveLink' } to='followers' onClick={()=>{setfollowersAndFollowing(false)}}>{authorData.followers.length} Followers</p>
                </div>
                <div className="followersAndFollowingDetails">
                  {followersAndFollowing == true && <div className="authorFollowing">
                    <>
                   { authorData.following.length !== 0 ? authorData.following.map((follow, index) => {
                      return ( 
                      <div className="followAuthorDetails" key={index} onClick={() => authorProfile(follow.id)}>
                        <img className="avatar" key = {follow.username} src={follow.avatar_url} />
                      <p className="userName">{follow.username}</p>
                      </div>
                      )
                    }): <p>no following</p>}
                    </>
                  </div> }
                  {followersAndFollowing === false && <div className="authorFollowers"><>
                   {authorData.followers.length !== 0 ? authorData.followers.map((follow, index) => {
                      return ( 
                      <div className="followAuthorDetails" key={index} onClick={() => authorProfile(follow.id)}>
                        <img className="avatar" key = {follow.username} src={follow.avatar_url} />
                      <p className="userName">{follow.username}</p>
                      </div>
                      )
                      // console.log('trdty'+follow.username)
                    }): <p>no followers</p>}</>
                  </div> }
                </div>
              </div>
            </div>
{/*             <Outlet context={{ following, followers }} />
 */}          </div>
        </main>
      }
    </>
  );
}
export { AuthorProfile };