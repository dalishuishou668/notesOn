import ReactQuill from "react-quill";
import './Notebook.css'

function Editor({
    newNote,
    realNoteContent,
    newNoteContents,
    setNewNoteContents,
    setRealNoteContent,
}) {

    // console.log('in the rich text editor------------------------------')
    // console.log(' newNote:', newNote)
    // console.log('realnoteContent2:', realNoteContent)
    // console.log('setRealNoteContent:', setRealNoteContent)

    // console.log('newNote2:', newNote)
    // console.log('newNoteContents:', newNoteContents)
    // console.log('setNewNoteContents:', setNewNoteContents)



    const modules = {

        // toolbar: toolbarOptions,
        toolbar: [
            [{ size: [] }, "code-block"],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["clean"],
        ],
    };

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
    ];

    return (
        <ReactQuill
            toolbarOptions={toolbarOptions}
            modules={modules}
            placeholder="Start typing"
            theme="snow"
            type="text"
            className="quillBox"
            value={newNote === false ? realNoteContent : newNoteContents}
            onChange={
                newNote
                    ? (value) => setNewNoteContents(value)
                    : (value) => setRealNoteContent(value)
            }
            style={{
                outline: "none",
                height: "91%",
                width: "99%",
            }}
        />
    );
}

export default Editor;
