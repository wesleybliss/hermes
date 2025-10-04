import * as React from "react";
import { Search } from "lucide-react";
import type { Account, Mail, Label } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MailSidebar } from "./sidebar";
import { MailList } from "./mail-list";
import { MailView } from "./mail-view";

interface MailAppProps {
  accounts: Account[];
  mails: Mail[];
  labels: Label[];
  selectedMailId: string | null;
  setSelectedMailId: (id: string | null) => void;
}

export function MailApp({
  accounts,
  mails,
  labels,
  selectedMailId,
  setSelectedMailId,
}: MailAppProps) {
  const isMobile = useIsMobile();
  const selectedMail = mails.find((m) => m.id === selectedMailId);
  const [activeLabel, setActiveLabel] = React.useState("inbox");
  const [isMailViewVisible, setIsMailViewVisible] = React.useState(false);

  React.useEffect(() => {
    if (selectedMailId && isMobile) {
      setIsMailViewVisible(true);
    }
  }, [selectedMailId, isMobile]);

  const handleSelectMail = (id: string | null) => {
    setSelectedMailId(id);
    if (id && isMobile) {
      setIsMailViewVisible(true);
    }
  };

  const handleBack = () => {
    setIsMailViewVisible(false);
    setSelectedMailId(null);
  };

  const filteredMails = mails.filter(
    (mail) => activeLabel === 'all' || mail.labels.includes(activeLabel)
  );


  return (
    <div className="flex h-full">
      <Sidebar collapsible="icon">
        <MailSidebar
          accounts={accounts}
          labels={labels}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
        />
      </Sidebar>
      <SidebarInset className="p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b p-2">
            <SidebarTrigger className="md:hidden" />
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex h-full">
              <div
                className={cn(
                  "w-full h-full md:w-1/3 md:min-w-[300px] md:max-w-[450px] border-r overflow-y-auto",
                  isMobile && isMailViewVisible && "hidden"
                )}
              >
                <MailList mails={filteredMails} onSelectMail={handleSelectMail} selectedMailId={selectedMailId} />
              </div>

              <div
                className={cn(
                  "flex-1 h-full",
                  isMobile && !isMailViewVisible && "hidden"
                )}
              >
                {selectedMail ? (
                  <MailView mail={selectedMail} onBack={isMobile ? handleBack : undefined} />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <p>Select a mail to read</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
