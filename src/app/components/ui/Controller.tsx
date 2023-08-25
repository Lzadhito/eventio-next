import { RHFOnChange } from '@/types';
import clsx from 'clsx';
import { cloneElement, ReactElement, ReactNode } from 'react';
import { Control, Controller as RHFController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props {
  control: Control<any>;
  name: string;
  valuePropName?: string;
  label: ReactNode;
  secondaryLabel?: ReactNode;
  children: ReactElement;
  onChange?: (value: any, rhfOnChange: RHFOnChange) => void;
  generateValue?: (value: any) => void;
}

export default function Controller({
  control,
  name,
  label,
  children,
  valuePropName = 'value',
  generateValue,
  secondaryLabel,
  onChange,
}: Props) {
  function handleChange(value: any, rhfOnChange: RHFOnChange) {
    if (onChange) onChange(value, rhfOnChange);
    else rhfOnChange(value);
  }

  return (
    <RHFController
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <label className="label">
            <span className="label-text">
              {label}
              {secondaryLabel ? <span className="ml-1 label-text text-xs">({secondaryLabel})</span> : null}
            </span>
          </label>
          {cloneElement(children, {
            [valuePropName]: generateValue && value ? generateValue(value) : value,
            onChange: (e: any) => handleChange(e, onChange),
            id: name,
            className: twMerge(
              clsx({ [children.props?.className]: !!children.props?.className, 'input-error': error?.message })
            ),
          })}
          {error?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{error.message}</span>
            </label>
          ) : null}
        </div>
      )}
    />
  );
}
