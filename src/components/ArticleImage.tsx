import { useState } from "react";
import { Image01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface ArticleImageProps {
    readonly src: string;
    readonly alt: string;
    readonly className?: string;
}

export function ArticleImage({ src, alt, className }: ArticleImageProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div
                className={cn(
                    "bg-muted text-muted-foreground flex items-center justify-center",
                    className,
                )}
            >
                <HugeiconsIcon icon={Image01Icon} className="size-10" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={cn("object-cover", className)}
            onError={() => setHasError(true)}
        />
    );
}
