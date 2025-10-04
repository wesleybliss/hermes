"use client";

import * as React from "react";
import {
  ChevronDown,
  Pencil,
  PlusCircle,
} from "lucide-react";
import type { Account, Label } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ComposeDialog } from "./compose-dialog";

interface MailSidebarProps {
  accounts: Account[];
  labels: Label[];
  activeLabel: string;
  setActiveLabel: (labelId: string) => void;
}

export function MailSidebar({
  accounts,
  labels,
  activeLabel,
  setActiveLabel,
}: MailSidebarProps) {
  const [composeOpen, setComposeOpen] = React.useState(false);
  const systemLabels = labels.filter((label) => label.type === "system");
  const customLabels = labels.filter((label) => label.type === "custom");

  return (
    <>
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between p-2"
            >
              <div className="flex items-center gap-2">
                {accounts[0].icon}
                <div className="text-left">
                  <p className="font-semibold">{accounts[0].label}</p>
                  <p className="text-xs text-muted-foreground">
                    {accounts[0].email}
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {accounts.map((account) => (
              <DropdownMenuItem key={account.email} className="gap-2">
                {account.icon}
                <div className="text-left">
                  <p className="font-semibold">{account.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {account.email}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="h-12 w-full justify-start shadow-lg" onClick={() => setComposeOpen(true)}>
          <Pencil className="mr-2 h-5 w-5" />
          Compose
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {systemLabels.map((label) => (
            <SidebarMenuItem key={label.id}>
              <SidebarMenuButton
                onClick={() => setActiveLabel(label.id)}
                isActive={activeLabel === label.id}
                className="justify-start"
              >
                <label.icon className="h-4 w-4" />
                <span>{label.name}</span>
                {label.unreadCount > 0 && (
                  <span className="ml-auto text-xs font-semibold text-primary">
                    {label.unreadCount}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Labels</SidebarGroupLabel>
          <SidebarMenu>
            {customLabels.map((label) => (
              <SidebarMenuItem key={label.id}>
                <SidebarMenuButton
                  onClick={() => setActiveLabel(label.id)}
                  isActive={activeLabel === label.id}
                  className="justify-start"
                >
                  <label.icon className="h-4 w-4" />
                  <span>{label.name}</span>
                  {label.unreadCount > 0 && (
                  <span className="ml-auto text-xs font-semibold text-primary">
                    {label.unreadCount}
                  </span>
                )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <ComposeDialog open={composeOpen} onOpenChange={setComposeOpen} />
    </>
  );
}
