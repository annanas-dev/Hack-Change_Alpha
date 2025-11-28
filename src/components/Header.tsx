import { User } from 'lucide-react';

interface HeaderProps {
  customerName?: string;
}

export function Header({ customerName }: HeaderProps) {
  return (
    <header className="bg-[#0a0a0a] text-white border-b border-[#1d1d1f]">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ef3124] rounded-lg flex items-center justify-center">
              <span className="text-white">A</span>
            </div>
            <h1 className="text-white">Эксперт по Альфа-прибыли</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {customerName && (
              <div className="text-[#86868b] text-sm">
                Customer: {customerName}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-[#86868b]" />
              <span className="text-[#f5f5f7]">Менеджер</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
