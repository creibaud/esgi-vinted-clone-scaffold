import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

interface ErrorMessageProps {
    icon?: IconSvgElement;
    title: string;
    message: string;
    content?: string;
}

export function ErrorMessage({
    icon: Icon,
    title,
    message,
    content,
}: ErrorMessageProps) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Empty>
                <EmptyHeader>
                    {Icon && (
                        <EmptyMedia variant="icon">
                            <HugeiconsIcon icon={Icon} />
                        </EmptyMedia>
                    )}
                    <EmptyTitle>{title}</EmptyTitle>
                    <EmptyDescription>{message}</EmptyDescription>
                </EmptyHeader>
                {content && <EmptyContent>{content}</EmptyContent>}
            </Empty>
        </div>
    );
}
