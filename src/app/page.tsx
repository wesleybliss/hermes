"use client";

import * as React from "react";
import { accounts, mails, labels } from "@/lib/mail-data";
import type { Mail } from "@/lib/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MailApp } from "@/components/mail/mail-app";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedMailId, setSelectedMailId] = React.useState<Mail["id"] | null>(
    mails[0].id
  );
  const [isMailboxCollapsed, setIsMailboxCollapsed] = React.useState(false);
  const { toast } = useToast();

  const [currentMails, setCurrentMails] = React.useState(mails);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newMail: Mail = {
        id: `m${Date.now()}`,
        read: false,
        subject: "🎉 New Exciting Offer Just for You!",
        body: `<p>Hello!</p><p>We have an exciting new offer that we think you'll love. Check it out now before it expires.</p><p>Best regards,<br/>The Marketing Team</p>`,
        from: {
          name: "Promotions",
          email: "promo@example.com",
        },
        labels: ["inbox"],
        date: new Date().toISOString(),
      };
      
      setCurrentMails(prevMails => [newMail, ...prevMails]);
      
      toast({
        title: "New Mail Received",
        description: `From: Promotions - ${newMail.subject}`,
      });

    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <SidebarProvider
      defaultOpen
      open={!isMailboxCollapsed}
      onOpenChange={() => setIsMailboxCollapsed((prev) => !prev)}
    >
      <div className="h-screen overflow-hidden">
        <MailApp
          accounts={accounts}
          mails={currentMails}
          labels={labels}
          selectedMailId={selectedMailId}
          setSelectedMailId={setSelectedMailId}
        />
      </div>
    </SidebarProvider>
  );
}
