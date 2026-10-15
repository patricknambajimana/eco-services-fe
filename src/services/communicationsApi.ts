import { baseApi } from './baseApi';
import type {
    CommunicationEmail, CommunicationMessage, SendEmailPayload, SendMessagePayload,
} from '@/types';

export const communicationsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query<CommunicationMessage[], void>({
            query: () => ({ url: '/communications/messages' }),
            providesTags: ['Communications'],
        }),
        sendMessage: build.mutation<CommunicationMessage, SendMessagePayload>({
            query: (data) => ({ url: '/communications/messages', method: 'POST', data }),
            invalidatesTags: ['Communications'],
        }),
        getEmails: build.query<CommunicationEmail[], void>({
            query: () => ({ url: '/communications/emails' }),
            providesTags: ['Communications'],
        }),
        sendEmail: build.mutation<CommunicationEmail, SendEmailPayload>({
            query: (data) => ({ url: '/communications/emails', method: 'POST', data }),
            invalidatesTags: ['Communications'],
        }),
    }),
});

export const {
    useGetMessagesQuery, useSendMessageMutation, useGetEmailsQuery, useSendEmailMutation,
} = communicationsApi;
