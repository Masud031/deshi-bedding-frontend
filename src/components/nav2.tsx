import { User } from "lucide-react";
import { Link } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Account"
          className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary transition-colors"
        >
          <User className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem asChild>
          <Link to="/login">Login</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/register">Register</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;