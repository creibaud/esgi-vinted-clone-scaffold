const STORAGE_KEY = "vinted-clone-userId";

export function getUserId(): string {
    let userId = localStorage.getItem(STORAGE_KEY);
    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, userId);
    }
    return userId;
}
