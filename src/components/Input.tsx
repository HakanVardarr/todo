import "./styles/Input.css";

type Props = {
  onClick: (newTodo: string) => void;
};

export default function Input({ onClick }: Props) {
  const handleButtonClick = () => {
    const input = document.getElementById("input") as HTMLInputElement;
    const value = input.value;
    if (value !== "") {
      onClick(value);
      input.value = "";
    }
  };

  return (
    <>
      <div className="Input">
        <input
          className="input"
          id="input"
          type="text"
          placeholder="Enter a Todo..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleButtonClick();
          }}
        />
        <button className="button" onClick={handleButtonClick}>
          Submit
        </button>
      </div>
    </>
  );
}
