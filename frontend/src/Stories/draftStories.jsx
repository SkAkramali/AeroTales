import '../HomePage/home.css';
import { useOutletContext } from "react-router-dom";

const DraftStories = () => {
  const { draftStories } = useOutletContext();
  return (
    <div className='user-stories'>
      {draftStories.length === 0 ? <h2>No Drafts. Click on write a Story to create a story</h2> : draftStories}
    </div>
  )
};

export { DraftStories };
