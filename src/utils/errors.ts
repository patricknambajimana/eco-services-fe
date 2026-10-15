export function getErrorMessage(e: unknown): string {
    if (e && typeof e === 'object' && 'status' in e && Number((e as { status: unknown }).status) === 429) {
        return 'Sign-in is temporarily unavailable. Please verify your credentials and try again later.';
    }
    if (e && typeof e === 'object' && 'status' in e && Number((e as { status: unknown }).status) === 409) {
        const conflictMessage = 'message' in e ? String((e as { message: unknown }).message ?? '') : '';
        return conflictMessage && !/^conflict$/i.test(conflictMessage)
            ? conflictMessage
            : 'This user already exists. Use a different username, email address, or credential ID.';
    }
    if (e && typeof e === 'object' && 'message' in e) {
        const message = (e as { message: unknown }).message;
        if (Array.isArray(message)) return message.map(String).join(' ');
        if (message && typeof message === 'object' && 'message' in message) return String((message as { message: unknown }).message);
        if (message) {
            const text = String(message);
            if (/invalid reference|still in use/i.test(text)) {
                return `${text} Check that the selected department and role exist, and that the username is not already assigned.`;
            }
            return text;
        }
    }
    return 'Something went wrong. Please try again.';
}