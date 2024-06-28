import { TESelect } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";

interface FormsSelectProps<T extends SelectData[]> {
    data: T;
    value?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValueChange: (e:any) => void;
}

export const FormsSelect = <T extends SelectData[]>({ data, value, onValueChange}: FormsSelectProps<T>) => {
    return (
        <TESelect data={data} value={value} onValueChange={onValueChange}/>
    );
};
