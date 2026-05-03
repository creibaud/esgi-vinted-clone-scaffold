import { Link } from "react-router-dom";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";

export default function PageNotFound() {
    return (
        <div className="flex h-full w-full items-center justify-center px-4">
            <Empty>
                <EmptyHeader>
                    <p
                        className="text-primary/20 text-7xl font-black tracking-tight select-none sm:text-8xl"
                        aria-hidden
                    >
                        404
                    </p>
                    <EmptyTitle>Page introuvable</EmptyTitle>
                    <EmptyDescription>
                        La page que vous cherchez n'existe pas ou a été
                        déplacée.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button asChild>
                        <Link to="/">
                            <HugeiconsIcon
                                icon={ArrowLeft01Icon}
                                data-icon="inline-start"
                            />
                            Retour au catalogue
                        </Link>
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    );
}
