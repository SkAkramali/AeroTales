import { useNavigate, useOutletContext } from "react-router-dom";
import { FollowComponent } from "../HomePage/storypage";

export const Following = function () {
  const navigate = useNavigate();
  const { following } = useOutletContext();
  const authorProfile = (id) => {
    navigate(`/authorProfile/${id}`, { state: { authorId: id } })
  }
  return (
    <div>
      {following.length > 0 ? following.map((followedUser, index) => (
        <div key={index} className="following">
          <img src={followedUser.avatar_url} alt={followedUser.username} />
          <h4 onClick={() => authorProfile(followedUser.id)}>{followedUser.username}</h4>
          <FollowComponent id={followedUser.id} />
        </div>
      )) : <h1>following none</h1>}
    </div>
  );
};
