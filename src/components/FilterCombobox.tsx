import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

type Option = { value: string; label: string };

interface FilterComboboxProps<T extends Option> {
    items: readonly T[];
    value: T | null;
    onValueChange: (value: T | null) => void;
    placeholder: string;
    emptyMessage: string;
}

export function FilterCombobox<T extends Option>({
    items,
    value,
    onValueChange,
    placeholder,
    emptyMessage,
}: FilterComboboxProps<T>) {
    return (
        <Combobox
            items={[...items]}
            value={value}
            onValueChange={onValueChange}
        >
            <ComboboxInput placeholder={placeholder} showClear />
            <ComboboxContent>
                <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                <ComboboxList>
                    {(item: T) => (
                        <ComboboxItem key={item.value} value={item}>
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
