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
    unreadCount: 0,
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
    unreadCount: 0,
    icon: Star,
    type: "system",
  },
  {
    id: "spam",
    name: "Spam",
    unreadCount: 0,
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
    unreadCount: 0,
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

export const mails: Mail[] = [];
