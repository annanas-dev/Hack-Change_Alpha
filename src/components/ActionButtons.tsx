import { Mail, Phone, FileText } from 'lucide-react';

interface ActionButtonsProps {
  onSendEmail: () => void;
  onSendToCallCenter: () => void;
  onGenerateOffer: () => void;
  hasSelectedProducts: boolean;
  customerEmail?: string;
  selectedCount: number;
}

export function ActionButtons({
  onSendEmail,
  onSendToCallCenter,
  onGenerateOffer,
  hasSelectedProducts,
  customerEmail,
  selectedCount,
}: ActionButtonsProps) {
  return (
    <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-[#f5f5f7] text-xl">5. ДЕЙСТВИЯ С ВЫБРАННЫМИ ПРОГНОЗАМИ</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg p-4">
          <div className="text-[#86868b] text-sm mb-2">Электронная почта клиента:</div>
          <div className="text-[#f5f5f7] font-mono text-sm">
            {customerEmail || 'Электронная почта не указана'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={onSendEmail}
            disabled={!hasSelectedProducts}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2d2d2f] hover:border-[#ef3124] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0a0a0a] disabled:hover:border-[#2d2d2f]"
          >
            <Mail className={`h-5 w-5 ${hasSelectedProducts ? 'text-[#ef3124]' : 'text-[#4a4a4a]'}`} />
            <span className="text-[#f5f5f7] text-sm text-center">Отправить по Email</span>
          </button>

          <button
            onClick={onSendToCallCenter}
            disabled={!hasSelectedProducts}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2d2d2f] hover:border-[#ef3124] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0a0a0a] disabled:hover:border-[#2d2d2f]"
          >
            <Phone className={`h-5 w-5 ${hasSelectedProducts ? 'text-[#ef3124]' : 'text-[#4a4a4a]'}`} />
            <span className="text-[#f5f5f7] text-sm text-center">Отправить в колл-центр</span>
          </button>

          <button
            onClick={onGenerateOffer}
            disabled={!hasSelectedProducts}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2d2d2f] hover:border-[#ef3124] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0a0a0a] disabled:hover:border-[#2d2d2f]"
          >
            <FileText className={`h-5 w-5 ${hasSelectedProducts ? 'text-[#ef3124]' : 'text-[#4a4a4a]'}`} />
            <span className="text-[#f5f5f7] text-sm text-center">Сформировать оффер</span>
          </button>
        </div>

        {hasSelectedProducts && (
          <div className="text-center pt-2">
            <div className="text-[#34c759] text-sm">
              ✓ {selectedCount} product{selectedCount > 1 ? 's' : ''} выбран и готов к отправке
            </div>
          </div>
        )}

        {!hasSelectedProducts && (
          <div className="text-center pt-2">
            <div className="text-[#86868b] text-sm">
               Выберите продукты выше, чтобы активировать действия
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
