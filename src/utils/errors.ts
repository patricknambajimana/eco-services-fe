export function getErrorMessage(e: unknown): string {
    if (e && typeof e === 'object' && 'message' in e) return String((e as { message: unknown }).message);
    return 'Something went wrong. Please try again.';
}