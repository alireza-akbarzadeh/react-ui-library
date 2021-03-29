import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { SvgIconProps } from '../../types/svgIcon';
import { useIconSize } from '../../hooks/useIconSize';

export function LightOnIcon({ title, titleId = uuid(), ...initProps }: SvgIconProps): React.ReactElement<SVGElement> {
  const props = useIconSize(initProps);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-labelledby={titleId} {...props}>
      {title === undefined ? (
        <title id={titleId}>{'Light on'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <g fill="currentColor">
        <path d="M24.22 15.11c0 2.3-1 4.52-2.72 6.09-.03.02-.06.05-.09.08-1.3 1.3-1.15 4.08-1.15 4.11 0 .15-.06.3-.15.39a.49.49 0 01-.35.15h-7.54c-.12 0-.27-.06-.36-.15a.525.525 0 01-.14-.39c.03-.03.14-2.81-1.16-4.11a8.282 8.282 0 01-2.78-6.17c0-4.53 3.7-8.22 8.22-8.22 4.53 0 8.22 3.69 8.22 8.22zm-1.03-.03c0-3.99-3.23-7.22-7.22-7.22-3.99 0-7.21 3.23-7.21 7.22 0 2.1.92 4.08 2.48 5.44 1.24 1.27 1.45 3.4 1.48 4.37h6.53c.03-.97.24-3.01 1.39-4.26 0-.03.06-.08.09-.11 1.57-1.36 2.46-3.34 2.46-5.44z" />
        <path d="M15.9 8.91c-.27 0-.5.24-.5.51 0 .26.23.5.5.5 2.98 0 5.38 2.42 5.38 5.38 0 .26.24.5.5.5.27 0 .5-.24.5-.5.03-3.52-2.83-6.39-6.38-6.39zM20.5 27.73c0 .68-.57 1.21-1.28 1.24h-6.53c-.68 0-1.24-.56-1.24-1.24 0-.68.56-1.24 1.24-1.24h6.56c.68 0 1.25.56 1.25 1.24zm-1.04-.03c0-.15-.12-.24-.24-.24h-6.53c-.15 0-.24.09-.24.24s.12.24.24.24h6.56c.12 0 .21-.09.21-.24zM19.52 30.71c0 .68-.56 1.25-1.24 1.25h-4.61c-.68 0-1.24-.57-1.24-1.25s.56-1.24 1.24-1.24h4.61c.68 0 1.24.53 1.24 1.24zm-1.01-.03c0-.14-.11-.23-.23-.23h-4.61c-.15 0-.24.09-.24.23 0 .15.12.24.24.24h4.61c.12 0 .23-.09.23-.24z" />
      </g>
      <g fill="currentColor">
        <path d="M29.25 7.89c-.12-.23-.45-.32-.68-.2l-3.02 1.62c-.24.12-.32.45-.21.68a.495.495 0 00.68.21l3.02-1.63c.24-.12.32-.44.21-.68zM24.34 2.54c-.24-.18-.53-.09-.68.12L21.77 5.5a.49.49 0 00.11.71c.09.06.18.09.27.09.18 0 .33-.09.41-.24l1.9-2.84c.17-.2.11-.53-.12-.68zM15.97 4.43c.3 0 .51-.23.51-.5V.5c0-.26-.24-.5-.51-.5-.26 0-.5.24-.5.5v3.43c0 .27.24.5.5.5zM9.97 6.18c.09 0 .18-.03.27-.09.23-.15.29-.47.15-.71L8.55 2.51c-.15-.23-.47-.29-.71-.15-.23.15-.29.48-.14.71l1.83 2.87c.12.18.26.24.44.24zM6.39 9.31L3.41 7.69c-.24-.12-.56-.03-.68.2-.15.24-.06.56.21.68l2.98 1.63c.09.03.15.06.24.06.18 0 .35-.09.44-.27.12-.23.03-.56-.21-.68z" />
      </g>
    </svg>
  );
}
