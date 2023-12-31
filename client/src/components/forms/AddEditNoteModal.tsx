import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../../models/notes";
import * as NotesApi from "../../network/notesApi";
import { NoteInput } from "../../types";
import TextInputField from "./TextInputField";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddEditNoteDialogProps = {
  noteToEdit?: Note | null;
  onClose: () => void;
  onSave: (note: Note) => void;
};

export default function AddEditNoteDialog({
  noteToEdit,
  onClose,
  onSave,
}: AddEditNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  const queryClient = useQueryClient();

  const postNotesMutation = useMutation({
    mutationFn: NotesApi.postNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({
      noteToEdit,
      input,
    }: {
      noteToEdit: Note;
      input: NoteInput;
    }) => NotesApi.updateNote(noteToEdit._id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      const note: Note | any = noteToEdit
        ? updateNotesMutation.mutate({ noteToEdit, input })
        : postNotesMutation.mutate(input);
      onSave(note);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Update Note" : "Add Note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Enter title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Enter text"
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
