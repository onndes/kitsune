import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface MyButtonProps extends Omit<ButtonProps, 'color'> {
  text?: string;
  textColor?: string | false; // Дополнительное свойство для пользовательского цвета текста
  upperCase?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';
}

const MyButton: React.FC<MyButtonProps> = ({
  text = 'Button',
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'large',
  textColor = false,
  fullWidth = false,
  upperCase = false,
  sx = {},
  ...otherProps
}) => {
  const checkColor = variant === 'contained' ? 'white' : 'text.primary';
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      sx={{
        padding: 1,
        width: fullWidth ? '100%' : 'initial',
        color: textColor || checkColor,
        textTransform: upperCase ? 'uppercase' : 'initial',
        textDecoration: 'none',
        fontSize: '14px',
        ...sx,
      }}
      {...otherProps}
    >
      {text}
    </Button>
  );
};

export default MyButton;
