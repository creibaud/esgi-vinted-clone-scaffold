import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ArticleCardSkeleton() {
    return (
        <Card className="overflow-hidden py-0">
            <Skeleton className="h-60 w-full rounded-none" />
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
            </CardContent>
            <CardFooter className="flex items-center justify-between px-4 py-3">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-9 w-28 rounded-md" />
            </CardFooter>
        </Card>
    );
}
