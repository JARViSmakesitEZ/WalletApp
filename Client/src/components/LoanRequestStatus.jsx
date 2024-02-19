import successImage from "../Images/operation_success.png";
import failureImage from "../Images/operation_failure.png";

function LoanRequestStatus(props) {
  return (
    <div className="modal-overlay">
      <img
        src={props.success ? successImage : failureImage}
        alt=""
        className="operation--status--img"
      />
      <div className="operation card operation--status">
        <p id="operation--status--msg">{props.msg}</p>
      </div>

      <button
        className="operation--status--closeButton"
        onClick={() => props.setRequestStatus("")}
      >
        close
      </button>
    </div>
  );
}

export default LoanRequestStatus;
