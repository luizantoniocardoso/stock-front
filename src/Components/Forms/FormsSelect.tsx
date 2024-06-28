import { TESelect } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";

interface FormsSelectProps<T extends SelectData[]> {
    data: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValueChange: (e:any) => void;
    placeholder?: string;
    preventFirstSelectionprop ?: boolean;
}

export const FormsSelect = <T extends SelectData[]>({ data, value, onValueChange, placeholder,preventFirstSelectionprop}: FormsSelectProps<T>) => {
    return (
        <TESelect data={data} value={value} onValueChange={onValueChange} placeholder={placeholder} preventFirstSelectionprop={preventFirstSelectionprop}/>
    );
};
