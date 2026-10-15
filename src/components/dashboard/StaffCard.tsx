import { Link } from 'react-router-dom';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { useGetStaffQuery } from '@/services/staffApi';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import { roleLabel } from '@/config/roles';
import { DEPT_THEME } from './theme';
import type { Department, OperatingDepartment } from '@/types';

interface Props { department?: OperatingDepartment; includeManagement?: boolean }

export default function StaffCard({ department, includeManagement }: Props) {
    const { can } = useAuth();
    const { data = [] } = useGetStaffQuery();
    const link = can(ACCESS.staff)
        ? <Link to="/staff" className="text-xs font-medium text-brand-700 hover:underline">Manage staff</Link>
        : undefined;

    if (department) {
        const team = data.filter((s) => s.department === department);
        return (
            <Card title={`${DEPT_THEME[department].label} team (${team.length})`} actions={link}>
                <ul className="divide-y">
                    {team.slice(0, 8).map((s) => (
                        <li key={s.id} className="flex items-center justify-between py-2.5 text-sm">
                            <span><span className="font-medium">{s.fullName}</span> <span className="text-xs text-slate-500">· {roleLabel(s.role)}</span></span>
                            <StatusBadge status={s.status} />
                        </li>
                    ))}
                </ul>
            </Card>
        );
    }

    const groups: Department[] = includeManagement
        ? ['MANAGEMENT', 'RESTAURANT', 'BAKERY', 'DECORATION']
        : ['RESTAURANT', 'BAKERY', 'DECORATION'];

    return (
        <Card title="Staff by department" actions={link}>
            <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-slate-500">
                    <tr><th className="pb-2 font-medium">Department</th><th className="pb-2 font-medium">Total</th><th className="pb-2 font-medium">Active</th><th className="pb-2 font-medium">On leave</th><th className="pb-2 font-medium">Inactive</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {groups.map((g) => {
                        const list = data.filter((s) => s.department === g);
                        return (
                            <tr key={g}>
                                <td className={`py-2.5 font-medium ${DEPT_THEME[g].text}`}>{DEPT_THEME[g].label}</td>
                                <td>{list.length}</td>
                                <td>{list.filter((s) => s.status === 'ACTIVE').length}</td>
                                <td>{list.filter((s) => s.status === 'ON_LEAVE').length}</td>
                                <td>{list.filter((s) => s.status === 'INACTIVE' || s.status === 'SUSPENDED').length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}