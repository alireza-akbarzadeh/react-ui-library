import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import styles from './styles/Banner.module.css';

export interface BannerContainerProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children: React.ReactNode;
  className?: string;
}

export function BannerContainer({
  children,
  className,
  themeId,
  ...props
}: BannerContainerProps): React.ReactElement<HTMLDivElement> {
  return (
    <div className={cx(styles.bannerContainer, themeId && styles[`bannerContainer--${themeId}`], className)} {...props}>
      {children}
    </div>
  );
}
