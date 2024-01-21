export function StudyplanItem({ id, name, deleteStudyplan, color }) {
  return (
    <div>
      <label style={{ backgroundColor: color }} className="highlightedText">
        {name}
      </label>
      <button onClick={() => deleteStudyplan(id)} className="btn btn-dange">
        Delete
      </button>
    </div>
  );
}
