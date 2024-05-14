import { StyleSheetManager } from "styled-components";

import { BrowserRouter as Router } from "react-router-dom";

import AccessRoutes from "./AccessRoutes";

const Navigator = () => {
  const shouldForwardProp = (prop: string): boolean => {
    return !["gap", "w", "h", "mt", "mb", "ml", "mr", "pd", "bg"].includes(
      prop
    );
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Router>
        <AccessRoutes />
      </Router>
    </StyleSheetManager>
  );
};

export default Navigator;
