import type { ComponentProps } from 'react';
import { Button as ShadcnButton } from './button';

interface ButtonProps extends ComponentProps<typeof ShadcnButton> {
    loading?: boolean;
}

export default function LegacyButton({ loading = false, disabled, children, ...props }: ButtonProps) {
    return (
        <ShadcnButton disabled={disabled || loading} {...props}>
            {loading ? 'Loading…' : children}
        </ShadcnButton>
    );
}
