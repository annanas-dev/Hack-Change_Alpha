import { useState } from 'react';
import { Header } from './components/Header';
import { CustomerForm } from './components/CustomerForm';
import { RevenuePrediction } from './components/RevenuePrediction';
import { ProductRecommendations } from './components/ProductRecommendations';
import { ActionButtons } from './components/ActionButtons';
import { toast, Toaster } from 'sonner';

export interface CustomerData {
    // Основные поля
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

export interface Prediction {
    revenue: number;
    minRange: number;
    maxRange: number;
    reliability: string;
    factors: { name: string; value: number; impact: number }[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    expectedRevenue: number;
    category: string;
    cashback?: string;
    limit?: string;
    reasons: string[];
}

export default function App() {
    const [customerData, setCustomerData] = useState<CustomerData | null>(null);
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleCustomerSubmit = async (data: CustomerData) => {
        setCustomerData(data);
        setIsLoading(true);

        try {
            const mlResponse = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Основные поля
                    salary6To12mAvg: data.salary_6to12m_avg,
                    turnCurCrAvgActV2: data.turn_cur_cr_avg_act_v2,
                    firstSalaryIncome: data.first_salary_income,
                    turnCurDbAvgActV2: data.turn_cur_db_avg_act_v2,
                    avgCurCrTurn: data.avg_cur_cr_turn,
                    hdbOutstandSum: data.hdb_outstand_sum,
                    hdbBkiActiveCcMaxLimit: data.hdb_bki_active_cc_max_limit,
                    dpIlsPaymentssumAvg12m: data.dp_ils_paymentssum_avg_12m,
                    turnCurDbAvgV2: data.turn_cur_db_avg_v2,
                    gender: data.gender,
                    turnCurCrAvgV2: data.turn_cur_cr_avg_v2,
                    incomeValue: data.incomeValue,
                    byCategoryAmountSumEoperationTypeNameIshodjaschijBystryjPlatezhSbp:
                        data.by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp,
                    incomeValueCategory: data.incomeValueCategory,
                    dpIlsAvgSalary1y: data.dp_ils_avg_salary_1y,
                    age: data.age,
                    adminArea: data.adminarea,

                    // Новые поля для ML модели
                    hdbBkiTotalCcMaxLimit: data.hdb_bki_total_cc_max_limit,
                    turnCurCrMaxV2: data.turn_cur_cr_max_v2,
                    hdbBkiTotalPilMaxLimit: data.hdb_bki_total_pil_max_limit,
                    turnCurCrSumV2: data.turn_cur_cr_sum_v2,
                    turnCurDbSumV2: data.turn_cur_db_sum_v2,
                    dpIlsAvgSalary2y: data.dp_ils_avg_salary_2y,
                    currRurAmtCmAvg: data.curr_rur_amt_cm_avg,
                    byCategoryAmountSumEoperationTypeNameVhodjaschijBystryjPlatezhSbp:
                        data.by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp,
                    dpIlsPaymentssumAvg6m: data.dp_ils_paymentssum_avg_6m,
                    avgCurDbTurn: data.avg_cur_db_turn,
                    avgCreditTurnRur: data.avg_credit_turn_rur,
                    byCategoryAmountSumEoperationTypeNamePerevodPoNomeruTelefona:
                        data.by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona,
                    turnCurCr7avgAvgV2: data.turn_cur_cr_7avg_avg_v2,
                    dpIlsAccpaymentAvg12m: data.dp_ils_accpayment_avg_12m,
                    curbalUsdAmtCmAvg: data.curbal_usd_amt_cm_avg,
                    turnCurDbMaxV2: data.turn_cur_db_max_v2,
                    turnOtherDbMaxV2: data.turn_other_db_max_v2,
                    turnCurCrMinV2: data.turn_cur_cr_min_v2,
                    turnCurDbMinV2: data.turn_cur_db_min_v2,
                    perCapitaIncomeRurAmt: data.per_capita_income_rur_amt,
                    avgDebetTurnRur: data.avg_debet_turn_rur,
                    hdbRelendActiveMaxPsk: data.hdb_relend_active_max_psk,
                    ddaRurAmtCurrV2: data.dda_rur_amt_curr_v2,
                    avg6mMoneyTransactions: data.avg_6m_money_transactions,
                    pil: data.pil,
                    avgByCategoryAmountSumCashflowcategoryNameElektronnyeDengi:
                        data.avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi,
                    dpPayoutincomedataPayoutAvg3Month: data.dp_payoutincomedata_payout_avg_3_month,
                    hdbRelendOutstandSum: data.hdb_relend_outstand_sum,
                    totalRurAmtCmAvg: data.total_rur_amt_cm_avg,
                    mobCoverDays: data.mob_cover_days,
                    currRurAmt3mAvg: data.curr_rur_amt_3m_avg,
                    turnCurDb7avgAvgV2: data.turn_cur_db_7avg_avg_v2,
                    amountByCategory90dSummarurAmtSumCashflowcategoryNameVydachaNalichnyhVBankomate:
                        data.amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate,
                    dpIlsPaymentssumAvg6mCurrent: data.dp_ils_paymentssum_avg_6m_current,
                    hdbBkiTotalIpCnt: data.hdb_bki_total_ip_cnt,
                    hdbOtherOutstandSum: data.hdb_other_outstand_sum,
                    turnSaveDbMinV2: data.turn_save_db_min_v2,
                    avgByCategoryAmountSumCashflowcategoryNameOdezhda:
                        data.avg_by_category__amount__sum__cashflowcategory_name__odezhda,
                    ddaRurAmt3mAvg: data.dda_rur_amt_3m_avg,
                    avgAmountDailyTransactions90d: data.avg_amount_daily_transactions_90d,
                    avg6mAll: data.avg_6m_all,
                    diffAvgCrDbTurn: data.diff_avg_cr_db_turn,
                    dpPayoutincomedataPayoutAvg6Month: data.dp_payoutincomedata_payout_avg_6_month,
                    byCategoryAmountSumEoperationTypeNamePerevodMezhduSvoimiSchetami:
                        data.by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami,
                    bkiActiveAutoCnt: data.bki_active_auto_cnt,
                    avgByCategoryAmountSumCashflowcategoryNameKosmetika:
                        data.avg_by_category__amount__sum__cashflowcategory_name__kosmetika,
                    dpIlsAvgSalary3y: data.dp_ils_avg_salary_3y,
                    avg3mAll: data.avg_3m_all,
                    totalRurAmtCmAvgPeriodDaysAgoV2: data.total_rur_amt_cm_avg_period_days_ago_v2,
                    avgByCategoryAmountSumCashflowcategoryNameGipermarkety:
                        data.avg_by_category__amount__sum__cashflowcategory_name__gipermarkety,
                    citySmartName: data.city_smart_name,
                    avgByCategoryAmountSumCashflowcategoryNameVydachaNalichnyhVBankomate:
                        data.avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate,
                    currRurAmtCmAvgPeriodDaysAgoV2: data.curr_rur_amt_cm_avg_period_days_ago_v2
                }),
            });

