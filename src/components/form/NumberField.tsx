import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form.hooks";

interface NumberFieldProps {
    label: string;
    placeholder?: string;
    description?: string;
    min?: number;
    step?: number;
}

export function NumberField({
    label,
    placeholder,
    description,
    min,
    step,
}: NumberFieldProps) {
    const field = useFieldContext<number>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value === 0 ? "" : field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) =>
                    field.handleChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                    )
                }
                aria-invalid={isInvalid}
                placeholder={placeholder}
                min={min}
                step={step}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    );
}
