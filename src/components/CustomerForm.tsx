import { useState } from 'react';

interface CustomerData {
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

    // Новые поля из второго файла
    hdb_bki_total_cc_max_limit: number;
    turn_cur_cr_max_v2: number;
    hdb_bki_total_pil_max_limit: number;
    turn_cur_cr_sum_v2: number;
    turn_cur_db_sum_v2: number;
    dp_ils_avg_salary_2y: number;
    curr_rur_amt_cm_avg: number;
    by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp: number;
    dp_ils_paymentssum_avg_6m: number;
    avg_cur_db_turn: number;
    avg_credit_turn_rur: number;
    by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona: number;
    turn_cur_cr_7avg_avg_v2: number;
    dp_ils_accpayment_avg_12m: number;
    curbal_usd_amt_cm_avg: number;
    turn_cur_db_max_v2: number;
    turn_other_db_max_v2: number;
    turn_cur_cr_min_v2: number;
    turn_cur_db_min_v2: number;
    per_capita_income_rur_amt: number;
    avg_debet_turn_rur: number;
    hdb_relend_active_max_psk: number;
    dda_rur_amt_curr_v2: number;
    avg_6m_money_transactions: number;
    pil: number;
    avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi: number;
    dp_payoutincomedata_payout_avg_3_month: number;
    hdb_relend_outstand_sum: number;
    total_rur_amt_cm_avg: number;
    mob_cover_days: number;
    curr_rur_amt_3m_avg: number;
    turn_cur_db_7avg_avg_v2: number;
    amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate: number;
    dp_ils_paymentssum_avg_6m_current: number;
    hdb_bki_total_ip_cnt: number;
    hdb_other_outstand_sum: number;
    turn_save_db_min_v2: number;
    avg_by_category__amount__sum__cashflowcategory_name__odezhda: number;
    dda_rur_amt_3m_avg: number;
    avg_amount_daily_transactions_90d: number;
    avg_6m_all: number;
    diff_avg_cr_db_turn: number;
    dp_payoutincomedata_payout_avg_6_month: number;
    by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami: number;
    bki_active_auto_cnt: number;
    avg_by_category__amount__sum__cashflowcategory_name__kosmetika: number;
    dp_ils_avg_salary_3y: number;
    avg_3m_all: number;
    total_rur_amt_cm_avg_period_days_ago_v2: number;
    avg_by_category__amount__sum__cashflowcategory_name__gipermarkety: number;
    city_smart_name: string;
    avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate: number;
    curr_rur_amt_cm_avg_period_days_ago_v2: number;
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

