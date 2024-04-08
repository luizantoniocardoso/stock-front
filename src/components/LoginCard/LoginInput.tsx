import { forwardRef } from "react";
import { TEInput } from "tw-elements-react";

interface LoginInputProps {
  type: string;
  id: string;
  placeholder: string;
  arialabel: string;
  children?: React.ReactNode;
  ref: React.RefObject<HTMLInputElement>;
  onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}


export const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(({ arialabel, id, onChangeAction, placeholder, type, children, value }: LoginInputProps, ref) => (
  <div className="relative mb-6 min-w-[20rem]" data-twe-input-wrapper-init >
    <TEInput type={type} label={placeholder} aria-label={arialabel} id={id} ref={ref} onChange={onChangeAction} value={value}>
      {children}
    </TEInput>
  </div>
))
