import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuth';

const IDLE_MS = 15 * 60 * 1000;
const WARN_SECONDS = 60;

/** Shows a countdown warning after inactivity and logs out when it reaches zero. */
export default function SessionGuard() {
    const logout = useLogout();
    const [warning, setWarning] = useState(false);
    const [seconds, setSeconds] = useState(WARN_SECONDS);
    const timer = useRef<number | undefined>(undefined);

    const restart = useCallback(() => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => { setSeconds(WARN_SECONDS); setWarning(true); }, IDLE_MS);
    }, []);

    useEffect(() => {
        if (warning) return;
        const events = ['mousemove', 'keydown', 'click', 'scroll'];
        events.forEach((e) => window.addEventListener(e, restart));
        restart();
        return () => {
            events.forEach((e) => window.removeEventListener(e, restart));
            window.clearTimeout(timer.current);
        };
    }, [warning, restart]);

    useEffect(() => {
        if (!warning) return;
        const id = window.setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => window.clearInterval(id);
    }, [warning]);

    useEffect(() => {
        if (warning && seconds <= 0) logout('/session-expired');
    }, [warning, seconds, logout]);

    if (!warning) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
            <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Session about to expire</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                    You have been inactive. You will be signed out in <b>{seconds}s</b>.
                    Your current page will be preserved if you stay signed in.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => logout()}>Log out</Button>
                    <Button onClick={() => setWarning(false)}>Stay signed in</Button>
                </div>
            </div>
        </div>
    );
}