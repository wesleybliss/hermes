import { format } from "date-fns";
import {
  Archive,
  ArchiveX,
  ArrowLeft,
  Clock,
  MoreVertical,
  Reply,
  ReplyAll,
  Star,
  Trash2,
} from "lucide-react";
import type { Mail } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MailViewProps {
  mail: Mail;
  onBack?: () => void;
}

export function MailView({ mail, onBack }: MailViewProps) {
  const fromInitial = mail.from.name.charAt(0).toUpperCase();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2 border-b">
        {onBack && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>More</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Star message</DropdownMenuItem>
              <DropdownMenuItem>Add to tasks</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{mail.subject}</h1>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
            <span className="sr-only">Star</span>
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 text-sm">
            <Avatar>
              <AvatarImage alt={mail.from.name} />
              <AvatarFallback>{fromInitial}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="font-semibold">{mail.from.name}</div>
              <div className="text-xs text-muted-foreground">
                &lt;{mail.from.email}&gt;
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(mail.date), "PPpp")}
          </div>
        </div>
        <Separator />
        <div
          className="prose max-w-none text-sm"
          dangerouslySetInnerHTML={{ __html: mail.body }}
        />
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
            <Button variant="outline">
                <Reply className="mr-2 h-4 w-4"/>
                Reply
            </Button>
            <Button variant="outline">
                <ReplyAll className="mr-2 h-4 w-4"/>
                Reply all
            </Button>
        </div>
      </div>
    </div>
  );
}
