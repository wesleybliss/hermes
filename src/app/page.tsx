"use client";

import * as React from "react";
import { accounts, labels as initialLabels } from "@/lib/mail-data";
import type { Mail } from "@/lib/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MailApp } from "@/components/mail/mail-app";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { listMessagesFlow } from "@/ai/flows/gmail";

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.999,35.536,44,30.169,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  )
}

export default function Home() {
  const [selectedMailId, setSelectedMailId] = React.useState<Mail["id"] | null>(null);
  const [isMailboxCollapsed, setIsMailboxCollapsed] = React.useState(false);
  const { toast } = useToast();
  const [mails, setMails] = React.useState<Mail[]>([]);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isFetchingMails, setIsFetchingMails] = React.useState(false);

  React.useEffect(() => {
    if (selectedMailId === null && mails.length > 0) {
      setSelectedMailId(mails[0].id);
    }
  }, [mails, selectedMailId]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/gmail.readonly");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast({
        variant: "destructive",
        title: "Sign-in failed",
        description: "Could not sign in with Google. Please try again.",
      });
    }
  };
  
  React.useEffect(() => {
    async function fetchMails() {
      if (user && mails.length === 0 && !isFetchingMails) {
        setIsFetchingMails(true);
        try {
          const fetchedMails = await listMessagesFlow();
          setMails(fetchedMails);
        } catch (error) {
          console.error("Error fetching emails:", error);
          toast({
            variant: "destructive",
            title: "Error fetching emails",
            description: "Could not fetch your emails from Gmail.",
          });
        } finally {
          setIsFetchingMails(false);
        }
      }
    }
    fetchMails();
  }, [user, mails.length, isFetchingMails, toast]);

  if (isUserLoading || isFetchingMails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{isUserLoading ? "Loading user..." : "Fetching emails..."}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 rounded-lg border p-8 shadow-md">
          <h1 className="text-2xl font-bold">Welcome to Hermes Mail</h1>
          <p className="text-muted-foreground">
            A modern Gmail clone to experience your email in a new way.
          </p>
          <Button onClick={handleSignIn} size="lg">
            <GoogleIcon />
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      defaultOpen
      open={!isMailboxCollapsed}
      onOpenChange={() => setIsMailboxCollapsed((prev) => !prev)}
    >
      <div className="h-screen overflow-hidden">
        <MailApp
          accounts={accounts}
          mails={mails}
          labels={initialLabels}
          selectedMailId={selectedMailId}
          setSelectedMailId={setSelectedMailId}
        />
      </div>
    </SidebarProvider>
  );
}
