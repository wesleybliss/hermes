'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { google } from 'googleapis';
import type { Mail } from '@/lib/types';
import { UserCredential } from 'firebase/auth';

const gmail = google.gmail('v1');

async function getOauth2Client(flow: any) {
  const user = await flow.getAuthenticatedUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // The user object from Genkit with the 'google' provider contains the OAuth token.
  const accessToken = user.auth.google?.accessToken;

  if (!accessToken) {
    throw new Error('Google access token not found.');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return oauth2Client;
}


function parseEmail(body: string, contentType: string | undefined | null): string {
    if (!contentType) return body;

    if (contentType.includes('text/plain')) {
        return body;
    }

    if (contentType.includes('text/html')) {
        return body;
    }

    return `Unsupported content type: ${contentType}`;
}


export const listMessagesFlow = ai.defineFlow(
  {
    name: 'listMessagesFlow',
    inputSchema: z.void(),
    outputSchema: z.array(z.any()),
  },
  async function (input, flow) {
    const auth = await getOauth2Client(flow);
    const res = await gmail.users.messages.list({ auth, userId: 'me', maxResults: 20 });
    const messages = res.data.messages || [];

    const emailPromises = messages.map(async (message) => {
      if (!message.id) return null;
      const msgRes = await gmail.users.messages.get({ auth, userId: 'me', id: message.id, format: 'full' });
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


export async function listMessages(): Promise<Mail[]> {
    return await listMessagesFlow();
}
