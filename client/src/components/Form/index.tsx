import React from 'react';
import {
  FieldPath,
  FieldValues,
  FormState,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormRegister,
} from 'react-hook-form';
import { CommonComponentProps } from '../types';

export type CommonAppFieldProps<FormValues extends FieldValues> = {
  register?: UseFormRegister<FormValues>;
  formState?: FormState<FormValues>;
  name: FieldPath<FormValues>;
  registerOptions: RegisterOptions<FormValues>;
};
type Props<FormValues extends FieldValues> = UseFormProps<FormValues> &
  CommonComponentProps & {
    onSubmit: SubmitHandler<FormValues>;
  };

export const AppForm = <FormValues extends FieldValues>({
  children,
  onSubmit,
  ...useFormProps
}: Props<FormValues>) => {
  const formMethods = useForm<FormValues>(useFormProps);

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      {/* taken from https://react-hook-form.com/advanced-usage#SmartFormComponent */}
      {React.Children.map(children, (child) => {
        if (!child || typeof child !== 'object' || !('props' in child)) {
          return child;
        }

        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: formMethods.register,
                formState: formMethods.formState,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};
