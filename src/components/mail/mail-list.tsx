import { formatDistanceToNow } from "date-fns";
import type { Mail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MailListProps {
  mails: Mail[];
  onSelectMail: (id: string) => void;
  selectedMailId: string | null;
}

export function MailList({ mails, onSelectMail, selectedMailId }: MailListProps) {
  return (
    <div className="flex h-full flex-col">
       <div className="p-4 border-b">
         <h2 className="text-xl font-bold">Inbox</h2>
         <p className="text-sm text-muted-foreground">{mails.filter(m => !m.read).length} unread messages</p>
       </div>
      <div className="flex-1 overflow-y-auto">
        {mails.map((mail) => (
          <button
            key={mail.id}
            className={cn(
              "flex w-full flex-col items-start gap-2 border-b p-4 text-left transition-colors hover:bg-muted/50",
              selectedMailId === mail.id && "bg-muted"
            )}
            onClick={() => onSelectMail(mail.id)}
          >
            <div className="flex w-full items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "font-semibold",
                    !mail.read ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {mail.from.name}
                </div>
              </div>
              <div
                className={cn(
                  "ml-auto text-xs",
                  !mail.read ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {formatDistanceToNow(new Date(mail.date), {
                  addSuffix: true,
                })}
              </div>
            </div>
            <div
              className={cn(
                "text-sm",
                !mail.read ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {mail.subject}
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {mail.body.replace(/<[^>]+>/g, "")}
            </div>
            <div className="flex items-center gap-2">
              {mail.labels
                .filter(label => label !== 'inbox')
                .map((label) => (
                  <Badge key={label} variant="secondary" className="rounded-md">
                    {label}
                  </Badge>
                ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