        // Новые поля с значениями по умолчанию
        hdb_bki_total_cc_max_limit: 0,
        turn_cur_cr_max_v2: 0,
        hdb_bki_total_pil_max_limit: 0,
        turn_cur_cr_sum_v2: 0,
        turn_cur_db_sum_v2: 0,
        dp_ils_avg_salary_2y: 0,
        curr_rur_amt_cm_avg: 0,
        by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp: 0,
        dp_ils_paymentssum_avg_6m: 0,
        avg_cur_db_turn: 0,
        avg_credit_turn_rur: 0,
        by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona: 0,
        turn_cur_cr_7avg_avg_v2: 0,
        dp_ils_accpayment_avg_12m: 0,
        curbal_usd_amt_cm_avg: 0,
        turn_cur_db_max_v2: 0,
        turn_other_db_max_v2: 0,
        turn_cur_cr_min_v2: 0,
        turn_cur_db_min_v2: 0,
        per_capita_income_rur_amt: 0,
        avg_debet_turn_rur: 0,
        hdb_relend_active_max_psk: 0,
        dda_rur_amt_curr_v2: 0,
        avg_6m_money_transactions: 0,
        pil: 0,
        avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi: 0,
        dp_payoutincomedata_payout_avg_3_month: 0,
        hdb_relend_outstand_sum: 0,
        total_rur_amt_cm_avg: 0,
        mob_cover_days: 0,
        curr_rur_amt_3m_avg: 0,
        turn_cur_db_7avg_avg_v2: 0,
        amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate: 0,
        dp_ils_paymentssum_avg_6m_current: 0,
        hdb_bki_total_ip_cnt: 0,
        hdb_other_outstand_sum: 0,
        turn_save_db_min_v2: 0,
        avg_by_category__amount__sum__cashflowcategory_name__odezhda: 0,
        dda_rur_amt_3m_avg: 0,
        avg_amount_daily_transactions_90d: 0,
        avg_6m_all: 0,
        diff_avg_cr_db_turn: 0,
        dp_payoutincomedata_payout_avg_6_month: 0,
        by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami: 0,
        bki_active_auto_cnt: 0,
        avg_by_category__amount__sum__cashflowcategory_name__kosmetika: 0,
        dp_ils_avg_salary_3y: 0,
        avg_3m_all: 0,
        total_rur_amt_cm_avg_period_days_ago_v2: 0,
        avg_by_category__amount__sum__cashflowcategory_name__gipermarkety: 0,
        city_smart_name: '',
        avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate: 0,
        curr_rur_amt_cm_avg_period_days_ago_v2: 0,
    });

    const [isFilling, setIsFilling] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (field: keyof CustomerData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const fillClientData = async () => {
        if (!clientId.trim()) {
            alert('Введите ID клиента');
            return;
        }

        setIsFilling(true);

        try {
            const response = await fetch('http://localhost:5000/api/clients/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId }),
            });

            const result = await response.json();

            if (result.success && result.data) {
                // Заполняем форму реальными данными из CSV
                setFormData({
                    // Основные поля
                    salary_6to12m_avg: Number(result.data.salary_6to12m_avg) || 0,
                    turn_cur_cr_avg_act_v2: Number(result.data.turn_cur_cr_avg_act_v2) || 0,
                    first_salary_income: Number(result.data.first_salary_income) || 0,
                    turn_cur_db_avg_act_v2: Number(result.data.turn_cur_db_avg_act_v2) || 0,
                    avg_cur_cr_turn: Number(result.data.avg_cur_cr_turn) || 0,
                    hdb_outstand_sum: Number(result.data.hdb_outstand_sum) || 0,
                    hdb_bki_active_cc_max_limit: Number(result.data.hdb_bki_active_cc_max_limit) || 0,
                    dp_ils_paymentssum_avg_12m: Number(result.data.dp_ils_paymentssum_avg_12m) || 0,
                    turn_cur_db_avg_v2: Number(result.data.turn_cur_db_avg_v2) || 0,
                    gender: String(result.data.gender) || '',
                    turn_cur_cr_avg_v2: Number(result.data.turn_cur_cr_avg_v2) || 0,
                    incomeValue: Number(result.data.incomeValue) || 0,
                    by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp:
                        Number(result.data.by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp) || 0,
                    incomeValueCategory: String(result.data.incomeValueCategory) || '',
                    dp_ils_avg_salary_1y: Number(result.data.dp_ils_avg_salary_1y) || 0,
                    age: Number(result.data.age) || 0,
                    adminarea: result.data.adminarea ? String(result.data.adminarea) : '',

                    // Новые поля из CSV
                    hdb_bki_total_cc_max_limit: Number(result.data.hdb_bki_total_cc_max_limit) || 0,
                    turn_cur_cr_max_v2: Number(result.data.turn_cur_cr_max_v2) || 0,
                    hdb_bki_total_pil_max_limit: Number(result.data.hdb_bki_total_pil_max_limit) || 0,
                    turn_cur_cr_sum_v2: Number(result.data.turn_cur_cr_sum_v2) || 0,
                    turn_cur_db_sum_v2: Number(result.data.turn_cur_db_sum_v2) || 0,
                    dp_ils_avg_salary_2y: Number(result.data.dp_ils_avg_salary_2y) || 0,
                    curr_rur_amt_cm_avg: Number(result.data.curr_rur_amt_cm_avg) || 0,
                    by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp:
                        Number(result.data.by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp) || 0,
                    dp_ils_paymentssum_avg_6m: Number(result.data.dp_ils_paymentssum_avg_6m) || 0,
                    avg_cur_db_turn: Number(result.data.avg_cur_db_turn) || 0,
                    avg_credit_turn_rur: Number(result.data.avg_credit_turn_rur) || 0,
                    by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona:
                        Number(result.data.by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona) || 0,
                    turn_cur_cr_7avg_avg_v2: Number(result.data.turn_cur_cr_7avg_avg_v2) || 0,
                    dp_ils_accpayment_avg_12m: Number(result.data.dp_ils_accpayment_avg_12m) || 0,
                    curbal_usd_amt_cm_avg: Number(result.data.curbal_usd_amt_cm_avg) || 0,
                    turn_cur_db_max_v2: Number(result.data.turn_cur_db_max_v2) || 0,
                    turn_other_db_max_v2: Number(result.data.turn_other_db_max_v2) || 0,
                    turn_cur_cr_min_v2: Number(result.data.turn_cur_cr_min_v2) || 0,
                    turn_cur_db_min_v2: Number(result.data.turn_cur_db_min_v2) || 0,
                    per_capita_income_rur_amt: Number(result.data.per_capita_income_rur_amt) || 0,
                    avg_debet_turn_rur: Number(result.data.avg_debet_turn_rur) || 0,
                    hdb_relend_active_max_psk: Number(result.data.hdb_relend_active_max_psk) || 0,
                    dda_rur_amt_curr_v2: Number(result.data.dda_rur_amt_curr_v2) || 0,
                    avg_6m_money_transactions: Number(result.data.avg_6m_money_transactions) || 0,
                    pil: Number(result.data.pil) || 0,
                    avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi:
                        Number(result.data.avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi) || 0,
                    dp_payoutincomedata_payout_avg_3_month: Number(result.data.dp_payoutincomedata_payout_avg_3_month) || 0,
                    hdb_relend_outstand_sum: Number(result.data.hdb_relend_outstand_sum) || 0,
                    total_rur_amt_cm_avg: Number(result.data.total_rur_amt_cm_avg) || 0,
                    mob_cover_days: Number(result.data.mob_cover_days) || 0,
                    curr_rur_amt_3m_avg: Number(result.data.curr_rur_amt_3m_avg) || 0,
                    turn_cur_db_7avg_avg_v2: Number(result.data.turn_cur_db_7avg_avg_v2) || 0,
                    amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate:
                        Number(result.data.amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate) || 0,
                    dp_ils_paymentssum_avg_6m_current: Number(result.data.dp_ils_paymentssum_avg_6m_current) || 0,
                    hdb_bki_total_ip_cnt: Number(result.data.hdb_bki_total_ip_cnt) || 0,
                    hdb_other_outstand_sum: Number(result.data.hdb_other_outstand_sum) || 0,
                    turn_save_db_min_v2: Number(result.data.turn_save_db_min_v2) || 0,
                    avg_by_category__amount__sum__cashflowcategory_name__odezhda:
                        Number(result.data.avg_by_category__amount__sum__cashflowcategory_name__odezhda) || 0,
                    dda_rur_amt_3m_avg: Number(result.data.dda_rur_amt_3m_avg) || 0,
                    avg_amount_daily_transactions_90d: Number(result.data.avg_amount_daily_transactions_90d) || 0,
                    avg_6m_all: Number(result.data.avg_6m_all) || 0,
                    diff_avg_cr_db_turn: Number(result.data.diff_avg_cr_db_turn) || 0,
                    dp_payoutincomedata_payout_avg_6_month: Number(result.data.dp_payoutincomedata_payout_avg_6_month) || 0,
                    by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami:
                        Number(result.data.by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami) || 0,
                    bki_active_auto_cnt: Number(result.data.bki_active_auto_cnt) || 0,
                    avg_by_category__amount__sum__cashflowcategory_name__kosmetika:
                        Number(result.data.avg_by_category__amount__sum__cashflowcategory_name__kosmetika) || 0,
                    dp_ils_avg_salary_3y: Number(result.data.dp_ils_avg_salary_3y) || 0,
                    avg_3m_all: Number(result.data.avg_3m_all) || 0,
                    total_rur_amt_cm_avg_period_days_ago_v2: Number(result.data.total_rur_amt_cm_avg_period_days_ago_v2) || 0,
                    avg_by_category__amount__sum__cashflowcategory_name__gipermarkety:
                        Number(result.data.avg_by_category__amount__sum__cashflowcategory_name__gipermarkety) || 0,
                    city_smart_name: String(result.data.city_smart_name) || '',
                    avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate:
                        Number(result.data.avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate) || 0,
                    curr_rur_amt_cm_avg_period_days_ago_v2: Number(result.data.curr_rur_amt_cm_avg_period_days_ago_v2) || 0,
                });

                alert('Данные успешно загружены из CSV!');
            } else {
                alert(result.message || 'Клиент не найден');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('❌ Ошибка при загрузке данных. Проверьте, запущен ли бэкенд на localhost:5000');
        } finally {
            setIsFilling(false);
        }
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
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={fillClientData}
                        disabled={isLoading || !clientId.trim() || isFilling}
                        className="px-6 py-2.5 bg-[#ef3124] hover:bg-[#d62915] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isFilling ? 'Загрузка...' : 'Заполнить'}
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
                            disabled={isLoading}
                            min="0"
                        />
                    </div>
                </div>

                {/* Добавленные новые поля */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[#86868b] text-sm">Средняя зарплата за 2 года</label>
                        <input
                            type="number"
                            placeholder="Средняя ЗП за 2 года"
                            value={formData.dp_ils_avg_salary_2y || ''}
                            onChange={(e) => handleChange('dp_ils_avg_salary_2y', Number(e.target.value))}
                            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
                            disabled={isLoading}
                            min="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[#86868b] text-sm">Средняя зарплата за 3 года</label>
                        <input
                            type="number"
                            placeholder="Средняя ЗП за 3 года"
                            value={formData.dp_ils_avg_salary_3y || ''}
                            onChange={(e) => handleChange('dp_ils_avg_salary_3y', Number(e.target.value))}
                            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
                            disabled={isLoading}
                            min="0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[#86868b] text-sm">Средний остаток по текущим счетам</label>
                        <input
                            type="number"
                            placeholder="Средний остаток"
                            value={formData.curr_rur_amt_cm_avg || ''}
                            onChange={(e) => handleChange('curr_rur_amt_cm_avg', Number(e.target.value))}
                            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
                            disabled={isLoading}
                            min="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[#86868b] text-sm">Входящие быстрые платежи СБП</label>
                        <input
                            type="number"
                            placeholder="Входящие СБП платежи"
                            value={formData.by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp || ''}
                            onChange={(e) => handleChange('by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp', Number(e.target.value))}
                            className="w-full bg-[#0a0a0a] border border-[#2d2d2f] rounded-lg px-4 py-2.5 text-[#f5f5f7] placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#ef3124] transition-colors"
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