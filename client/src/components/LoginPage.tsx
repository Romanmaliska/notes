import { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/notes";
import * as NotesApi from "../network/notesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import stylesUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./forms/AddEditNoteModal";
import Note from "./note/Note";

export default function LoginPage() {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: NotesApi.getNotes,
  });

  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (note: NoteModel) => NotesApi.deleteNote(note._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <section>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddEditNoteDialog(true)}
      >
        <FaPlus />
        Add New Note
      </Button>
      {isLoading && (
        <Spinner
          animation="border"
          variant="primary"
          className={` ${stylesUtils.blockCenter}`}
        />
      )}
      {isError && <h2>Something went wrong. Please refresh the page.</h2>}
      {!isLoading && !isError && (
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note
                key={note._id}
                note={note}
                onDeleteNoteClicked={() => deleteNoteMutation.mutate(note)}
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
          onSave={() => {
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
          onSave={() => {
            setNoteToEdit(null);
          }}
        />
      )}
    </section>
  );
}
