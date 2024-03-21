// DisableBackButton.js
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const DisableBackButton = () => {
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === "POP") {
        return false;
      }
    });

    return () => {
      unblock();
    };
  }, [history]);

  return null;
};

export default DisableBackButton;
