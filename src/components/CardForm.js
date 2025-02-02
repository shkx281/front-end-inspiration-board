import "./cardform.css";
import { useState } from "react";

function CardForm(props) {
  const defaultCard = {
    message: "",
    board_id: 0,
  };

  const [formData, setFormData] = useState(defaultCard);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;
    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;
    newFormData["board_id"] = props.board_id;
    setFormData(newFormData);
    if (
      newFormData.message === "" ||
      newFormData.message.length > 40 ||
      newFormData.board_id === 0
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addCardCallback(formData);
    setFormData(defaultCard);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={onFormChange}
      ></input>
      <input
        type="submit"
        value="Add Card"
        disabled={disableSubmit}
        className="submit"
      ></input>
    </form>
  );
}

// CardForm.propTypes = {
//   addCardCallback: PropTypes.func.isRequired,
// };

export default CardForm;
