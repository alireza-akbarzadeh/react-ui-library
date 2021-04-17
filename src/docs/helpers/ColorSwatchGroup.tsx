import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { textToClipboard } from 'utils/clipboard';
import { ClipboardIcon } from 'icons/internal/ClipboardIcon';
import { Flex, FlexProps } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { StyledIconToast, ToastContext } from 'compositions/Toast';

const SwatchBlock = styled.div<{
  backgroundColor: string;
  color?: string;
  height?: number;
  rounded?: boolean;
  width?: number;
}>`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => (props.rounded ? '4px' : '0')};
  color: ${props => props.color || 'currentColor'};
  cursor: pointer;
  display: flex;
  height: ${props => `${props.height}px`};
  justify-content: center;
  position: relative;
  width: ${props => `${props.width}px`};

  > svg {
    pointer-events: none;
  }
`;

export type Color = {
  id: string;
  color: string;
  contrast?: string;
};

export interface ColorSwatchGroupProps {
  children?: React.ReactNode;
  colors: Color[];
  direction?: FlexProps['direction'];
  joined?: boolean;
  withIcon?: boolean;
  swatchWidth?: number;
  swatchHeight?: number;
}

export function ColorSwatchGroup({
  children,
  colors,
  direction = 'row',
  joined,
  swatchWidth = 40,
  swatchHeight = 60,
  ...props
}: ColorSwatchGroupProps): React.ReactElement {
  const { createNotification } = useContext(ToastContext);

  const handleClick = (id: string, color: string, contrast?: string) => {
    textToClipboard(id);
    createNotification(
      <StyledIconToast
        title="Copied to clipboard"
        icon={ClipboardIcon}
        levelColor={color}
        levelInverseColor={contrast}
        variant="colored"
      >
        The color ID <strong>{id}</strong> has been copied to your clipboard.
      </StyledIconToast>,
    );
  };

  return (
    <Flex direction={direction} {...props}>
      {colors.map(({ color, contrast, id }) => (
        <Rhythm key={id} m={joined ? 0 : 1}>
          <SwatchBlock
            backgroundColor={color}
            color={contrast}
            rounded={!joined}
            title={`${id} ${color}`}
            width={swatchWidth}
            height={swatchHeight}
            onClick={() => handleClick(id, color, contrast)}
          >
            {children}
          </SwatchBlock>
        </Rhythm>
      ))}
    </Flex>
  );
}