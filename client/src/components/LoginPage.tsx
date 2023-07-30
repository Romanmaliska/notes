import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/notes";
import * as NotesApi from "../network/notesApi";
import stylesUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./forms/AddEditNoteModal";
import Note from "./forms/Note";

export default function LoginPage() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setNotesLoading(true);
        setShowNotesLoadingError(false);

        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (err) {
        setShowNotesLoadingError(true);
        console.error(err);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddEditNoteDialog(true)}

      >
        <FaPlus />
        Add New Note
      </Button>
      {notesLoading && (
        <Spinner
          animation="border"
          variant="primary"
          className={` ${stylesUtils.blockCenter}`}
        />
      )}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note
                key={note._id}
                note={note}
                onDeleteNoteClicked={deleteNote}
                onNoteClicked={setNoteToEdit}
              />
            </Col>
          ))}
        </Row>
      )}
      {showAddEditNoteDialog && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onClose={() => setShowAddEditNoteDialog(false)}
          onSave={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddEditNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onClose={() => {
            setNoteToEdit(null);
          }}
          onSave={(newNote) => {
            setNotes(notes.map((n) => (n._id === newNote._id ? newNote : n)));
            setNoteToEdit(null);
          }}
        />
      )}
    </section>
  );
}
