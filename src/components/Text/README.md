# Text Component

The `Text` component is used to display text elements with customizable properties such as color, size, weight, font family, and more.

## Props

### Base Text Props

- `mt`, `mb`, `ml`, `mr` (string, optional): Margins for the text element.
- `pd` (string, optional): Padding for the text element.
- `bg` (string, optional): Background color for the text element.
- `h` (string, optional): Height for the text element.
- `w` (string, optional): Width for the text element.
- `size` (string, optional): Font size for the text element.
- `weight` (string, optional): Font weight for the text element.
- `family` (string, optional): Font family for the text element.
- `textAlign` (string, optional): Text alignment for the text element.
- `truncate` (boolean, optional): Flag to enable text truncation.
- `sm`, `md`, `lg`, `xl`, `xxl`, `bigger` (string, optional): Responsive sizes for different screen sizes.
- `color` (string, optional): Text color for the text element.
- `display` (string, optional): Display property for the text element.

### TextContainer Props

- `type` (TypesText): Type of text ('display-1', 'display-2', 'heading-xxl', etc.).

### Text Props

- `clave` (string, optional): Key used for translation.
- `type` (TypesText, optional): Type of text ('display-1', 'display-2', 'heading-xxl', etc.).

## Usage

```jsx
import React from "react";
import Text from "path-to-component/Text";

const ExampleComponent = () => {
  return (
    <Text
      color="#333"
      size="16px"
      weight="500"
      family="Arial, sans-serif"
      mt="10px"
      mb="10px"
      type="body-regular"
    >
      This is a sample text.
    </Text>
  );
};
```

## Types

### Enums

- `TypesText`: Defines various text types like 'display-1', 'heading-s', 'body-regular', etc.

### Interfaces

- `TextContainerProps`: Contains properties related to the text container.
- `TextProps`: Contains properties specific to the text element.
