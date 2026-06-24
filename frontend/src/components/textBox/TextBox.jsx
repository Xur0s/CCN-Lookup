import "./TextBox.css";

function TextBox({ type, value, onChange, placeholder }) {
  return (
    <div className="textBox">
      <input
        className="textInput"
        type={type}
        value={value}
        onChange={(c) => onChange(c.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextBox;
