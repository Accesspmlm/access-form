import { CSSProperties } from 'styled-components';

import { TypesText } from '@/types';

interface BaseTextProps {
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  pd?: string;
  bg?: string;
  h?: string;
  w?: string;
  size?: string;
  weight?: string;
  family?: string;
  textAlign?: string;
  truncate?: boolean;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  bigger?: string;
  color?: string;
  display?: string;
  textDecoration?: string;
}

export interface TextContainerProps extends BaseTextProps {
  type: TypesText;
  white_space: string;
  overflow: string;
  text_overflow: string;
}

export interface TextProps extends BaseTextProps {
  clave?: string;
  type?: TypesText;
  id?: string;
  style?: CSSProperties;
}
