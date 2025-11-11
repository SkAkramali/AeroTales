import { useNavigate, useOutletContext } from "react-router-dom";

export const Followers = function () {
  const navigate = useNavigate();
  const { followers } = useOutletContext();
  const authorProfile = (id) => {
    navigate(`/authorProfile/${id}`, { state: { authorId: id } })
  }
  return (
    <div>
      {followers.length > 0 ? followers.map((follower, index) => (
        <div key={index} className="follower">
          <img src={follower.avatar_url} alt={follower.username} />
          <h4 onClick={() => authorProfile(follower.id)}>{follower.username}</h4>
        </div>
      )): <h1> no followers</h1>}
    </div>
  );
};
