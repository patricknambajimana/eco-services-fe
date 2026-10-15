import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateShiftMutation, useGetScheduleQuery, useGetStaffQuery } from '@/services/staffApi';
import { getErrorMessage } from '@/utils/errors';
import { useDepartmentScope } from '@/hooks/useAuth';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Fields';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SchedulePage() {
    const scope = useDepartmentScope();
    const { data: shifts = [] } = useGetScheduleQuery();
    const { data: staff = [] } = useGetStaffQuery();
    const [createShift, { isLoading }] = useCreateShiftMutation();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ userId: '', shiftDate: new Date().toISOString().slice(0, 10), startTime: '08:00', endTime: '16:00' });
    const [error, setError] = useState('');

    const visibleStaff = staff.filter((s) => !scope || s.department === scope);
    const visibleShifts = shifts.filter((s) => !scope || s.department === scope);

    const save = async () => {
        if (!form.userId) {
            setError('Select an employee.');
            return;
        }
        try {
            await createShift(form).unwrap();
            setOpen(false);
            setError('');
        } catch (e) {
            setError(getErrorMessage(e));
        }
    };

    return (
        <>
            <PageHeader title="Staff schedule" subtitle="Weekly shift planning"
                actions={<Button onClick={() => setOpen(true)}><Plus size={16} /> Add shift</Button>} />
            <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
                {DAYS.map((d, i) => (
                    <Card key={d} title={d}>
                        <ul className="space-y-2">
                            {visibleShifts.filter((s) => s.day === i).map((s) => (
                                <li key={s.id} className="rounded-lg bg-brand-50 p-2 text-xs">
                                    <p className="font-semibold">{s.staffName}</p>
                                    <p className="text-slate-500">{s.start} – {s.end}</p>
                                </li>
                            ))}
                            {!visibleShifts.some((s) => s.day === i) && <li className="text-xs text-slate-400">No shifts</li>}
                        </ul>
                    </Card>
                ))}
            </div>
            {open && (
                <Modal title="Create shift" onClose={() => setOpen(false)}
                    footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button loading={isLoading} onClick={save}>Save</Button></>}>
                    <div className="space-y-3">
                        <Select label="Employee" value={form.userId} placeholder="Select employee"
                            options={visibleStaff.map((s) => ({ value: s.id, label: s.fullName }))} onChange={(e) => setForm({ ...form, userId: e.target.value })} />
                        <Input label="Shift date" type="date" value={form.shiftDate} onChange={(e) => setForm({ ...form, shiftDate: e.target.value })} />
                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Start" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
                            <Input label="End" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </Modal>
            )}
        </>
    );
}