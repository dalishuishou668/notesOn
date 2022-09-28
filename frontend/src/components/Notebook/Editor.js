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
            // [{ script: "super" }, { script: "sub" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            // ["link", "image", "video"],
            // ["direction", { align: [] }],
            ["clean"],
        ],
    };

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        // [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
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
                // minHeight: "495px",
                height: "91%",
                width: "99%",
                outline: "none",
            }}
        />
    );
}

export default Editor;
