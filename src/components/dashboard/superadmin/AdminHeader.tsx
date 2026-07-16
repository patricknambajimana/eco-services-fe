// components/dashboard/superadmin/AdminHeader.tsx
import { 
  ChevronDown, 
  Menu, 
  User,
  Search,
  Settings,
  LogOut,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationsDropdown } from "./NotificationsDropdown";

interface Props {
  openMenu: () => void;
  logout: () => void;
  settingsPath?: string;
}

export default function AdminHeader({ 
  openMenu, 
  logout,
  settingsPath = '/superadmin/settings',
}: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl"
            onClick={openMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-9 pr-4 py-2.5 rounded-xl bg-gray-50/80 border-gray-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-gray-400 text-gray-900 transition-all duration-200"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <NotificationsDropdown />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-gray-100/80 rounded-xl px-2 md:px-3 py-1.5 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/25">
                  {(user?.name || 'A')[0].toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 leading-none">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || 'Super Admin'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-gray-200/60 shadow-xl rounded-xl">
              <DropdownMenuLabel className="p-4">
                <p className="font-semibold text-gray-900">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user?.email || 'admin@example.com'}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => navigate(`${settingsPath}/profile`)}
                  className="cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-50/80"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut className="text-gray-400">⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(settingsPath)}
                  className="cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-50/80"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut className="text-gray-400">⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 hover:text-red-700 cursor-pointer hover:bg-red-50/80"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
                <DropdownMenuShortcut className="text-red-400">⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}