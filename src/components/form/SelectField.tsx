import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/hooks/form.hooks";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    label: string;
    options: SelectOption[];
    placeholder?: string;
    description?: string;
}

export function SelectField({
    label,
    options,
    placeholder,
    description,
}: SelectFieldProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Select
                name={field.name}
                value={field.state.value}
                onValueChange={field.handleChange}
            >
                <SelectTrigger
                    id={field.name}
                    aria-invalid={isInvalid}
                    className="w-full"
                    onBlur={field.handleBlur}
                >
                    <SelectValue placeholder={placeholder ?? "Sélectionner…"} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {description && <FieldDescription>{description}</FieldDescription>}
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    );
}
