import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import './response.css'
import { userDataContext } from "../App";
import { Header } from "../HomePage/home";
import moment from "moment";

export const ResponsePage = function () {
  const { id } = useParams();
  const [responese, setResponse] = useState([]);
  const [comment, setComment] = useState('');
  const userData = useContext(userDataContext);

  const addResponse = async function () {
    if (userData[0] === undefined) return;
    const obj = {
      id: userData[0].id,
      response: comment,
      username: userData[0].name,
      avatar_url: userData[0].profile,
    }
    console.log(obj);

    const response = await fetch(`http://localhost:8000/story/${id}/response`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    console.log(data);
    setComment('');
    fetchResponse();
  };

  const fetchResponse = async function () {
    const response = await fetch(`http://localhost:8000/story/${id}/responses`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("data", data.responses);
    setResponse(data.responses);
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  return (
    <div>
      <Header />
      <h2 className="responseHeader">Responses ({responese.length})</h2>
      <div className="comments">
        <div className="addResponse" >
          <textarea className="writeResponse" placeholder="What are your thoughts?" value={comment} onChange={(e) => { setComment(e.target.value) }} ></textarea>
          <button className="sendResponse" onClick={addResponse} disabled={!comment.length} >Respond</button>
        </div>
        <div className="allResponses">
          {
            responese.map((respones, index) => {
              return (
                <section key={index} className="response" >
                  <div className="userInfo" >
                    <img src={respones.avatar_url} className="responseProfile" />
                    <div className="userNameTime">
                      <h3 className="userName">{respones.username}</h3>
                      <span className="respondedAt">{moment(respones.responded_at).fromNow()}</span>
                    </div>
                  </div>
                  <div className="comment">
                    {(respones.response).split('\n').map((para, index) => {
                      return <p key={index}>{para}</p>
                    })}
                  </div>
                </section>
              )
            })
          }
        </div>
      </div>
    </div >
  )
};
