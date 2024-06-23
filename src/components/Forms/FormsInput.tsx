


import { forwardRef } from "react";
import { TEInput } from "tw-elements-react";

interface FormsInputProps {
  type: string;
  id: string;
  placeholder: string;
  arialabel: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement>;
  onChangeAction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[] | undefined;
}


export const FormsInput = forwardRef<HTMLInputElement, FormsInputProps>(({ arialabel, id, onChangeAction, placeholder, type, children, value }: FormsInputProps, ref) => (
  <div className="relative mb-6" data-twe-input-wrapper-init >
    <TEInput size="lg" type={type} label={placeholder} aria-label={arialabel} id={id} ref={ref} onChange={onChangeAction} value={value}>
      {children}
    </TEInput>
  </div>
))
