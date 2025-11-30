from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from catboost import CatBoostRegressor, CatBoostClassifier
import json

app = Flask(__name__)
CORS(app)

# Глобальные переменные для модели
model = None

def load_model():
    global model
    try:
        # Загрузка CatBoost модели
        print("🔄 Загрузка CatBoost модели...")
        model = CatBoostRegressor()
        model.load_model('income_model.cbm')
        
        print("✅ Модель успешно загружена")
        print(f"📊 Количество features в модели: {model.feature_names_}")
        
    except Exception as e:
        print(f"❌ Ошибка загрузки модели: {e}")
        model = None

# Загружаем модель при старте сервиса
load_model()

@app.route('/health', methods=['GET'])
def health():
    model_status = "loaded" if model is not None else "not loaded"
    return jsonify({
        "status": "healthy", 
        "service": "ML Prediction",
        "model": model_status
    })

@app.route('/model/info', methods=['GET'])
def model_info():
    if model is None:
        return jsonify({"error": "Модель не загружена"}), 400
    
    return jsonify({
        "feature_names": model.feature_names_,
        "feature_count": len(model.feature_names_),
        "model_type": "CatBoostRegressor"
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({
                "success": False,
                "error": "ML модель не загружена"
            }), 400

        data = request.json
        print("📨 Получены данные для предсказания:")
        
        # Функция для безопасного преобразования в число
        def safe_float(value):
            if isinstance(value, (int, float)):
                return float(value)
            if isinstance(value, str):
                # Заменяем запятые на точки и убираем пробелы
                cleaned = value.replace(',', '.').replace(' ', '')
                try:
                    return float(cleaned)
                except ValueError:
                    return 0.0
            return 0.0
        
        # Определяем категориальные фичи (должны быть строками)
        categorical_features = {
            'gender', 'adminarea', 'city_smart_name', 'incomeValueCategory',
            'hdb_bki_active_cc_max_limit', 'hdb_bki_total_cc_max_limit', 
            'hdb_bki_total_pil_max_limit', 'hdb_bki_total_ip_cnt',
            'bki_active_auto_cnt'
            }
        
        # Преобразуем названия полей из C# в формат модели
        feature_mapping = {
            'salary6To12mAvg': 'salary_6to12m_avg',
            'turnCurCrAvgActV2': 'turn_cur_cr_avg_act_v2', 
            'firstSalaryIncome': 'first_salary_income',
            'turnCurDbAvgActV2': 'turn_cur_db_avg_act_v2',
            'avgCurCrTurn': 'avg_cur_cr_turn',
            'hdbOutstandSum': 'hdb_outstand_sum',
            'hdbBkiActiveCcMaxLimit': 'hdb_bki_active_cc_max_limit',
            'dpIlsPaymentssumAvg12m': 'dp_ils_paymentssum_avg_12m',
            'turnCurDbAvgV2': 'turn_cur_db_avg_v2',
            'gender': 'gender',
            'turnCurCrAvgV2': 'turn_cur_cr_avg_v2',
            'incomeValue': 'incomeValue',
            'byCategoryAmountSumEoperationTypeNameIshodjaschijBystryjPlatezhSbp': 'by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp',
            'incomeValueCategory': 'incomeValueCategory',
            'dpIlsAvgSalary1y': 'dp_ils_avg_salary_1y',
            'age': 'age',
            'adminArea': 'adminarea',
            'hdbBkiTotalCcMaxLimit': 'hdb_bki_total_cc_max_limit',
            'turnCurCrMaxV2': 'turn_cur_cr_max_v2',
            'hdbBkiTotalPilMaxLimit': 'hdb_bki_total_pil_max_limit',
            'turnCurCrSumV2': 'turn_cur_cr_sum_v2',
            'turnCurDbSumV2': 'turn_cur_db_sum_v2',
            'dpIlsAvgSalary2y': 'dp_ils_avg_salary_2y',
            'currRurAmtCmAvg': 'curr_rur_amt_cm_avg',
            'byCategoryAmountSumEoperationTypeNameVhodjaschijBystryjPlatezhSbp': 'by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp',
            'dpIlsPaymentssumAvg6m': 'dp_ils_paymentssum_avg_6m',
            'avgCurDbTurn': 'avg_cur_db_turn',
            'avgCreditTurnRur': 'avg_credit_turn_rur',
            'byCategoryAmountSumEoperationTypeNamePerevodPoNomeruTelefona': 'by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona',
            'turnCurCr7avgAvgV2': 'turn_cur_cr_7avg_avg_v2',
            'dpIlsAccpaymentAvg12m': 'dp_ils_accpayment_avg_12m',
            'curbalUsdAmtCmAvg': 'curbal_usd_amt_cm_avg',
            'turnCurDbMaxV2': 'turn_cur_db_max_v2',
            'turnOtherDbMaxV2': 'turn_other_db_max_v2',
            'turnCurCrMinV2': 'turn_cur_cr_min_v2',
            'turnCurDbMinV2': 'turn_cur_db_min_v2',
            'perCapitaIncomeRurAmt': 'per_capita_income_rur_amt',
            'avgDebetTurnRur': 'avg_debet_turn_rur',
            'hdbRelendActiveMaxPsk': 'hdb_relend_active_max_psk',
            'ddaRurAmtCurrV2': 'dda_rur_amt_curr_v2',
            'avg6mMoneyTransactions': 'avg_6m_money_transactions',
            'pil': 'pil',
            'avgByCategoryAmountSumCashflowcategoryNameElektronnyeDengi': 'avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi',
            'dpPayoutincomedataPayoutAvg3Month': 'dp_payoutincomedata_payout_avg_3_month',
            'hdbRelendOutstandSum': 'hdb_relend_outstand_sum',
            'totalRurAmtCmAvg': 'total_rur_amt_cm_avg',
            'mobCoverDays': 'mob_cover_days',
            'currRurAmt3mAvg': 'curr_rur_amt_3m_avg',
            'turnCurDb7avgAvgV2': 'turn_cur_db_7avg_avg_v2',
            'amountByCategory90dSummarurAmtSumCashflowcategoryNameVydachaNalichnyhVBankomate': 'amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate',
            'dpIlsPaymentssumAvg6mCurrent': 'dp_ils_paymentssum_avg_6m_current',
            'hdbBkiTotalIpCnt': 'hdb_bki_total_ip_cnt',
            'hdbOtherOutstandSum': 'hdb_other_outstand_sum',
            'turnSaveDbMinV2': 'turn_save_db_min_v2',
            'avgByCategoryAmountSumCashflowcategoryNameOdezhda': 'avg_by_category__amount__sum__cashflowcategory_name__odezhda',
            'ddaRurAmt3mAvg': 'dda_rur_amt_3m_avg',
            'avgAmountDailyTransactions90d': 'avg_amount_daily_transactions_90d',
            'avg6mAll': 'avg_6m_all',
            'diffAvgCrDbTurn': 'diff_avg_cr_db_turn',
            'dpPayoutincomedataPayoutAvg6Month': 'dp_payoutincomedata_payout_avg_6_month',
            'byCategoryAmountSumEoperationTypeNamePerevodMezhduSvoimiSchetami': 'by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami',
            'bkiActiveAutoCnt': 'bki_active_auto_cnt',
            'avgByCategoryAmountSumCashflowcategoryNameKosmetika': 'avg_by_category__amount__sum__cashflowcategory_name__kosmetika',
            'dpIlsAvgSalary3y': 'dp_ils_avg_salary_3y',
            'avg3mAll': 'avg_3m_all',
            'totalRurAmtCmAvgPeriodDaysAgoV2': 'total_rur_amt_cm_avg_period_days_ago_v2',
            'avgByCategoryAmountSumCashflowcategoryNameGipermarkety': 'avg_by_category__amount__sum__cashflowcategory_name__gipermarkety',
            'citySmartName': 'city_smart_name',
            'avgByCategoryAmountSumCashflowcategoryNameVydachaNalichnyhVBankomate': 'avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate',
            'currRurAmtCmAvgPeriodDaysAgoV2': 'curr_rur_amt_cm_avg_period_days_ago_v2'
        }
        
        # Создаем DataFrame с преобразованными значениями
        features_dict = {}
        for csharp_name, model_name in feature_mapping.items():
            value = data.get(csharp_name, 0)
            
            if model_name in categorical_features:
                # 🔥 Для категориальных фичей преобразуем в строку
                if value is None:
                    value = ""
                elif isinstance(value, (int, float)):
                    value = str(int(value))  # Преобразуем в целое число, затем в строку
                else:
                    value = str(value)
            else:
                # 🔥 Для числовых фичей преобразуем в float
                value = safe_float(value)
            
            features_dict[model_name] = value
        
        features_df = pd.DataFrame([features_dict])
        
        # Убедимся что порядок фич соответствует модели
        if hasattr(model, 'feature_names_'):
            # Используем только те фичи, которые есть в модели
            available_features = [f for f in model.feature_names_ if f in features_df.columns]
            missing_features = [f for f in model.feature_names_ if f not in features_df.columns]
            
            if missing_features:
                print(f"Отсутствующие фичи в данных: {missing_features}")
                # Заполняем недостающие фичи значениями по умолчанию
                for feature in missing_features:
                    if feature in categorical_features:
                        features_df[feature] = ""
                    else:
                        features_df[feature] = 0.0
            
            features_df = features_df[model.feature_names_]
        
        print(f"Features для предсказания: {list(features_df.columns)}")
        print(f"Данные после преобразования: {features_df.iloc[0].to_dict()}")
        
        # Убедимся, что категориальные фичи имеют правильный тип
        for col in features_df.columns:
            if col in categorical_features:
                features_df[col] = features_df[col].astype(str)
        
        # Предсказание
        prediction = model.predict(features_df)[0]
        print(f"Предсказанный доход: {prediction:.2f}")
        
        # CatBoost Feature Importance
        feature_importance_scores = model.get_feature_importance()
        
        # Создаем словарь важности признаков
        feature_importance = {}
        for i, feature_name in enumerate(features_df.columns):
            feature_importance[feature_name] = float(feature_importance_scores[i])
        
        # Нормализуем важность признаков до 100%
        total_importance = sum(feature_importance.values())
        if total_importance > 0:
            for feature in feature_importance:
                feature_importance[feature] = (feature_importance[feature] / total_importance) * 100
        
        # Берем топ-10 самых важных признаков
        top_features = dict(sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:10])
        print(f"Топ-10 важных признаков: {top_features}")
        
        return jsonify({
            "success": True,
            "predictedIncome": float(prediction),
            "featureImportance": top_features,
            "baseValue": float(prediction),
            "shapValues": list(top_features.values()),
            "modelType": "CatBoost"
        })
        
    except Exception as e:
        print(f"Ошибка предсказания: {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

@app.route('/features', methods=['GET'])
def get_features():
    """Возвращает список фич которые ожидает модель"""
    if model is None or not hasattr(model, 'feature_names_'):
        return jsonify({"error": "Модель не загружена"}), 400
    
    return jsonify({
        "features": model.feature_names_,
        "count": len(model.feature_names_)
    })

if __name__ == '__main__':
    print("Запуск ML сервиса на http://localhost:8000")
    print("Убедитесь что income_model.cbm находится в той же папке")
    app.run(host='localhost', port=8000, debug=True)