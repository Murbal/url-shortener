import { TextField, TextFieldProps } from '@mui/material';
import { FieldError, FieldValues } from 'react-hook-form';
import { CommonAppFieldProps } from '.';
import { CommonComponentProps } from '../types';

type Props<FormValues extends FieldValues> = CommonAppFieldProps<FormValues> &
  CommonComponentProps &
  TextFieldProps;

export const AppTextField = <FormValues extends FieldValues>({
  register,
  formState,
  name,
  registerOptions,
  ...textFieldProps
}: Props<FormValues>) => {
  const errorKey = formState
    ? (name as unknown as keyof typeof formState.errors)
    : undefined;
  const fieldError = errorKey
    ? (formState?.errors[errorKey] as FieldError)
    : undefined;

  return (
    <TextField
      {...register?.(name, registerOptions)}
      {...textFieldProps}
      error={textFieldProps.error || !!fieldError}
      helperText={textFieldProps.helperText || fieldError?.message}
    />
  );
};
