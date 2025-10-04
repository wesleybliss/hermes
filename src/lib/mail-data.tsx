import type { Account, Mail, Label } from "./types";
import {
  Inbox,
  Send,
  FileText,
  Archive,
  Trash2,
  ShieldAlert,
  Tag,
  Star,
  Users,
  Briefcase,
} from "lucide-react";

export const accounts: Account[] = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
        AK
      </div>
    ),
  },
  {
    label: "William Smith",
    email: "will@example.com",
    icon: (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-green-800 text-sm font-bold">
        WS
      </div>
    ),
  },
];

export const labels: Label[] = [
  {
    id: "inbox",
    name: "Inbox",
    unreadCount: 3,
    icon: Inbox,
    type: "system",
  },
  {
    id: "sent",
    name: "Sent",
    unreadCount: 0,
    icon: Send,
    type: "system",
  },
  {
    id: "drafts",
    name: "Drafts",
    unreadCount: 0,
    icon: FileText,
    type: "system",
  },
  {
    id: "starred",
    name: "Starred",
    unreadCount: 1,
    icon: Star,
    type: "system",
  },
  {
    id: "spam",
    name: "Spam",
    unreadCount: 1,
    icon: ShieldAlert,
    type: "system",
  },
  {
    id: "trash",
    name: "Trash",
    unreadCount: 0,
    icon: Trash2,
    type: "system",
  },
  {
    id: "archive",
    name: "Archive",
    unreadCount: 0,
    icon: Archive,
    type: "system",
  },
  {
    id: "social",
    name: "Social",
    unreadCount: 0,
    icon: Users,
    type: "custom",
  },
  {
    id: "work",
    name: "Work",
    unreadCount: 2,
    icon: Briefcase,
    type: "custom",
  },
  {
    id: "updates",
    name: "Updates",
    unreadCount: 0,
    icon: Tag,
    type: "custom",
  },
];

export const mails: Mail[] = [
  {
    id: "m1",
    read: false,
    subject: "Project Phoenix Update",
    body: `<p>Hi Team,</p><p>Just a quick update on Project Phoenix. We've hit a major milestone and are on track for our Q3 launch. Please review the attached document for detailed progress.</p><p>Best,</p><p>Olivia</p>`,
    from: { name: "Olivia Davis", email: "olivia.davis@example.com" },
    date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    labels: ["inbox", "work"],
  },
  {
    id: "m2",
    read: false,
    subject: "Your weekend summary",
    body: `<p>Hey William,</p><p>Here is your weekly summary from SocialApp. You have 5 new notifications and 2 new friend requests.</p><p>Cheers,<br>The SocialApp Team</p>`,
    from: { name: "SocialApp", email: "noreply@socialapp.com" },
    date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    labels: ["inbox", "social"],
  },
  {
    id: "m3",
    read: true,
    subject: "Re: Design Mockups",
    body: `<p>Hi Liam,</p><p>Thanks for sending these over. The V2 mockups look fantastic. I have a few minor feedback points I've added as comments in Figma.</p><p>Great work!</p><p>Sarah</p>`,
    from: { name: "Sarah Miller", email: "sarah.miller@example.com" },
    date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox", "work"],
  },
  {
    id: "m4",
    read: true,
    subject: "Lunch on Friday?",
    body: `<p>Hey,</p><p>Are you free for lunch this Friday? Was thinking that new Italian place downtown.</p><p>Let me know!</p><p>Alex</p>`,
    from: { name: "Alex Johnson", email: "alex.j@example.com" },
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox"],
  },
  {
    id: "m5",
    read: false,
    subject: "Your order #4562 has shipped!",
    body: `<p>Great news! Your recent order from TechStore is on its way. You can track your package using the link below.</p><p>Tracking Number: 1Z9999W99999999999</p>`,
    from: { name: "TechStore", email: "shipping@techstore.com" },
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox", "updates"],
  },
  {
    id: "m6",
    read: true,
    subject: "Weekly Newsletter",
    body: `<p>This week in tech: AI advancements, new gadgets, and more. Dive into our curated articles.</p>`,
    from: { name: "Tech Weekly", email: "newsletter@techweekly.com" },
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox", "updates"],
  },
  {
    id: "m7",
    read: true,
    subject: "Important: Your account security",
    body: `<p>We've detected a new sign-in to your account from a new device. If this was you, you can ignore this email.</p>`,
    from: { name: "Security Team", email: "security@example.com" },
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox", "spam"],
  },
  {
    id: "m8",
    read: true,
    subject: "Vacation Photos",
    body: `<p>Here are the photos from our trip! Let me know which ones you like.</p>`,
    from: { name: "Emily White", email: "emily.w@example.com" },
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox"],
  },
  {
    id: "m9",
    read: true,
    subject: "Draft: Q3 Report",
    body: `<p>Here's the draft for the Q3 report. Please add your sections by EOD tomorrow.</p>`,
    from: { name: "David Green", email: "david.green@example.com" },
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    labels: ["sent", "work"],
  },
  {
    id: "m10",
    read: false,
    subject: "Your next favorite read is waiting",
    body: `<p>Based on your recent activity, we think you'll love these books. Check out our personalized recommendations.</p>`,
    from: { name: "BookHub", email: "recommendations@bookhub.com" },
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    labels: ["inbox", "updates", "starred"],
  },
];
