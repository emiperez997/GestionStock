import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";

function Alert({ status, children, setAlert }) {
  const bgStatus = {
    success: "bg-green-400 text-white",
    error: "bg-red-400 text-white",
    warning: "bg-yellow-400 text-white",
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg w-80 my-2 p-5 ${bgStatus[status]}`}
    >
      <div className="flex gap-3 items-center">
        <AlertIcon status={status} />
        {children}
      </div>
      <button onClick={() => setAlert(null)}>
        <FaTimes className="w-5 h-5" />
      </button>
    </div>
  );
}

function AlertIcon({ status }) {
  switch (status) {
    case "success":
      return <FaCheckCircle className="w-5 h-5" />;
    case "error":
      return <FaExclamationCircle className="w-5 h-5" />;
    case "warning":
      return <FaExclamationTriangle className="w-5 h-5" />;
    default:
      return <FaCheckCircle className="w-5 h-5" />;
  }
}

export { Alert };
