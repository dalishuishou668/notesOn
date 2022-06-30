{show ? (
    <>
        <div className='createNoteFormContainer'>
            <form onSubmit={onSubmit} className='createNote'>
                <div>
                    <ul className="errors">
                        {errors3.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <input
                    className='createTitleInput'
                    type='text'
                    placeholder=' note title'
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                >
                </input>
                <input
                    className='createContentInput'
                    type='text'
                    placeholder='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                >
                </input>
                <button className='createNoteBtn' type='submit' disabled={!!errors3.length}>Create New Note</button>
            </form>
        </div>

    </>
) : (
    <></>
)}

//
<div className='allNotesFromSingleNotebookContainer'>
                    {notesArr && notesArr.map(note => {
                        if (realNote.id === note.id) {
                            return (
                                <ul className='container1'>
                                    <li
                                        className='selected'
                                        id={note.id}
                                        key={note.id}
                                        onClick={() => {
                                            setRealNote(note);
                                            setRealNoteTitle(note.title);
                                            setRealNoteContent(note.content);
                                            setView(true)
                                        }}
                                    >
                                        <div className='notetitle1'>{note?.title}</div>
                                        <div className='notecontent1'>{note?.content}</div>

                                    </li>
                                    <button onClick={(e) => deleteSubmit(e, note.id)} className='deleteNoteBtn'>Delete</button>
                                </ul>
                            )
                        } else {
                            return (
                                <ul>
                                    <li
                                        className='notSelected'
                                        id={note.id}
                                        key={note.id}
                                        onClick={() => {
                                            // setInputView(true);
                                            setRealNote(note)
                                            setRealNoteTitle(note.title);
                                            setRealNoteContent(note.content)
                                        }}
                                    >
                                        {note.title}
                                        <div></div>
                                        {note.content}
                                    </li>
                                </ul>
                            )
                        }
                    })}
                </div>
