import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { FormboxInput, FormboxReadOnly, Formbox, FormboxProps, FormboxValue, useAutoFilled } from '../Formbox';
import styles from './styles/Textarea.module.css';

export interface LocalTextareaProps {
  cols?: number;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, value: FormboxValue) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  textareaProps?: Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'className' | 'onChange' | 'ref'>;
  value?: FormboxValue;
}

export type TextareaProps = MergeProps<Omit<FormboxProps, 'as' | 'children' | 'ref' | 'type'>, LocalTextareaProps>;

function TextareaBase(
  {
    className,
    cols,
    contrast = false,
    disabled = false,
    id,
    label,
    maxLength,
    name,
    onChange,
    placeholder,
    readOnly = false,
    required = false,
    rows = 3,
    size,
    textareaProps,
    themeId: initThemeId,
    transitional = false,
    validity,
    value = '',
    variant,
    width,
    ...props
  }: TextareaProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const themeId = useThemeId(initThemeId);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const combineRefs = makeCombineRefs<HTMLTextAreaElement>(inputRef, forwardedRef);

  const { autoFilled, handleAnimationStart } = useAutoFilled<HTMLTextAreaElement>();

  const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    event => {
      if (value !== event.target.value) {
        if (!maxLength || !event.target.value || event.target.value.length <= maxLength) {
          onChange && onChange(event, event.target.value);
        }
      }
    },
    [maxLength, onChange, value],
  );

  // an input is considered empty if there is nothing to show in the input (eg. value or placeholder)
  const hasValue = value !== undefined && value !== '';
  const isEmpty = !hasValue && placeholder === undefined;

  return (
    <Formbox
      autoFilled={autoFilled}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={isEmpty}
      iconAfterClassName={cx(styles.textareaIcon, styles[`textareaIcon--${variant}`])}
      id={id}
      label={label}
      readOnly={readOnly}
      size={size}
      themeId={themeId}
      transitional={transitional}
      type="textarea"
      validity={validity}
      variant={variant}
      width={width}
      {...props}
    >
      {({ id, variant }) =>
        readOnly ? (
          <FormboxReadOnly id={id} value={value} />
        ) : (
          <FormboxInput<'textarea'> contrast={contrast} placeholder={placeholder} themeId={themeId} variant={variant}>
            <textarea
              cols={cols}
              disabled={disabled}
              id={id}
              name={name}
              onAnimationStart={handleAnimationStart}
              onChange={handleChange}
              ref={combineRefs}
              rows={rows}
              value={value}
              {...textareaProps}
            />
          </FormboxInput>
        )
      }
    </Formbox>
  );
}

export const Textarea = React.forwardRef(TextareaBase);

TextareaBase.displayName = 'TextareaBase';
Textarea.displayName = 'Textarea';
