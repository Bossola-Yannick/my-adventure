import { UsePersistedState } from "../../hooks/usePersistedState";
import { handleInputChange } from "../../utils/handleInputChange";
export default function LsNotes() {
  const [chapter, setChapter] = UsePersistedState("ls-chapter", 0);
  const [notes, setNotes] = UsePersistedState("ls-notes", [""]);
  const [titleBook, setTitleBook] = UsePersistedState("ls-book", "");
  // Gérer la modification d'une note
  const handleNoteChange = (index) => (e) => {
    const newNotes = [...notes];
    newNotes[index] = e.target.value;
    setNotes(newNotes);
  };
  // ajouter une nouvelle note
  const addNote = () => {
    setNotes([...notes, ""]);
  };
  // supprimer une note
  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };
  return (
    <section>
      <h3 className="df-title">Mes Notes</h3>
      <article className="ls-book">
        <label htmlFor="title-book">Titre du livre : </label>
        <input
          type="text"
          name="title-book"
          id="title-book"
          value={titleBook}
          onChange={handleInputChange(setTitleBook, "text")}
        />
      </article>
      <article className="ls-chapter">
        <label htmlFor="chapter">Chapitre en cours :</label>
        <input
          type="number"
          name="chapter"
          id="chapter"
          value={chapter}
          onChange={handleInputChange(setChapter, "number")}
        />
      </article>
      <section className="ls-notes">
        <h5 className="ls-notes-title">Notes :</h5>
        <ul>
          {notes.map((note, i) => (
            <li key={i}>
              <input
                className="ls-list"
                type="text"
                name={`note-${i}`}
                value={note}
                onChange={handleNoteChange(i)}
              />
              <span className="ls-delete-note" onClick={() => deleteNote(i)}>
                X
              </span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addNote} className="ls-note-button">
          Ajouter une note
        </button>
      </section>
    </section>
  );
}
