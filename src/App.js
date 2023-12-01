import "./App.css";
import { useState, useEffect } from "react";


const App = () => {
  const [notes, setNotes] = useState  ();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDeadlineCrossed, setIsDeadlineCrossed] = useState(false);

    const handleNoteClick = (note) => {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
      setDeadline(note.deadline);
    };
    

    const handleAddNote = (event) => {
      event.preventDefault();

    const newNote = {
      id: notes.length + 1,
      title: title,
      content: content,
      deadline: deadline, 
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setDeadline("");
    setContent("");
    };

    const handleUpdateNote = (event) => {
      event.preventDefault();

      if(!selectedNote){
        return;
      }
      
      const updatedNote = {
        id: selectedNote.id,
        title: title,
        content: content,
        deadline: deadline,
      };

      const updatedNoteList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

      setNotes(updatedNoteList);
      setTitle("");
      setDeadline("");
      setContent("");    
      setSelectedNote(null);
      
    };

    const handleCancel = () => {
      setTitle("");
      setDeadline("");
      setContent("");
      setSelectedNote(null);
    };

    const deleteNote = (event, noteId) => {
      event.stopPropagation();

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    };
     
    useEffect(() => {
      checkDeadline();
    }, [deadline]);

    function checkDeadline() {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      if (deadlineDate < now) {
        setIsDeadlineCrossed(true);
      } else {
        setIsDeadlineCrossed(false);
      }
    }

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
      <div className={`note ${isDeadlineCrossed ? "deadline-crossed" : ""}`}></div>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
      ></input>
      <input
         type="date"
         value={deadline}
         onChange={(event) => setDeadline(event.target.value)}
        ></input>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Content"
        rows={10}
        required
      ></textarea>
      {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
      </form>
      <div className="notes-grid">
        {notes?.map((note) => (
          <div 
          className="note-item"
          onClick={()=> handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
           <h2>{note.title}</h2>
           <div className="deadline">{note.deadline}</div>
           <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;