import { SearchBar } from './SearchBar';
import { UserActions } from './UserAction'

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  return (
    <nav className="bg-white/95 backdrop-blur supports-backdrop-blur:bg-white/60 border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-restaurant-500 to-restaurant-700 rounded-xl flex items-center justify-center shadow-lg shadow-restaurant-500/25">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">NPGROUP</span>
              <span className="ml-2 text-xs font-medium text-restaurant-600 bg-restaurant-50 px-2 py-0.5 rounded-full">
                Customer
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <SearchBar value={searchTerm} onChange={onSearchChange} />
          </div>

          {/* User Actions */}
          <UserActions />
        </div>
      </div>
    </nav>
  );
};