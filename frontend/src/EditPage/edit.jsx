import { WriteStoryHeader } from "../HomePage/writeStory";
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import EditorJS from '@editorjs/editorjs';
import Code from '@editorjs/code';
import { useContext, useEffect, useRef } from 'react';
import { idContext, savedContext, storyContext } from "../App";
import Delimiter from "@editorjs/delimiter";

const Editor = ({ setIsSaved }) => {
  const editorInstance = useRef(null);
  const story = useContext(storyContext);
  const currentStoryId = useContext(idContext);
  const draftTitle = story === undefined ? <h1>not available</h1> : {
    type: "header", data: { text: story[0].draft.title }
  };
  const result = story === undefined ? <h1>not available</h1> : story[0].draft.content.map((line) => {
    return line;
  })
  result.unshift(draftTitle);

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
        blocks: result
      },
      onChange: async () => {
        const data = await editorInstance.current.save();
        setIsSaved('Saving...');
        setTimeout(() => setIsSaved('Saved'), 500)
        const removeFirstIndex = data.blocks.slice(1, data.blocks.length);
        const editObj = ({
          storyId: currentStoryId[0],
          title: data.blocks[0].data.text,
          content:
          removeFirstIndex.map((value, index) => {
              return ({
                type: removeFirstIndex[index].type,
                data: removeFirstIndex[index].data,
              })
            })
        })
        // if (Object.keys(editStory).length === 0) return;
        await fetch('http://localhost:8000/story', {
          method: "PUT",
          credentials: "include",
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editObj),
        });
      }
    });
    return (() => setIsSaved(''));
  }, []);

  return (
    <>
      <div id="editorjs" className="editorjs-content"></div>
    </>
  )
}

const Edit = () => {
  const [isSaved, setIsSaved] = useContext(savedContext);
  return (
    <>
      <WriteStoryHeader isSaved={isSaved} />
      <div className='write-story-body'>
        <Editor setIsSaved={setIsSaved} />
      </div>
    </>
  )
}

export { Edit }