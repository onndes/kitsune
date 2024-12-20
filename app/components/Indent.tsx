'use client';

import { styled } from '@mui/material';

interface StyledIndentProps {
  bottom?: boolean; // Указываем, что bottom - необязательный пропс
}

const StyledIndent = styled('div')<StyledIndentProps>(({ bottom }) => ({
  paddingTop: !bottom ? '77px' : undefined,
}));

export default function Indent({ bottom }: { bottom?: boolean }) {
  return <StyledIndent bottom={bottom} />;
}
