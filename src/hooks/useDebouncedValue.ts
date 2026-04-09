import { useEffect, useState } from "react";

interface UseDebouncedValueProps<T> {
    value: T;
    delay: number;
}

export function useDebouncedValue<T>({
    value,
    delay,
}: UseDebouncedValueProps<T>): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearInterval(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
