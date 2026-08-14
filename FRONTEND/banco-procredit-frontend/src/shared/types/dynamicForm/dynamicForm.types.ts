export type DynamicFieldType = 'text' | 'number' | 'select' | 'email' | 'password';

export interface DynamicFormOption {
  value: string | number;
  label: string;
}

export interface DynamicFormField<TName extends string = string> {
  nameID: TName;
  type: DynamicFieldType;
  maxLength?: number;
  required?: boolean;
  isNumber?: boolean;
  isAllChapter?: boolean;
  isNotSpace?: boolean;
  options?: DynamicFormOption[];
  orderId: number;
  isInitialFields?: boolean;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: string;
  className?: string;
}
