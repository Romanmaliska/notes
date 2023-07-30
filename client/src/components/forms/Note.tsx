import styles from "../../styles/note.module.css";
import { Button, Card } from "react-bootstrap";
import { Note as NoteModel } from "../../models/notes";
import { formatDate } from "../../utils/formateDate";
import {
  MdDeleteOutline,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";

type NoteProps = {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
};

export default function Note({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
}: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  const dateText =
    createdAt < updatedAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;

  return (
    <Card className={`${styles.note}`}>
      <Card.Body className={styles.body}>
        <Card.Header className={styles.header}>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Button
            className="btn btn-warning btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onNoteClicked(note);
            }}
          >
            <MdOutlineDriveFileRenameOutline className="ms-auto mx-2"></MdOutlineDriveFileRenameOutline>
            Update
          </Button>
          <Button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNoteClicked(note);
            }}
          >
            <MdDeleteOutline className="ms-auto mx-2"></MdDeleteOutline>
            Delete
          </Button>
        </Card.Header>
        <Card.Text>{text}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-muted">{dateText}</Card.Footer>
    </Card>
  );
}