            console.log(' Статус ответа:', mlResponse.status, mlResponse.statusText);
            const mlResult = await mlResponse.json();

            console.log('Ответ от Python ML:', mlResult);

            if (!mlResult.success) {
                throw new Error(mlResult.error || 'ML prediction failed');
            }

            const fixNumberFormat = (obj: any): any => {
                if (typeof obj === 'string' && /^\d+,\d+$/.test(obj)) {
                    return parseFloat(obj.replace(',', '.'));
                }
                if (Array.isArray(obj)) {
                    return obj.map(fixNumberFormat);
                }
                if (obj && typeof obj === 'object') {
                    const result: any = {};
                    for (const [key, value] of Object.entries(obj)) {
                        result[key] = fixNumberFormat(value);
                    }
                    return result;
                }
                return obj;
            };

            //const fixedResult = fixNumberFormat(mlResult);

            const predictedIncome = mlResult.predictedIncome;

            const featureImportance = mlResult.featureImportance;

            const factors = Object.entries(featureImportance)
                .map(([featureName, impact]) => ({
                    name: formatFeatureName(featureName),
                    value: getFeatureValue(data, featureName),
                    impact: Math.round(impact as number)
                }))
                .sort((a, b) => b.impact - a.impact)
                .slice(0, 5); 

