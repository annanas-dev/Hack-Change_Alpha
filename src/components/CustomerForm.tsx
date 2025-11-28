import { useState } from 'react';
import type { CustomerData } from '../App';

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  isLoading: boolean;
}

export function CustomerForm({ onSubmit, isLoading }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerData>({
    name: '',
    email: '',
    accountBalance: 0,
    monthlyIncome: 0,
    creditScore: 0,
    accountAge: 0,
    region: '',
    qualityTag: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CustomerData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-[#f5f5f7] text-xl">1. ДАННЫЕ КЛИЕНТА</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[#86868b] text-sm">Имя клиента</label>
          <input
            type="text"
            placeholder="Иван Петров"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Возраст</label>
            <input
              type="number"
              placeholder="32"
              value={formData.accountAge || ''}
              onChange={(e) => handleChange('accountAge', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Срок существования счета (год)</label>
            <input
              type="number"
              placeholder="5"
              value={formData.creditScore || ''}
              onChange={(e) => handleChange('creditScore', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[#86868b] text-sm">Ежемесячный доход (₽)</label>
          <input
            type="number"
            placeholder="85000"
            value={formData.monthlyIncome || ''}
            onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
            required
            disabled={isLoading}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#86868b] text-sm">Электронная почта</label>
          <input
            type="email"
            placeholder="ivan.petrov@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Регион</label>
            <input
              type="text"
              placeholder="Москва"
              value={formData.region}
              onChange={(e) => handleChange('region', e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Класс клиента</label>
            <select
              value={formData.qualityTag}
              onChange={(e) => handleChange('qualityTag', e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] focus:outline-none focus:border-[#ef3124] transition-colors"
              disabled={isLoading}
            >
              <option value="">Выберите</option>
              <option value="premium">Премиум</option>
              <option value="standard">Стандартный</option>
              <option value="basic">Базовый</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[#86868b] text-sm">Баланс на счёте (₽)</label>
          <input
            type="number"
            placeholder="150000"
            value={formData.accountBalance || ''}
            onChange={(e) => handleChange('accountBalance', Number(e.target.value))}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
            required
            disabled={isLoading}
            min="0"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-[#ef3124] hover:bg-[#d62915] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Обработка...' : 'Загрузить профиль клиента'}
        </button>
      </form>
    </div>
  );
}
