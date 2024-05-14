import React from "react";

//Elements
import { StyledText } from "./styles";
//Types
import { TextProps } from "./types";

const Text: React.FC<TextProps> = ({
  type = "body-regular",
  clave = "",
  truncate = false,
  id,
  ...props
}) => {
  return (
    <StyledText
      id={id}
      type={type}
      overflow={truncate ? "hidden" : "visible"}
      white_space={truncate ? "nowrap" : "normal"}
      text_overflow={truncate ? "ellipsis" : "clip"}
      {...props}
    >
      {clave}
    </StyledText>
  );
};

export default Text;
