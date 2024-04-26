"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOut, Mail, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  email: string;
  userName: string;
  avatarUrl: string | undefined;
}
export function UserNav(props: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error?.message);
    }
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="flex h-10 w-10 items-center justify-center border">
            <AvatarImage src={props.avatarUrl} alt={props.userName} />
            <AvatarFallback>
              {props.userName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="mb-3 flex flex-col space-y-1">
            <p className="font-medium leading-none">{props.userName}</p>
            <p className="text-muted-foreground text-sm leading-none">
              {props.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => {
            router.push("/contact");
          }}
          className="flex cursor-pointer items-center"
        >
          <Mail size={18} strokeWidth={1} className="mr-2" />
          Contact As
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogOut}
          className="mb-1 flex cursor-pointer items-center"
        >
          <LogOut size={18} strokeWidth={1} className="mr-2" />
          Log out
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
