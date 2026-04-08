import { getUserId } from "../lib/userId";

export function useCurrentUserId(): string {
    return getUserId();
}
