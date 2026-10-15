import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import PageHeader from '@/components/ui/PageHeader';
import { DEPT_THEME } from './theme';

interface Props { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }

export default function DashboardShell({ title, subtitle, actions, children }: Props) {
    const { user } = useAuth();
    return (
        <div className={`border-l-4 pl-4 sm:pl-6 ${DEPT_THEME[user!.department].border}`}>
            <PageHeader title={title} subtitle={subtitle} actions={actions} />
            {children}
        </div>
    );
}

export const TwoColumn = ({ children }: { children: ReactNode }) => (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">{children}</div>
);

export const Block = ({ children }: { children: ReactNode }) => <div className="mt-6">{children}</div>;