# Эксперт по Альфа-прибыли 
Система прогнозирования доходов клиентов Альфа-Банка

## О проекте
Решение для хакатона Hack&Change 2025 от Альфа-Банка. Интерфейс позволяет сотрудникам банка:
- Получать точные прогнозы доходов клиентов
- Анализировать факторы, влияющие на прогноз (SHAP-объяснения)
- Просматривать персонализированные рекомендации финансовых продуктов
- Мониторить качество работы ML-модели в реальном времени

## Технологии
- **Frontend**: React + TypeScript + Vite
- **Стили**: Tailwind CSS
- **Визуализация**: Chart.js / D3.js (для SHAP-графиков)
- **HTTP-клиент**: Axios
- **Состояние**: React Hooks + Context API

### Предварительные требования
Node.js 18+
.NET 9.0 SDK
Python 3.8+
npm или yarn
2. Python зависимости:
pip install catboost flask>=2.3.0 flask-cors>=4.0.0 pandas>=2.1.0 numpy>=1.24.0 scikit-learn>=1.3.0 lightgbm==4.1.0 joblib>=1.3.0
3. Запуск ML-сервиса:
cd ml_service
python app.py
4. Запуск бэкенда API:
cd backend/Hack-Change_Alpha.API
dotnet clean
dotnet build
dotnet run
5. Запуск фронтенда:
npm install
npm run dev

### Установка и запуск
1. Клонировать репозиторий
2. Войти в папку проекта
3. Установить зависимости
   npm install
4. Запустить dev-сервер
   npm run dev
6. Открыть в браузере адрес, который покажет Vite
   (обычно http://localhost:5173)
