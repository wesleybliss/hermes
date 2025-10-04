'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { google } from 'googleapis';
import type { Mail } from '@/lib/types';

const gmail = google.gmail('v1');

export const listMessagesFlow = ai.defineFlow(
  {
    name: 'listMessagesFlow',
    inputSchema: z.void(),
    outputSchema: z.array(z.any()),
    authPolicy: async (auth, input) => {
      if (!auth) {
        throw new Error('Authorization required.');
      }
      if (!auth.google) {
          throw new Error('Google Authorization required.');
      }
      const requiredScopes = ['https://www.googleapis.com/auth/gmail.readonly'];
      const userScopes = auth.google.scope.split(' ');
      if (!requiredScopes.every(scope => userScopes.includes(scope))) {
        throw new Error(`Missing required scopes. Required: ${requiredScopes.join(', ')}`);
      }
    },
  },
  async function (input, flow) {
    if (!flow.auth) {
      throw new Error('User not authenticated');
    }
    const accessToken = flow.auth.google?.accessToken;

    if (!accessToken) {
      throw new Error('Google access token not found.');
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const res = await gmail.users.messages.list({ auth: oauth2Client, userId: 'me', maxResults: 20 });
    const messages = res.data.messages || [];

    const emailPromises = messages.map(async (message) => {
      if (!message.id) return null;
      const msgRes = await gmail.users.messages.get({ auth: oauth2Client, userId: 'me', id: message.id, format: 'full' });
      const { payload } = msgRes.data;

      const headers = payload?.headers || [];
      const fromHeader = headers.find(h => h.name === 'From');
      const subjectHeader = headers.find(h => h.name === 'Subject');
      const dateHeader = headers.find(h => h.name === 'Date');
      
      const from = fromHeader?.value || 'Unknown Sender';
      const fromName = from.includes('<') ? from.split('<')[0].trim().replace(/"/g, '') : from;
      const fromEmail = from.includes('<') ? from.split('<')[1].replace('>', '') : from;
      
      let body = '';
      if (payload?.parts) {
        const part = payload.parts.find(p => p.mimeType === 'text/html') || payload.parts.find(p => p.mimeType === 'text/plain');
        if (part?.body?.data) {
          body = Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
      } else if (payload?.body?.data) {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
      }

      const mail: Mail = {
        id: message.id!,
        read: !msgRes.data.labelIds?.includes('UNREAD'),
        subject: subjectHeader?.value || '(No Subject)',
        body: body,
        from: { name: fromName, email: fromEmail },
        date: dateHeader?.value ? new Date(dateHeader.value).toISOString() : new Date().toISOString(),
        labels: msgRes.data.labelIds || [],
      };
      return mail;
    });

    const fullMessages = (await Promise.all(emailPromises)).filter(m => m !== null) as Mail[];
    return fullMessages;
  }
);
