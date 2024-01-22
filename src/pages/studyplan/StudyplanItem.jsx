import { Link } from "react-router-dom";

export function StudyplanItem({ id, name, deleteStudyplan, color }) {
  return (
    <div>
      <label style={{ backgroundColor: color }} className="highlightedText">
        {name}
      </label>
      <button onClick={() => deleteStudyplan(id)} className="btn btn-dange">
        Löschen
      </button>
      <Link
        to={"/studyplan/studyplanedit/" + id}
        state={{ name: name }}
        className="btn"
      >
        Bearbeiten
      </Link>
    </div>
  );
}
