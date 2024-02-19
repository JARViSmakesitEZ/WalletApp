import successImage from "../Images/operation_success.png";
import failureImage from "../Images/operation_failure.png";
import { Navigate, useNavigate } from "react-router-dom";

function SignupOperationStatus(props) {
  const navigate = useNavigate();
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
        className="closeButton littleLeft"
        onClick={() => {
          props.success ? navigate("/login") : navigate("/");
        }}
      >
        {props.btnText}
      </button>
    </div>
  );
}

export default SignupOperationStatus;
