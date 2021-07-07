import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useState } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { FormboxSize, FormboxVariant } from '../../components/Form/Formbox/types';
import { useListRegistry } from '../../components/ListRegistry';
import { TextboxGroupInput } from './TextboxGroupInput';
import styles from './styles/TextboxGroup.module.css';
import { useTextboxGroup, UseTextboxGroupOptions } from './useTextboxGroup';

export interface LocalTextboxGroup2FAProps extends ThemeProps {
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  inputWidth?: number | string;
  length?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  size?: FormboxSize;
  value: string;
  variant?: FormboxVariant;
}

export type TextboxGroup2FAProps = MergeElementProps<'div', LocalTextboxGroup2FAProps>;

export function TextboxGroup2FA({
  className,
  inputClassName,
  inputStyle,
  inputWidth,
  length = 6,
  onChange,
  size,
  themeId: initThemeId,
  value = '',
  variant = 'outline',
  ...props
}: TextboxGroup2FAProps): React.ReactElement | null {
  const { generateComponentId } = useComponentId();
  const themeId = useThemeId(initThemeId);
  const { items } = useListRegistry<HTMLInputElement>();
  const [looper, setLooper] = useState<string[]>([]);

  // create an array of string IDs with 1 ID per digit
  useEffect(() => {
    setLooper(
      Array(length)
        .fill(null)
        .map((_, i) => `${i}`),
    );
  }, [length]);

  // create a values object keyed by the inputId for the useTextboxGroup hook
  const values = looper.reduce((acc, inputId, i) => {
    acc[inputId] = value[i];
    return acc;
  }, {} as Record<string, string>);

  const validator = useCallback(
    value => value.trim() !== '' && Number.isInteger(+value) && value >= 0 && value <= 9,
    [],
  );

  // fill any empty values with spaces so the values populate in the right box
  const handleChange = useCallback<NonNullable<UseTextboxGroupOptions['onChange']>>(
    (event, values) => {
      const value = looper.map(inputId => {
        const isEmpty = !values[inputId] || values[inputId] === '';
        return isEmpty ? ' ' : values[inputId];
      });

      onChange(event, value.join('').trimEnd());
    },
    [looper, onChange],
  );

  const inputProps = useTextboxGroup({
    onChange: handleChange,
    orderBy: looper,
    refs: items,
    validator,
    values,
  });

  /**
   * This intentionally excludes maxLength from the input
   * so that if someone enters a digit faster than the focus
   * automatically changes it's not ignored. The digit will
   * still be placed in the right box because of how the join
   * in `handleChange` works.
   */
  return looper.length ? (
    <div
      className={cx(
        styles.textboxGroup,
        styles['textboxGroup--2fa'],
        styles[`textboxGroup--${variant}`],
        themeId && styles[`textboxGroup--${themeId}`],
        className,
      )}
      {...props}
    >
      {looper.map(inputId => (
        <TextboxGroupInput
          centered
          className={cx(
            styles['textboxGroupInput'],
            styles['textboxGroupInput--2fa'],
            styles[`textboxGroupInput--${variant}`],
            inputClassName,
          )}
          inputId={inputId}
          inputSize={1}
          key={generateComponentId(inputId)}
          // maxLength is intentionally excluded (see note)
          size={size}
          style={inputStyle}
          value={values[inputId] === ' ' ? '' : values[inputId]}
          variant={variant}
          width={inputWidth || 'unset'}
          {...inputProps}
        />
      ))}
    </div>
  ) : null;
}

TextboxGroup2FA.displayName = 'TextboxGroup2FA';
