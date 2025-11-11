import './home.css';
import { savedContext, userDataContext } from '../App';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import EditorJS from '@editorjs/editorjs';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import { useContext, useState, useEffect, useRef } from 'react';
import { MediumTitle, Profile } from './home';
import { idContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './publishInfo.css'

const EditorComponent = ({ currentId, setIsSaved }) => {
  const editorInstance = useRef(null);
  useEffect(() => {
    editorInstance.current = new EditorJS({
      holder: 'editorjs',
      tools: {
        code: Code,
        delimiter: Delimiter,
        header: {
          class: Header,
          config: {
            placeholder: 'Title',
          },
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'Tell your story...',
          },
        },
      },
      autofocus: true,
      data: {
        blocks: [
          {
            id: 0,
            type: "header",
            data: {
              text: '',
              level: 1,
            }
          }
        ],
      },
      onChange: async () => {
        const data = await editorInstance.current.save();
        setIsSaved('Saving...');
        setTimeout(() => setIsSaved('Saved'), 500);
        const removeFirstIndex = data.blocks.slice(1, data.blocks.length);
        const obj = ({
          storyId: currentId.current,
          title: (data.blocks[0].data.text === undefined ? 'Untitled' : data.blocks[0].data.text),
          content:
            removeFirstIndex.map((value, index) => {
              return ({
                type: removeFirstIndex[index].type,
                data: removeFirstIndex[index].data,
              })
            })
        })
        console.log(obj);
        const response = await fetch('http://localhost:8000/story', {
          method: "PUT",
          credentials: "include",
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        const responseData = await response.json();
        currentId.current = responseData.storyId;
      }
    });
    return (() => setIsSaved(''));
  }, []);

  return (
    <>
      <div id="editorjs" className="editorjs-content"></div>
    </>
  )
};

const WriteStoryBody = ({ currentId, setIsSaved }) => {
  return (
    <div className='write-story-body'>
      <EditorComponent currentId={currentId} setIsSaved={setIsSaved} />
    </div>
  )
};

const WriteStoryHeader = ({ currentId, isSaved }) => {
  const userData = useContext(userDataContext);
  const [popup, setPopup] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const editId = useContext(idContext);
  // const [imgUrl, setImgUrl] = useState('');
  const showPopup = () => {
    setPopup(true);
  }
  const closePopup = () => {
    setPopup(false);
  }
  console.log(userData)
  const handlePublish = async (currentId) => {
    const formData = new FormData();
    formData.append('tags', tags);
    // formData.append('cover_image_name', imgUrl);
    const id = (editId === undefined) ? currentId.current : editId[0];
    const presentId = (id === undefined) ? currentId.current : id;
    const response = await fetch(`http://localhost:8000/story/${presentId}/publish`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (response) {
      navigate(`/storypage/${presentId}`, {
        state: {
          id: presentId,
        }
      })
    }
    // console.log(imgUrl)
    console.log(tags)
    closePopup();
  };
  // const handleImageUrl = (event) => {
  //   setImgUrl(event.target.value);
  // }
  const handleTags = (event) => {
    const inputTags = event.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    if (inputTags.length <= 5) {
      setTags(inputTags);
      setTagInput(event.target.value);
      setNote('');
    } else {
      setNote("You can only add a maximum of 5 tags.");
    }
  }
  return (
    <>
      <header className='write-story-header'>
        <div className='medium-draft-div'>
          <MediumTitle />
          {userData[0] !== undefined ? <p>Draft in {userData[0].name}</p> : null}
          <p className='saved'>{isSaved}</p>
        </div>
        <div className='publish-profile'>
          <button id='publish-btn' onClick={showPopup}>Publish</button>
          <Profile />
        </div>
        {popup && <div className='addTagsPopup'>
          {
            <div className="storyPreview">
              <button className='POPCloseButton' onClick={closePopup}>X</button>
              <h1>Story Preview</h1>
              <div className="extraInformation">
                <label htmlFor="tags">Add Tags: </label>
                <p className='note'>{note}</p>
                <input id="tags" type="text" value={tagInput} onChange={handleTags} placeholder="ex: tech,science"></input>
                {/* <label htmlFor="image">CoverImage: </label> */}
                {/* <input id='image' type="file" value={imgUrl} onChange={handleImageUrl}></input> */}
                <button id='publish-btn' onClick={() => { handlePublish(currentId) }}>publish</button>
              </div>
            </div>
          }
        </div>}
      </header>
    </>
  )
}


const WriteStory = () => {
  const [isSaved, setIsSaved] = useContext(savedContext);
  const id = useRef(0);
  return (
    <>
      <WriteStoryHeader currentId={id} isSaved={isSaved} />
      <WriteStoryBody currentId={id} setIsSaved={setIsSaved} />
    </>
  )
};

export { WriteStory, WriteStoryHeader }
