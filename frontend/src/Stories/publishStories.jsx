import '../HomePage/home.css';
import { useOutletContext } from "react-router-dom";

const PublishStories = () => {
  const { publishStories } = useOutletContext();
  return (
    <div className='user-stories'>
      {publishStories.length === 0 ? <h2>No PublishedStories. Click on write a Story to create a story</h2> : publishStories}
    </div>
  )
};

export { PublishStories };
