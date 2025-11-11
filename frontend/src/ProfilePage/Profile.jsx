import { Header } from "../HomePage/home";
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../App";
import './profile.css'
import { NavLink, Outlet } from "react-router-dom";

export const Profile = function () {
  const userData = useContext(userDataContext);
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();

  const getProfile = async function () {
    if (userData[0] === undefined) return;
    const respone = await fetch(`http://localhost:8000/user/profile/${userData[0].id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await respone.json();
    setFollowing(data.following);
    setFollowers(data.followers);
  };

  useEffect(() => {
    getProfile();
  }, [userData]);

  if (followers === undefined) return;

  return (
    <>
      <Header />
      <main>
        <div className="userDetails">
          <nav className="user-following-followers">
            <NavLink className={({ isActive }) => { return isActive ? 'activeLink' : 'inActiveLink' }} to='following'>{following.length} Following</NavLink>
            <NavLink className={({ isActive }) => { return isActive ? 'activeLink' : 'inActiveLink' }} to='followers'>{followers.length} Followers</NavLink>
          </nav>
          <Outlet context={{ following, followers }} />
        </div>
        <div className=" userProfile profileContainer" >
          <div>
            <img src={userData[0].profile} className="authorAvatar" />
            <h4 style={{ marginBottom: 10 }}>{userData[0].name}</h4>
            <h4>Author id: {userData[0].id}</h4>
            <div className="MyFollowingFollowers">
              <div>{following.length} Following</div>
              <div>{followers.length} Followers</div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};
