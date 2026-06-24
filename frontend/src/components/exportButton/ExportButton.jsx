import "./ExportButton.css";

function ExportButton({ buttonLabel, onClick }) {
  return (
    <div>
      <button className="exportButton" type="button" onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default ExportButton;
