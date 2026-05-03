import { Link } from "react-router-dom";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    readonly backTo: string;
    readonly backLabel: string;
    readonly title?: string;
    readonly description?: string;
}

export function PageHeader({
    backTo,
    backLabel,
    title,
    description,
}: PageHeaderProps) {
    return (
        <div className="px-4">
            <Button variant="ghost" asChild className="mb-1 -ml-3 w-fit">
                <Link to={backTo}>
                    <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        data-icon="inline-start"
                    />
                    {backLabel}
                </Link>
            </Button>
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {description && (
                <p className="text-muted-foreground mt-1 text-sm">
                    {description}
                </p>
            )}
        </div>
    );
}
