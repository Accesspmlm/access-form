//Types
import { TypesText } from '@/types';

export const manageTextSize = (type: TypesText, size: string | undefined) => {
  if (size) {
    return size;
  }
  const sizes = {
    'display-1': '61.04px',
    'display-2': '48.83px',
    'heading-xxl': '39.06px',
    'heading-xl': '31.25px',
    'heading-l': '25px',
    'heading-m': '20px',
    'heading-s': '16px',
    'body-regular': '16px',
    'body-small': '12.80px',
    'body-xsmall': '10.24px',
    'title-medium': '16px',
    'title-small': '12.80px',
    'title-xsmall': '10.24px',
    'caps-medium': '16px',
    'caps-small': '12.80px',
    'caps-xsmall': '10.24px',
  };
  return sizes[type];
};

export const manageFontWeight = (type: TypesText, weight: string | undefined) => {
  if (weight) {
    return weight;
  }
  const weights = {
    'display-1': 700,
    'display-2': 700,
    'heading-xxl': 700,
    'heading-xl': 700,
    'heading-l': 700,
    'heading-m': 700, //600
    'heading-s': 600,
    'body-regular': 400,
    'body-small': 400,
    'body-xsmall': 400,
    'title-medium': 600,
    'title-small': 600,
    'title-xsmall': 600,
    'caps-medium': 400,
    'caps-small': 400,
    'caps-xsmall': 400,
  };
  return weights[type];
};

export const manageFontFamily = (type: TypesText, family: string | undefined) => {
  if (family) {
    return family;
  }
  const familys = {
    'display-1': 'Poppins',
    'display-2': 'Poppins',
    'heading-xxl': 'Poppins',
    'heading-xl': 'Poppins',
    'heading-l': 'Poppins',
    'heading-m': 'Poppins',
    'heading-s': 'Poppins',
    'body-regular': 'Inter',
    'body-small': 'Inter',
    'body-xsmall': 'Inter',
    'title-medium': 'Poppins',
    'title-small': 'Poppins',
    'title-xsmall': 'Poppins',
    'caps-medium': 'Poppins',
    'caps-small': 'Poppins',
    'caps-xsmall': 'Poppins',
  };
  return familys[type];
};
