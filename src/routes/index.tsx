import { StyleSheetManager } from "styled-components";

import { BrowserRouter  } from "react-router-dom";

import AccessRoutes from "./AccessRoutes";

const Navigator = () => {
  const shouldForwardProp = (prop: string): boolean => {
    return !["gap", "w", "h", "mt", "mb", "ml", "mr", "pd", "bg"].includes(
      prop
    );
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <BrowserRouter basename="/access-form">
        <AccessRoutes />
      </BrowserRouter>
    </StyleSheetManager>
  );
};

export default Navigator;
