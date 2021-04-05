import { cx } from '@emotion/css';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SequentialVariant, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { useInitializer } from '../../hooks/useInitializer';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
  InteractiveGroupItemType,
} from '../../components/InteractiveGroup';
import { ListRegistryContext } from '../../components/ListRegistry/ListRegistryContext';
import { NavigationItem, NavigationItemProps } from './NavigationItem';
import styles from './styles/Navigation.module.css';

export interface InnerNavigationProps extends React.HTMLAttributes<HTMLElement>, ThemeProps {
  /** allowRightClickLinks will make each nav item a link only for the purpose of right clicking */
  allowRightClickLinks?: boolean;
  animated?: boolean;
  className?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
  highlightRadius?: number;
  /** triggerOnly can be ignored as it is handled by the interactive group system */
  items: Array<
    Omit<NavigationItemProps, 'children' | 'componentId' | 'key' | 'onClick' | 'variant' | 'vertical'> & {
      label: React.ReactNode;
      triggerOnly?: InteractiveGroupItemType['triggerOnly'];
    }
  >;
  selectedId: string;
  style?: React.CSSProperties;
  variant?: SequentialVariant;
  vertical?: boolean;
}

// this has to use HTMLElement because there is no HTMLNavElement
export const InnerNavigation = React.forwardRef<HTMLElement, InnerNavigationProps>(
  (
    {
      allowRightClickLinks,
      animated,
      className,
      fullHeight,
      fullWidth,
      highlightRadius,
      items,
      selectedId,
      style,
      themeId: initThemeId,
      unthemed,
      variant = 'primary',
      vertical,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<InnerNavigationProps, 'nav'> => {
    const ref = useRef<HTMLElement>(null!);
    const accessible = useAccessibility();
    const { getItem } = useContext(ListRegistryContext);
    const [, setContainerSize] = useState<string>();
    const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLElement>(ref);
    const themeId = useThemeId(initThemeId);
    const { componentId } = useComponentId();
    const { isInitialized } = useInitializer();

    const { focusedIndex, handleItemClick, setSelected } = useContext<
      InteractiveGroupContextValue<HTMLElement, HTMLDivElement>
    >(InteractiveGroupContext);

    const combineRefs = makeCombineRefs(ref, forwardedRef);

    const getSelectedCoords = (selectedId: string) => {
      if (animated && ref.current) {
        const item = getItem(selectedId);
        if (item) {
          const offset = ref.current && ref.current.getBoundingClientRect();
          const { left, top, width, height } = item.getBoundingClientRect();
          return {
            left: left - offset.left,
            top: top - offset.top,
            width,
            height,
          };
        }
      }
      return undefined;
    };

    // update the reducer from the selected ID passed; skip on the first run
    useEffect(() => {
      isInitialized('selectedId') && setSelected(selectedId);
    }, [setSelected, selectedId, isInitialized]);

    // update dummy state to force redraw; use a string because an array or object would trigger redraw every time
    const handleWindowResize = useCallback(() => {
      const rect = ref.current?.getBoundingClientRect();
      rect && setContainerSize(`${rect.width},${rect.height}`);
    }, [ref]);

    // a simple resize handler for window resize; for anything more complicated it's recommend to wrap this with sizeme
    useEffect((): (() => void) => {
      typeof window !== 'undefined' && window.addEventListener('resize', handleWindowResize);
      return () => {
        typeof window !== 'undefined' && window.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);

    const selectedCoords = getSelectedCoords(selectedId);

    return (
      <nav
        className={cx(
          styles.navigation,
          /* by checking for selectedCoords here it prevents animating in */
          animated && selectedCoords && styles['navigation--animated'],
          fullHeight && styles['navigation--fullHeight'],
          fullWidth && styles['navigation--fullWidth'],
          themeId && !unthemed && styles[`navigation--${themeId}`],
          variant && styles[`navigation--${variant}`],
          styles[`navigation--${vertical ? 'vertical' : 'horizontal'}`],
          accessible && styles['is-accessible'],
          focused && styles['is-focused'],
          className,
        )}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={combineRefs}
        style={
          {
            ...style,
            '--navigation-pseudo-item-position-left': selectedCoords && `${selectedCoords.left}px`,
            '--navigation-pseudo-item-position-width': selectedCoords && `${selectedCoords.width}px`,
            '--navigation-pseudo-item-position-top': selectedCoords && `${selectedCoords.top}px`,
            '--navigation-pseudo-item-position-height': selectedCoords && `${selectedCoords.height}px`,
            '--navigation-item-selected-border-radius': highlightRadius && `${highlightRadius}px`,
          } as React.CSSProperties
        }
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
        {...props}
      >
        {items &&
          items.map(({ id, label, disabled, triggerOnly, ...itemProps }, index) => {
            const stateProps = {
              disabled,
              focused: focusedIndex === index,
              selected: selectedId === id,
            };

            return (
              <NavigationItem
                allowRightClickLinks={allowRightClickLinks}
                componentId={componentId}
                key={id}
                id={id}
                onClick={handleItemClick}
                variant={variant}
                vertical={vertical}
                {...itemProps}
                {...stateProps}
              >
                {label}
              </NavigationItem>
            );
          })}
      </nav>
    );
  },
);