            const revenue = Math.round(predictedIncome);
            const minRange = Math.round(revenue * 0.85);
            const maxRange = Math.round(revenue * 1.15);

            const reliability = determineReliability(predictedIncome, data);

            setPrediction({
                revenue,
                minRange,
                maxRange,
                reliability,
                factors
            });

            toast.success('Прогноз получен!');

        } catch (error) {
            console.error('Prediction error:', error);
            // 🔄 FALLBACK НА СТАРУЮ ЛОГИКУ
            useFallbackPrediction(data);
            toast.warning('Используется базовый прогноз');
        } finally {
            setIsLoading(false);
        }
    };

    // 🔧 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    const formatFeatureName = (name: string): string => {
        const names: { [key: string]: string } = {
            'salary_6to12m_avg': 'Средняя зарплата 6-12 мес',
            'turn_cur_cr_avg_act_v2': 'Оборот по кредиту (активный)',
            'first_salary_income': 'Первая зарплата',
            'turn_cur_db_avg_act_v2': 'Оборот по дебету (активный)',
            'avg_cur_cr_turn': 'Средний кредитный оборот',
            'hdb_outstand_sum': 'Общая сумма задолженности',
            'hdb_bki_active_cc_max_limit': 'Макс. лимит по кредитным картам',
            'dp_ils_paymentssum_avg_12m': 'Средняя сумма платежей за 12 мес',
            'turn_cur_db_avg_v2': 'Оборот по дебету',
            'gender': 'Пол',
            'turn_cur_cr_avg_v2': 'Оборот по кредиту',
            'incomeValue': 'Текущий доход',
            'by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp': 'Сумма быстрых платежей СБП',
            'incomeValueCategory': 'Категория дохода',
            'dp_ils_avg_salary_1y': 'Средняя годовая зарплата',
            'age': 'Возраст',
            'adminarea': 'Регион',
            // Добавьте здесь новые поля по мере необходимости
            'dp_ils_avg_salary_2y': 'Средняя зарплата за 2 года',
            'dp_ils_avg_salary_3y': 'Средняя зарплата за 3 года',
            'curr_rur_amt_cm_avg': 'Средний остаток по текущим счетам',
            'avg_cur_db_turn': 'Средний дебетовый оборот',
            'per_capita_income_rur_amt': 'Среднедушевой доход',
            'hdb_bki_total_cc_max_limit': 'Общий лимит по кредитным картам',
            'turn_cur_cr_max_v2': 'Максимальный кредитный оборот',
            'hdb_bki_total_pil_max_limit': 'Макс. лимит по потребительским кредитам',
            'turn_cur_cr_sum_v2': 'Суммарный кредитный оборот',
            'turn_cur_db_sum_v2': 'Суммарный дебетовый оборот',
            'by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp': 'Входящие быстрые платежи СБП',
            'avg_credit_turn_rur': 'Средний кредитный оборот в рублях',
            'by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona': 'Переводы по номеру телефона',
            'turn_cur_cr_7avg_avg_v2': '7-дневный средний кредитный оборот',
            'dp_ils_accpayment_avg_12m': 'Средние платежи по счетам за 12 мес',
            'curbal_usd_amt_cm_avg': 'Средний остаток в USD',
            'turn_cur_db_max_v2': 'Максимальный дебетовый оборот',
            'turn_other_db_max_v2': 'Макс. оборот по другим дебетовым операциям',
            'turn_cur_cr_min_v2': 'Минимальный кредитный оборот',
            'turn_cur_db_min_v2': 'Минимальный дебетовый оборот',
            'avg_debet_turn_rur': 'Средний дебетовый оборот в рублях',
            'hdb_relend_active_max_psk': 'Макс. ПСК по рефинансированию',
            'dda_rur_amt_curr_v2': 'Текущий остаток по счетам в рублях',
            'avg_6m_money_transactions': 'Средние денежные операции за 6 мес',
            'pil': 'Потребительские кредиты',
            'avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi': 'Средние электронные платежи',
            'dp_payoutincomedata_payout_avg_3_month': 'Средние выплаты за 3 месяца',
            'hdb_relend_outstand_sum': 'Сумма рефинансированной задолженности',
            'total_rur_amt_cm_avg': 'Средний общий остаток в рублях',
            'mob_cover_days': 'Дни мобильного покрытия',
            'curr_rur_amt_3m_avg': 'Средний остаток за 3 месяца',
            'turn_cur_db_7avg_avg_v2': '7-дневный средний дебетовый оборот',
            'amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate': 'Выдача наличных в банкоматах за 90 дней',
            'dp_ils_paymentssum_avg_6m_current': 'Текущие средние платежи за 6 мес',
            'hdb_bki_total_ip_cnt': 'Общее количество ИП',
            'hdb_other_outstand_sum': 'Прочая сумма задолженности',
            'turn_save_db_min_v2': 'Минимальный оборот по сберегательным счетам',
            'avg_by_category__amount__sum__cashflowcategory_name__odezhda': 'Средние расходы на одежду',
            'dda_rur_amt_3m_avg': 'Средний остаток по счетам за 3 месяца',
            'avg_amount_daily_transactions_90d': 'Средняя сумма дневных операций за 90 дней',
            'avg_6m_all': 'Средние показатели за 6 месяцев',
            'diff_avg_cr_db_turn': 'Разница кредитного и дебетового оборотов',
            'dp_payoutincomedata_payout_avg_6_month': 'Средние выплаты за 6 месяцев',
            'by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami': 'Переводы между своими счетами',
            'bki_active_auto_cnt': 'Количество активных авто',
            'avg_by_category__amount__sum__cashflowcategory_name__kosmetika': 'Средние расходы на косметику',
            'avg_3m_all': 'Средние показатели за 3 месяца',
            'total_rur_amt_cm_avg_period_days_ago_v2': 'Общий остаток в рублях ранее',
            'avg_by_category__amount__sum__cashflowcategory_name__gipermarkety': 'Средние расходы в гипермаркетах',
            'city_smart_name': 'Город',
            'avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate': 'Средняя выдача наличных в банкоматах',
            'curr_rur_amt_cm_avg_period_days_ago_v2': 'Текущий остаток в рублях ранее'
        };
        return names[name] || name;
    };

    const getFeatureValue = (data: CustomerData, featureName: string): number => {
        const featureMap: { [key: string]: number } = {
            'salary_6to12m_avg': data.salary_6to12m_avg,
            'turn_cur_cr_avg_act_v2': data.turn_cur_cr_avg_act_v2,
            'first_salary_income': data.first_salary_income,
            'turn_cur_db_avg_act_v2': data.turn_cur_db_avg_act_v2,
            'avg_cur_cr_turn': data.avg_cur_cr_turn,
            'hdb_outstand_sum': data.hdb_outstand_sum,
            'hdb_bki_active_cc_max_limit': data.hdb_bki_active_cc_max_limit,
            'dp_ils_paymentssum_avg_12m': data.dp_ils_paymentssum_avg_12m,
            'turn_cur_db_avg_v2': data.turn_cur_db_avg_v2,
            'turn_cur_cr_avg_v2': data.turn_cur_cr_avg_v2,
            'incomeValue': data.incomeValue,
            'by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp':
                data.by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp,
            'dp_ils_avg_salary_1y': data.dp_ils_avg_salary_1y,
            'dp_ils_avg_salary_2y': data.dp_ils_avg_salary_2y,
            'dp_ils_avg_salary_3y': data.dp_ils_avg_salary_3y,
            'age': data.age,
            'curr_rur_amt_cm_avg': data.curr_rur_amt_cm_avg,
            'avg_cur_db_turn': data.avg_cur_db_turn,
            'per_capita_income_rur_amt': data.per_capita_income_rur_amt,
            'hdb_bki_total_cc_max_limit': data.hdb_bki_total_cc_max_limit,
            'turn_cur_cr_max_v2': data.turn_cur_cr_max_v2,
            'hdb_bki_total_pil_max_limit': data.hdb_bki_total_pil_max_limit,
            'turn_cur_cr_sum_v2': data.turn_cur_cr_sum_v2,
            'turn_cur_db_sum_v2': data.turn_cur_db_sum_v2,
            'by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp': data.by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp,
            'dp_ils_paymentssum_avg_6m': data.dp_ils_paymentssum_avg_6m,
            'avg_credit_turn_rur': data.avg_credit_turn_rur,
            'by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona': data.by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona,
            'turn_cur_cr_7avg_avg_v2': data.turn_cur_cr_7avg_avg_v2,
            'dp_ils_accpayment_avg_12m': data.dp_ils_accpayment_avg_12m,
            'curbal_usd_amt_cm_avg': data.curbal_usd_amt_cm_avg,
            'turn_cur_db_max_v2': data.turn_cur_db_max_v2,
            'turn_other_db_max_v2': data.turn_other_db_max_v2,
            'turn_cur_cr_min_v2': data.turn_cur_cr_min_v2,
            'turn_cur_db_min_v2': data.turn_cur_db_min_v2,
            'avg_debet_turn_rur': data.avg_debet_turn_rur,
            'hdb_relend_active_max_psk': data.hdb_relend_active_max_psk,
            'dda_rur_amt_curr_v2': data.dda_rur_amt_curr_v2,
            'avg_6m_money_transactions': data.avg_6m_money_transactions,
            'pil': data.pil,
            'avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi': data.avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi,
            'dp_payoutincomedata_payout_avg_3_month': data.dp_payoutincomedata_payout_avg_3_month,
            'hdb_relend_outstand_sum': data.hdb_relend_outstand_sum,
            'total_rur_amt_cm_avg': data.total_rur_amt_cm_avg,
            'mob_cover_days': data.mob_cover_days,
            'curr_rur_amt_3m_avg': data.curr_rur_amt_3m_avg,
            'turn_cur_db_7avg_avg_v2': data.turn_cur_db_7avg_avg_v2,
            'amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate': data.amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate,
            'dp_ils_paymentssum_avg_6m_current': data.dp_ils_paymentssum_avg_6m_current,
            'hdb_bki_total_ip_cnt': data.hdb_bki_total_ip_cnt,
            'hdb_other_outstand_sum': data.hdb_other_outstand_sum,
            'turn_save_db_min_v2': data.turn_save_db_min_v2,
            'avg_by_category__amount__sum__cashflowcategory_name__odezhda': data.avg_by_category__amount__sum__cashflowcategory_name__odezhda,
            'dda_rur_amt_3m_avg': data.dda_rur_amt_3m_avg,
            'avg_amount_daily_transactions_90d': data.avg_amount_daily_transactions_90d,
            'avg_6m_all': data.avg_6m_all,
            'diff_avg_cr_db_turn': data.diff_avg_cr_db_turn,
            'dp_payoutincomedata_payout_avg_6_month': data.dp_payoutincomedata_payout_avg_6_month,
            'by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami': data.by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami,
            'bki_active_auto_cnt': data.bki_active_auto_cnt,
            'avg_by_category__amount__sum__cashflowcategory_name__kosmetika': data.avg_by_category__amount__sum__cashflowcategory_name__kosmetika,
            'avg_3m_all': data.avg_3m_all,
            'total_rur_amt_cm_avg_period_days_ago_v2': data.total_rur_amt_cm_avg_period_days_ago_v2,
            'avg_by_category__amount__sum__cashflowcategory_name__gipermarkety': data.avg_by_category__amount__sum__cashflowcategory_name__gipermarkety,
            'avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate': data.avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate,
            'curr_rur_amt_cm_avg_period_days_ago_v2': data.curr_rur_amt_cm_avg_period_days_ago_v2
        };
        return featureMap[featureName] || 0;
    };

    const determineReliability = (predictedIncome: number, data: CustomerData): string => {
        // Сравниваем предсказанный доход с текущим доходом клиента
        const incomeDifference = Math.abs(predictedIncome - data.incomeValue);
        const relativeDifference = incomeDifference / data.incomeValue;

        // Определяем надежность на основе разницы и стабильности доходов
        if (relativeDifference < 0.1 && data.salary_6to12m_avg > 50000) {
            return 'Очень высокая';
        } else if (relativeDifference < 0.2 && data.dp_ils_avg_salary_1y > 40000) {
            return 'Высокая';
        } else if (relativeDifference > 0.5 || data.incomeValue < 20000) {
            return 'Низкая';
        } else {
            return 'Средняя';
        }
    };

    const useFallbackPrediction = (data: CustomerData) => {
        const baseRevenue =
            data.salary_6to12m_avg * 0.8 +
            data.incomeValue * 0.6 +
            data.dp_ils_avg_salary_1y * 0.4 +
            data.age * 100;

        const revenue = Math.round(baseRevenue);
        const minRange = Math.round(revenue * 0.85);
        const maxRange = Math.round(revenue * 1.15);

        let reliability = 'Средняя';
        if (data.incomeValue > 100000 && data.salary_6to12m_avg > 80000) {
            reliability = 'Очень высокая';
        } else if (data.incomeValue > 70000 && data.dp_ils_avg_salary_1y > 60000) {
            reliability = 'Высокая';
        } else if (data.incomeValue < 30000 || data.salary_6to12m_avg < 25000) {
            reliability = 'Низкая';
        }

        const factors = [
            {
                name: 'Средняя зарплата 6-12 мес',
                value: data.salary_6to12m_avg,
                impact: Math.round(data.salary_6to12m_avg * 0.8)
            },
            {
                name: 'Текущий доход',
                value: data.incomeValue,
                impact: Math.round(data.incomeValue * 0.6)
            },
            {
                name: 'Средняя годовая зарплата',
                value: data.dp_ils_avg_salary_1y,
                impact: Math.round(data.dp_ils_avg_salary_1y * 0.4)
            },
            {
                name: 'Возраст клиента',
                value: data.age,
                impact: Math.round(data.age * 100)
            },
            {
                name: 'Кредитный оборот',
                value: data.turn_cur_cr_avg_v2,
                impact: Math.round(data.turn_cur_cr_avg_v2 * 0.1)
            },
        ];

        setPrediction({
            revenue,
            minRange,
            maxRange,
            reliability,
            factors
        });
    };

    const handleProductToggle = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSendEmail = () => {
        if (selectedProducts.length === 0) {
            toast.error('Выберите хотя бы один продукт');
            return;
        }
        toast.success(`Предложение отправлено клиенту`);
    };

    const handleSendToCallCenter = () => {
        if (selectedProducts.length === 0) {
            toast.error('Выберите хотя бы один продукт');
            return;
        }
        toast.success(`Передано в колл-центр`);
    };

    const handleGenerateOffer = () => {
        if (selectedProducts.length === 0) {
            toast.error('Выберите хотя бы один продукт');
            return;
        }
        toast.success('Документ с предложением сформирован');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Toaster position="top-right" richColors />

            <Header />

            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="mb-6 flex items-center gap-3 text-[#86868b] text-sm">
                    <span>КЛИЕНТ</span>
                    <span>→</span>
                    <span className="text-[#86868b]">ПРОГНОЗ ДОХОДНОСТИ</span>
                    <span>→</span>
                    <span className="text-[#86868b]">ПРЕДЛОЖЕНИЯ</span>
                </div>

                {/* Сетка 4 колонки для формы и прогноза */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    <div className="xl:col-span-3">
                        <CustomerForm
                            onSubmit={handleCustomerSubmit}
                            isLoading={isLoading}
                        />
                    </div>

                    <div className="xl:col-span-1">
                        {prediction && customerData && (
                            <RevenuePrediction
                                prediction={prediction}
                                customerData={customerData}
                            />
                        )}
                    </div>
                </div>

                {/* Продукты и кнопки действий */}
                {prediction && (
                    <div className="mt-6 space-y-6">
                        <ProductRecommendations
                            customerData={customerData!}
                            selectedProducts={selectedProducts}
                            onProductToggle={handleProductToggle}
                        />

                        <ActionButtons
                            onSendEmail={handleSendEmail}
                            onSendToCallCenter={handleSendToCallCenter}
                            onGenerateOffer={handleGenerateOffer}
                            hasSelectedProducts={selectedProducts.length > 0}
                            selectedCount={selectedProducts.length}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}