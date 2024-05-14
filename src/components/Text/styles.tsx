import styled from "styled-components";

//Types
import { TextContainerProps } from "./types";
//Utils
import { manageFontFamily, manageFontWeight, manageTextSize } from "./utils";

export const StyledText = styled.p<TextContainerProps>`
  color: ${({ color }) => color || "white"};
  margin-top: ${({ mt }) => mt || "0px"};
  margin-bottom: ${({ mb }) => mb || "0px"};
  margin-left: ${({ ml }) => ml || "0px"};
  margin-right: ${({ mr }) => mr || "0px"};
  width: ${({ w }) => w || "fit-content"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  white-space: ${({ white_space }) => white_space};
  overflow: ${({ overflow }) => overflow};
  text-overflow: ${({ text_overflow }) => text_overflow};
  background: ${({ bg }) => bg || "none"};
  font-family: ${({ type, family }) => manageFontFamily(type, family)};
  font-weight: ${({ type, weight }) => manageFontWeight(type, weight)};
  font-size: ${({ type, size }) => manageTextSize(type, size)};
  display: ${({ display }) => display || "block"};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};

  @media (max-width: 575px) {
    ${({ sm }) => sm}
  }

  @media (min-width: 576px) and (max-width: 767px) {
    ${({ md }) => md}
  }

  @media (min-width: 768px) and (max-width: 991px) {
    ${({ lg }) => lg}
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    ${({ xl }) => xl}
  }

  @media (min-width: 1200px) {
    ${({ xxl }) => xxl}
  }

  @media (min-width: 1400px) {
    ${({ bigger }) => bigger}
  }
`;
