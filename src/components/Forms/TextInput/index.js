import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import LabelInputErrorWrapper from '../LabelInputErrorWrapper';
import { ValidationError } from '../ValidationError';

export function TextInput({ children, className, ...other }) {
  return <input className={cN(s.textInput, className)} {...other} />;
}

export const TextInputWrapped = ({
  input,
  label,
  meta,
  placeholder,
  description,
}) => (
  <LabelInputErrorWrapper
    label={description ? `${label} (${description})` : label}
    meta={meta}
  >
    <TextInput {...input} placeholder={placeholder} />
  </LabelInputErrorWrapper>
);

export function TextInputInline({ children, className, ...other }) {
  return <input className={cN(s.textInputInline, className)} {...other} />;
}

export const TextInputOneLine = ({ input, label, meta, placeholder }) => (
  <label style={{ display: 'block' }}>
    <span>{label}</span>
    <TextInputInline {...input} placeholder={placeholder} />
    {meta.error && meta.touched && (
      <ValidationError>{meta.error}</ValidationError>
    )}
  </label>
);
