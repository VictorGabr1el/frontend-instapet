import { useState } from "react";
import { inprogress } from "../../img";
import "../../styles/inprogress.css";

export const InProgress = () => {
  const [InProgressVisivle, setInProgressVisible] = useState(false);

  function IsInProgress(boolean) {
    setInProgressVisible(boolean);
  }

  const ComponentInPorgress = () => {
    return InProgressVisivle ? (
      <>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "content-box",
            transform: "translate(-36%, 0%)",
          }}
        >
          <img
            style={{
              width: "35px",
              height: "35px",
              animation: "loading 1s linear infinite 0ms",
            }}
            src={inprogress}
          />
        </div>
      </>
    ) : null;
  };

  return {
    ComponentInProgress: ComponentInPorgress && ComponentInPorgress,
    IsInProgress,
  };
};
