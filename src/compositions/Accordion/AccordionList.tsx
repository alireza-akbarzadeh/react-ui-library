import { cx } from '@emotion/css';
import React, { useCallback, useContext, useRef } from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
} from '../../components/InteractiveGroup/InteractiveGroupContext';
import { AccordionContent, AccordionContentProps } from './AccordionContent';
import { AccordionLabel } from './AccordionLabel';
import styles from './styles/AccordionList.module.css';
import { AccordionItemType } from './types';

export interface AccordionListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<AccordionContentProps, 'duration' | 'easing' | 'horizontal'>,
    ThemeProps {
  className?: string;
  componentId: string;
  items: AccordionItemType[];
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  unstyled?: boolean;
  variant?: 'primary' | 'colored';
}

export const AccordionList = React.forwardRef<HTMLDivElement, AccordionListProps>(
  (
    {
      className,
      componentId,
      contrast,
      duration,
      easing,
      horizontal,
      items,
      onBlur,
      onFocus,
      style,
      themeId: initThemeId,
      unstyled,
      variant: initVariant,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<AccordionListProps, 'div'> => {
    const ref = useRef<HTMLDivElement>(null!);
    const accessible = useAccessibility();
    const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLDivElement>(ref);
    const { generateComponentId } = useComponentId(componentId);
    const themeId = useThemeId(initThemeId);
    const variant = contrast ? 'contrast' : initVariant;

    const { handleItemClick, isSelected, focusedIndex } = useContext<
      InteractiveGroupContextValue<string, HTMLDivElement, HTMLDivElement>
    >(InteractiveGroupContext);

    const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);

    const handleBlurMemoized = useCallback(
      event => {
        handleBlur(event);
        onBlur && onBlur(event);
      },
      [handleBlur, onBlur],
    );

    const handleFocusMemoized = useCallback(
      event => {
        handleFocus(event);
        onFocus && onFocus(event);
      },
      [handleFocus, onFocus],
    );

    return (
      <div
        aria-orientation={horizontal ? 'horizontal' : 'vertical'}
        className={
          unstyled
            ? className
            : cx(
                styles.accordionList,
                themeId && styles[`accordionList--${themeId}`],
                variant && styles[`accordionList--${variant}`],
                styles[`accordionList--${horizontal ? 'horizontal' : 'vertical'}`],
                accessible && styles['is-accessible'],
                focused && styles['is-focused'],
                className,
              )
        }
        onBlur={handleBlurMemoized}
        onFocus={handleFocusMemoized}
        ref={combineRefs}
        role="tablist"
        style={style}
        tabIndex={0}
        {...props}
      >
        {items &&
          items.map(({ id, label, content, disabled, iconOnly, labelProps, contentProps }, index) => {
            const focused = focusedIndex === index;
            const selected = isSelected(id);
            const stateProps = { disabled, focused, selected };

            return (
              <div
                className={cx(
                  styles.accordionItem,
                  styles[`accordionItem--${horizontal ? 'horizontal' : 'vertical'}`],
                  accessible && styles['is-accessible'],
                  focused && styles['is-focused'],
                  selected && styles['is-selected'],
                )}
                key={id}
              >
                <AccordionLabel
                  aria-controls={generateComponentId(id, 'panel')}
                  aria-expanded={!!stateProps.selected}
                  horizontal={horizontal}
                  iconOnly={iconOnly}
                  id={generateComponentId(id)}
                  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) =>
                    handleItemClick(event, id)
                  }
                  unstyled={unstyled}
                  {...labelProps}
                  {...stateProps}
                >
                  {label}
                </AccordionLabel>
                <AccordionContent
                  duration={duration}
                  easing={easing}
                  horizontal={horizontal}
                  id={generateComponentId(id, 'panel')}
                  parentRef={forwardedRef}
                  role="region"
                  {...contentProps}
                  {...stateProps}
                >
                  {typeof content === 'function' ? content(stateProps) : content}
                </AccordionContent>
              </div>
            );
          })}
      </div>
    );
  },
);

AccordionList.displayName = 'AccordionList';
