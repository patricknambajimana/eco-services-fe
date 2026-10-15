import { Link } from 'react-router-dom';

const Box = ({ code, text }: { code: string; text: string }) => (
    <div className="py-24 text-center">
        <p className="text-5xl font-bold text-brand-700">{code}</p>
        <p className="mt-3 text-slate-600">{text}</p>
        <Link to="/dashboard" className="mt-6 inline-block text-sm font-medium text-brand-700 hover:underline">Back to dashboard</Link>
    </div>
);

export const NotFoundPage = () => <Box code="404" text="This page could not be found." />;
export const ForbiddenPage = () => <Box code="403" text="You do not have permission to view this page." />;