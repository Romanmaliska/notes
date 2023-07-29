import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { formatDate } from "../utils/formateDate";
import { MdDelete } from "react-icons/md";

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
    <Card
      className={`${styles.card}`}
      onClick={() => {
        onNoteClicked(note);
      }}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}{" "}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNoteClicked(note);
            }}
          ></MdDelete>
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{dateText}</Card.Footer>
    </Card>
  );
}
