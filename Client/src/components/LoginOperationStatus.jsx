import failureImage from "../Images/operation_failure.png";
import { useNavigate } from "react-router-dom";

function LoginOperationStatus(props) {
  console.log("i just got hit");
  const navigate = useNavigate();
  return (
    <div className="modal-overlay">
      {/* <div> */}
      <img
        src={failureImage}
        alt=""
        className="operation--status--img bitmore--img"
      />
      <div className="operation card operation--status bitmore--operation">
        <p id="operation--status--msg">{props.msg}</p>
      </div>
      <button
        className="closeButton littleLeft bitmore--btn1"
        onClick={() => {
          navigate("/login");
          props.setOperationState("");
        }}
      >
        try again
      </button>
      <button
        className="closeButton littleDown bitmore--btn2"
        onClick={() => {
          props.setOperationState("");
          navigate("/");
        }}
      >
        back to home page
      </button>
    </div>
  );
}

export default LoginOperationStatus;
