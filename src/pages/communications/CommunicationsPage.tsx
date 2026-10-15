import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Mail, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useGetStaffQuery } from '@/services/staffApi';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import Button from '@/components/ui/LegacyButton';
import { Input, Select, Textarea } from '@/components/ui/Fields';
import type { CommunicationEmail, CommunicationMessage } from '@/types';

type Tab = 'chat' | 'email';

export default function CommunicationsPage() {
    const { user } = useAuth();
    const { data: staff = [] } = useGetStaffQuery();
    const [tab, setTab] = useState<Tab>('chat');
    const [messageMode, setMessageMode] = useState<'message' | 'meeting'>('message');
    const [recipientId, setRecipientId] = useState('');
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [error, setError] = useState('');
    const [sent, setSent] = useState('');
    const [messages, setMessages] = useState<CommunicationMessage[]>([]);
    const [emails, setEmails] = useState<CommunicationEmail[]>([]);

    useEffect(() => {
        try {
            setMessages(JSON.parse(localStorage.getItem('eco-communications-messages') ?? '[]') as CommunicationMessage[]);
            setEmails(JSON.parse(localStorage.getItem('eco-communications-emails') ?? '[]') as CommunicationEmail[]);
        } catch {
            setMessages([]);
            setEmails([]);
        }
    }, []);

    const recipients = useMemo(() => staff.filter((member) => member.id !== user?.id), [staff, user?.id]);
    const recipientOptions = recipients.map((member) => ({
        value: member.id,
        label: `${member.fullName} · ${member.department}`,
    }));
    const selectedRecipient = recipients.find((member) => member.id === recipientId);

    const submit = async () => {
        setError('');
        setSent('');
        if (!recipientId) return setError('Select a user to contact.');
        if (!body.trim()) return setError(tab === 'chat' ? 'Write a message.' : 'Write an email message.');
        if (tab === 'email' && !subject.trim()) return setError('Enter an email subject.');

        const recipientName = selectedRecipient?.fullName ?? 'user';
        if (tab === 'chat') {
            const message: CommunicationMessage = {
                id: `local-message-${Date.now()}`, senderId: user?.id ?? 'manager',
                senderName: user?.fullName ?? 'General Manager', recipientId, recipientName,
                body: messageMode === 'meeting'
                    ? `Meeting invitation: ${body.trim()}${meetingDate ? ` on ${meetingDate}` : ''}${meetingTime ? ` at ${meetingTime}` : ''}.`
                    : body.trim(),
                createdAt: new Date().toISOString(), read: false,
            };
            const next = [message, ...messages];
            setMessages(next);
            localStorage.setItem('eco-communications-messages', JSON.stringify(next));
        } else {
            const email: CommunicationEmail = {
                id: `local-email-${Date.now()}`, senderId: user?.id ?? 'manager',
                senderName: user?.fullName ?? 'General Manager', recipientId, recipientName,
                subject: subject.trim(), body: body.trim(), createdAt: new Date().toISOString(), status: 'SENT',
            };
            const next = [email, ...emails];
            setEmails(next);
            localStorage.setItem('eco-communications-emails', JSON.stringify(next));
        }
        setBody('');
        setSubject('');
        setMeetingDate('');
        setMeetingTime('');
        setSent(`${tab === 'chat' ? (messageMode === 'meeting' ? 'Meeting invitation' : 'Message') : 'Email'} saved for ${recipientName}.`);
    };

    return (
        <>
            <PageHeader title="Messages & Email" subtitle="Contact staff securely across Eco-Services" />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
                <Card title={tab === 'chat' ? 'Recent conversations' : 'Sent email'}>
                    <div className="mb-4 flex gap-2 border-b border-slate-100 pb-3">
                        <button onClick={() => setTab('chat')} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${tab === 'chat' ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <MessageCircle size={16} /> Chat ({messages.length})
                        </button>
                        <button onClick={() => setTab('email')} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${tab === 'email' ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <Mail size={16} /> Email ({emails.length})
                        </button>
                    </div>
                    <div className="max-h-[520px] space-y-3 overflow-y-auto">
                        {tab === 'chat' ? messages.map((message) => (
                            <div key={message.id} className={`rounded-xl border p-3 ${message.senderId === user?.id ? 'ml-8 border-brand-100 bg-brand-50/50' : 'mr-8 border-slate-200 bg-white'}`}>
                                <div className="flex justify-between gap-3 text-xs text-slate-500">
                                    <span className="font-semibold text-slate-700">{message.senderName} → {message.recipientName}</span>
                                    <span>{new Date(message.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-700">{message.body}</p>
                            </div>
                        )) : emails.map((email) => (
                            <div key={email.id} className="rounded-xl border border-slate-200 p-3">
                                <div className="flex justify-between gap-3 text-xs text-slate-500">
                                    <span className="font-semibold text-slate-700">{email.senderName} → {email.recipientName}</span>
                                    <span>{new Date(email.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="mt-2 font-medium text-slate-800">{email.subject}</p>
                                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{email.body}</p>
                            </div>
                        ))}
                        {((tab === 'chat' && !messages.length) || (tab === 'email' && !emails.length)) && (
                            <p className="py-12 text-center text-sm text-slate-400">No {tab === 'chat' ? 'messages' : 'emails'} yet.</p>
                        )}
                    </div>
                </Card>

                <Card title={tab === 'chat' ? 'Send a message' : 'Compose email'}>
                    <div className="space-y-4">
                        <Select label="Recipient" value={recipientId} placeholder="Choose a staff member" options={recipientOptions} onChange={(e) => setRecipientId(e.target.value)} />
                        {tab === 'chat' && <div className="flex gap-2 rounded-lg bg-slate-50 p-1">
                            <button type="button" onClick={() => setMessageMode('message')} className={`flex-1 rounded-md px-3 py-2 text-sm ${messageMode === 'message' ? 'bg-white font-medium text-brand-700 shadow-sm' : 'text-slate-500'}`}>
                                <MessageCircle size={14} className="mr-1 inline" /> Message
                            </button>
                            <button type="button" onClick={() => setMessageMode('meeting')} className={`flex-1 rounded-md px-3 py-2 text-sm ${messageMode === 'meeting' ? 'bg-white font-medium text-brand-700 shadow-sm' : 'text-slate-500'}`}>
                                <CalendarDays size={14} className="mr-1 inline" /> Meeting
                            </button>
                        </div>}
                        {tab === 'email' && <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject" />}
                        {messageMode === 'meeting' && tab === 'chat' && <div className="grid grid-cols-2 gap-3">
                            <Input label="Meeting date" type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
                            <Input label="Meeting time" type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
                        </div>}
                        <Textarea label={tab === 'chat' ? 'Message' : 'Email body'} value={body} onChange={(e) => setBody(e.target.value)} placeholder={tab === 'chat' ? 'Write a private message...' : 'Write your email...'} />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {sent && <p className="text-sm text-green-700">{sent}</p>}
                        <Button className="w-full" onClick={submit}>
                            <Send size={16} /> {tab === 'chat' ? 'Send message' : 'Send email'}
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}
