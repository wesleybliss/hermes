import type { LucideIcon } from "lucide-react";

export type Account = {
  label: string;
  email: string;
  icon: React.ReactNode;
};

export type Mail = {
  id: string;
  read: boolean;
  subject: string;
  body: string;
  labels: string[];
  from: {
    name: string;
    email: string;
  };
  date: string;
};

export type Label = {
  id: "inbox" | "sent" | "drafts" | "spam" | "trash" | "archive" | "starred" | string;
  name: string;
  unreadCount: number;
  icon: LucideIcon;
  type: "system" | "custom";
};
