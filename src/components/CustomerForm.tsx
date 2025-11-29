import { useState } from 'react';

interface CustomerData {
  // Новые метрики
  salary_6to12m_avg: number;
  turn_cur_cr_avg_act_v2: number;
  first_salary_income: number;
  turn_cur_db_avg_act_v2: number;
  avg_cur_cr_turn: number;
  hdb_outstand_sum: number;
  hdb_bki_active_cc_max_limit: number;
  dp_ils_paymentssum_avg_12m: number;
  turn_cur_db_avg_v2: number;
  gender: string;
  turn_cur_cr_avg_v2: number;
  incomeValue: number;
  by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp: number;
  incomeValueCategory: string;
  dp_ils_avg_salary_1y: number;
  age: number;
  adminarea: string; 
}

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  isLoading: boolean;
}

export function CustomerForm({ onSubmit, isLoading }: CustomerFormProps) {
  const [clientId, setClientId] = useState('');
  const [formData, setFormData] = useState<CustomerData>({
    salary_6to12m_avg: 0,
    turn_cur_cr_avg_act_v2: 0,
    first_salary_income: 0,
    turn_cur_db_avg_act_v2: 0,
    avg_cur_cr_turn: 0,
    hdb_outstand_sum: 0,
    hdb_bki_active_cc_max_limit: 0,
    dp_ils_paymentssum_avg_12m: 0,
    turn_cur_db_avg_v2: 0,
    gender: '',
    turn_cur_cr_avg_v2: 0,
    incomeValue: 0,
    by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp: 0,
    incomeValueCategory: '',
    dp_ils_avg_salary_1y: 0,
    age: 0,
    adminarea: '', 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CustomerData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Функция для заполнения данных по ID клиента
  const fillClientData = () => {
    if (!clientId.trim()) return;
    
    // Заглушка с тестовыми данными
    const mockData: CustomerData = {
      salary_6to12m_avg: 85000,
      turn_cur_cr_avg_act_v2: 150000,
      first_salary_income: 75000,
      turn_cur_db_avg_act_v2: 45000,
      avg_cur_cr_turn: 120000,
      hdb_outstand_sum: 25000,
      hdb_bki_active_cc_max_limit: 300000,
      dp_ils_paymentssum_avg_12m: 35000,
      turn_cur_db_avg_v2: 50000,
      gender: 'male',
      turn_cur_cr_avg_v2: 130000,
      incomeValue: 90000,
      by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp: 15000,
      incomeValueCategory: 'medium',
      dp_ils_avg_salary_1y: 88000,
      age: 35,
      adminarea: 'Москва', 
    };

    setFormData(mockData);
  };

  return (
    <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-[#f5f5f7] text-xl">1. ДАННЫЕ КЛИЕНТА</h2>
      </div>

      {/* Поле для ID клиента */}
      <div className="mb-6 space-y-2">
        <label className="text-[#86868b] text-sm">ID клиента</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Введите ID клиента"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="flex-1 bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={fillClientData}
            disabled={isLoading || !clientId.trim()}
            className="px-6 py-2.5 bg-[#ef3124] hover:bg-[#d62915] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Заполнить
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Добавлено поле Регион в первую строку */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Регион </label>
            <input
              type="text"
              placeholder="Регион проживания клиента"
              value={formData.adminarea}
              onChange={(e) => handleChange('adminarea', e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Возраст</label>
            <input
              type="number"
              placeholder="Возраст клиента в годах"
              value={formData.age || ''}
              onChange={(e) => handleChange('age', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="18"
              max="100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Средняя зарплата за 6-12 месяцев</label>
            <input
              type="number"
              placeholder="Средний заработок за полгода"
              value={formData.salary_6to12m_avg || ''}
              onChange={(e) => handleChange('salary_6to12m_avg', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Оборот по кредиту (активный)</label>
            <input
              type="number"
              placeholder="Активный кредитный оборот"
              value={formData.turn_cur_cr_avg_act_v2 || ''}
              onChange={(e) => handleChange('turn_cur_cr_avg_act_v2', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Первая зарплата</label>
            <input
              type="number"
              placeholder="Размер первой зарплаты"
              value={formData.first_salary_income || ''}
              onChange={(e) => handleChange('first_salary_income', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Оборот по дебету (активный)</label>
            <input
              type="number"
              placeholder="Активный дебетовый оборот"
              value={formData.turn_cur_db_avg_act_v2 || ''}
              onChange={(e) => handleChange('turn_cur_db_avg_act_v2', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Средний кредитный оборот</label>
            <input
              type="number"
              placeholder="Средний оборот по кредитам"
              value={formData.avg_cur_cr_turn || ''}
              onChange={(e) => handleChange('avg_cur_cr_turn', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Общая сумма задолженности</label>
            <input
              type="number"
              placeholder="Сумма всех задолженностей"
              value={formData.hdb_outstand_sum || ''}
              onChange={(e) => handleChange('hdb_outstand_sum', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Максимальный лимит по кредитным картам</label>
            <input
              type="number"
              placeholder="Макс. лимит активных кредитных карт"
              value={formData.hdb_bki_active_cc_max_limit || ''}
              onChange={(e) => handleChange('hdb_bki_active_cc_max_limit', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Средняя сумма платежей за 12 месяцев</label>
            <input
              type="number"
              placeholder="Средние платежи за год"
              value={formData.dp_ils_paymentssum_avg_12m || ''}
              onChange={(e) => handleChange('dp_ils_paymentssum_avg_12m', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Оборот по дебету</label>
            <input
              type="number"
              placeholder="Общий дебетовый оборот"
              value={formData.turn_cur_db_avg_v2 || ''}
              onChange={(e) => handleChange('turn_cur_db_avg_v2', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Пол</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] focus:outline-none focus:border-[#ef3124] transition-colors"
              disabled={isLoading}
            >
              <option value="">Выберите пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Оборот по кредиту</label>
            <input
              type="number"
              placeholder="Общий кредитный оборот"
              value={formData.turn_cur_cr_avg_v2 || ''}
              onChange={(e) => handleChange('turn_cur_cr_avg_v2', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Значение дохода</label>
            <input
              type="number"
              placeholder="Текущий уровень дохода"
              value={formData.incomeValue || ''}
              onChange={(e) => handleChange('incomeValue', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[#86868b] text-sm">Сумма быстрых платежей СБП</label>
          <input
            type="number"
            placeholder="Сумма исходящих быстрых платежей"
            value={formData.by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp || ''}
            onChange={(e) => handleChange('by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp', Number(e.target.value))}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
            required
            disabled={isLoading}
            min="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Категория дохода</label>
            <select
              value={formData.incomeValueCategory}
              onChange={(e) => handleChange('incomeValueCategory', e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] focus:outline-none focus:border-[#ef3124] transition-colors"
              disabled={isLoading}
            >
              <option value="">Выберите категорию</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[#86868b] text-sm">Средняя зарплата за 1 год</label>
            <input
              type="number"
              placeholder="Средняя годовая зарплата"
              value={formData.dp_ils_avg_salary_1y || ''}
              onChange={(e) => handleChange('dp_ils_avg_salary_1y', Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
              required
              disabled={isLoading}
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-[#ef3124] hover:bg-[#d62915] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Формирование прогноза...' : 'Сформировать прогноз доходности'}
        </button>
      </form>
    </div>
  );
}