import { NativeSelect as Select } from "@chakra-ui/react";
interface NativeSelectRootProps extends Select.RootProps {
    icon?: React.ReactNode;
}
export declare const NativeSelectRoot: import("react").ForwardRefExoticComponent<NativeSelectRootProps & import("react").RefAttributes<HTMLDivElement>>;
interface NativeSelectItem {
    value: string;
    label: string;
    disabled?: boolean;
}
interface NativeSelectField extends Select.FieldProps {
    items?: Array<string | NativeSelectItem>;
}
export declare const NativeSelectField: import("react").ForwardRefExoticComponent<NativeSelectField & import("react").RefAttributes<HTMLSelectElement>>;
export {};
