import { ComponentType } from 'react';

export interface Option {
  icon?: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  options?: Option[];
  placeholder?: string;
  value: keyof TData;
}
