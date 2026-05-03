import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"

export default function PageNotFound() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>404 - Page non trouvée</EmptyTitle>
                <EmptyDescription>
                    La page que vous recherchez n&apos;existe pas. Essayez de rechercher
                    ce dont vous avez besoin ci-dessous.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <EmptyDescription>
                    Retour à la <a href="/">PAGE D'ACCUEIL</a>
                </EmptyDescription>
            </EmptyContent>
        </Empty>
    )
}
