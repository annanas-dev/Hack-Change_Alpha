import { Checkbox } from './ui/checkbox';
import type { CustomerData, Product } from '../App';

interface ProductRecommendationsProps {
  customerData: CustomerData;
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

const getRecommendedProducts = (customerData: CustomerData): Product[] => {
  const products: Product[] = [];
  const income = customerData.incomeValue || customerData.salary_6to12m_avg;
  const age = customerData.age;
  const isHighIncome = income > 200000;
  const isMediumIncome = income > 70000 && income <= 200000;
  const gender = customerData.gender;

  // Премиальный сегмент
  if (isHighIncome) {
    products.push(
      {
        id: 'alfa-only',
        name: 'Alfa Only',
        description: 'Премиальное обслуживание с эксклюзивными привилегиями',
        expectedRevenue: 400000,
        category: 'Premium',
        cashback: 'до 100% в барабане + 7% в категориях',
        limit: 'до 15 000 000 ₽',
        reasons: [
          'Соответствуете условиям бесплатного обслуживания',
          'Международные операции и крупные суммы',
          'Премиальные сервисы и VIP-доступ',
        ],
      },
      {
        id: 'alfa-travel',
        name: 'Alfa Travel',
        description: 'Карта для путешествий с повышенным кэшбэком милями',
        expectedRevenue: 150000,
        category: 'Travel',
        cashback: 'до 30% милями',
        limit: 'до 5 000 миль/мес',
        reasons: [
          'Регулярные покупки авиабилетов и отелей',
          'Большие траты в категории путешествий',
          'Бесплатное обслуживание карты',
        ],
      },
      {
        id: 'multicurrency',
        name: 'Мультивалютный счёт',
        description: 'Счета в разных валютах с выгодной конвертацией',
        expectedRevenue: 120000,
        category: 'International',
        cashback: '0% комиссии за конвертацию',
        limit: 'Неограниченные переводы',
        reasons: [
          'Международные операции и зарубежные доходы',
          'Частые поездки за границу',
          'Сниженные тарифы на переводы',
        ],
      }
    );
  }

  // Средний сегмент
  if (isMediumIncome) {
    products.push(
      {
        id: 'credit-classic',
        name: 'Кредитная карта Classic',
        description: 'Льготный период 60 дней и кэшбэк у партнёров',
        expectedRevenue: 80000,
        category: 'Credit',
        cashback: 'до 30% у партнёров',
        limit: 'до 500 000 ₽',
        reasons: [
          'Стабильная зарплата для своевременных платежей',
          'Возможность распределения крупных трат',
          'Улучшение кредитной истории',
        ],
      },
      {
        id: 'mortgage-standard',
        name: 'Ипотека Standard',
        description: 'Выгодная ипотека с первоначальным взносом от 10%',
        expectedRevenue: 300000,
        category: 'Mortgage',
        limit: 'до 30 000 000 ₽',
        reasons: [
          'Стабильный доход для долгосрочных обязательств',
          'Покупка жилья как приоритетная цель',
          'Конкурентная процентная ставка',
        ],
      },
      {
        id: 'savings-account',
        name: 'Накопительный счёт',
        description: 'Стабильный доход на остатки с возможностью снятия',
        expectedRevenue: 45000,
        category: 'Savings',
        cashback: 'до 13% годовых',
        limit: 'от 10 000 ₽',
        reasons: [
          'Формирование финансовой подушки безопасности',
          'Надёжность и стабильный пассивный доход',
          'Минимальные риски при высокой доступности',
        ],
      }
    );
  }

  // Базовый сегмент для всех
  products.push(
    {
      id: 'orange-card',
      name: 'Апельсиновая карта',
      description: 'Максимальный кэшбэк в продуктовых магазинах',
      expectedRevenue: 35000,
      category: 'Debit',
      cashback: '7% в Пятёрочке и Перекрёстке',
      limit: 'до 11% с пакетом услуг',
      reasons: [
        'Экономия на ежедневных покупках',
        'Бесплатное обслуживание при лёгких условиях',
        'Максимальная выгода на продуктах',
      ],
    }
  );

  // Специальные предложения по демографии
  if (age >= 25 && age <= 40) {
    products.push(
      {
        id: 'auto-loan',
        name: 'Автокредит',
        description: 'Покупка автомобиля с выгодной ставкой',
        expectedRevenue: 180000,
        category: 'Auto',
        limit: 'до 5 000 000 ₽',
        reasons: [
          'Оптимальный возраст для покупки автомобиля',
          'Стабильный доход для кредитных обязательств',
          'Длительный срок кредитования',
        ],
      }
    );
  }

  if (gender === 'female' && age >= 18 && age <= 35) {
    products.push(
      {
        id: 'golden-apple',
        name: 'Карта Золотое Яблоко',
        description: 'Эксклюзивные предложения в любимом магазине косметики',
        expectedRevenue: 60000,
        category: 'Lifestyle',
        cashback: 'до 100% на акциях + 1-5% повседневный',
        limit: 'бесплатное обслуживание',
        reasons: [
          'Покупки косметики и товаров для ухода',
          'Максимальная экономия в Zolotoe Yabloko',
          'Специальные акции и бонусы',
        ],
      }
    );
  }

  if (age <= 25) {
    products.push(
      {
        id: 'youth-card',
        name: 'Молодёжная карта',
        description: 'Современный дизайн и выгодные условия для молодёжи',
        expectedRevenue: 25000,
        category: 'Youth',
        cashback: '5% на развлечения и доставку',
        limit: '0 ₽ обслуживание',
        reasons: [
          'Специальные предложения для студентов',
          'Кэшбэк в популярных категориях',
          'Современное мобильное приложение',
        ],
      }
    );
  }

  // Уникальные предложения по финансовому поведению
  if (customerData.turn_cur_cr_avg_v2 > 100000) {
    products.push(
      {
        id: 'investment-account',
        name: 'Инвестиционный счёт',
        description: 'Доступ к фондовому рынку и ETF',
        expectedRevenue: 90000,
        category: 'Investment',
        cashback: '0% комиссии на первые сделки',
        limit: 'от 1 000 ₽',
        reasons: [
          'Активное использование финансовых продуктов',
          'Потенциал для инвестиционного роста',
          'Диверсификация финансовых активов',
        ],
      }
    );
  }

  if (customerData.by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp > 10000) {
    products.push(
      {
        id: 'business-card',
        name: 'Карта для бизнеса',
        description: 'Оптимизация расходов для предпринимателей',
        expectedRevenue: 110000,
        category: 'Business',
        cashback: '3% на бизнес-расходы',
        limit: 'отсрочка платежа до 120 дней',
        reasons: [
          'Активное использование переводов и платежей',
          'Бизнес-расходы и операционная деятельность',
          'Оптимизация финансовых потоков',
        ],
      }
    );
  }

  return products.slice(0, 6); // Ограничиваем до 6 самых релевантных продуктов
};

export function ProductRecommendations({ customerData, selectedProducts, onProductToggle }: ProductRecommendationsProps) {
  const products = getRecommendedProducts(customerData);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Premium': 'bg-purple-500/20 text-[#e9d5ff] border-purple-500/40',
      'Travel': 'bg-blue-500/20 text-[#dbeafe] border-blue-500/40',
      'International': 'bg-green-500/20 text-[#dcfce7] border-green-500/40',
      'Credit': 'bg-orange-500/20 text-[#ffedd5] border-orange-500/40',
      'Mortgage': 'bg-indigo-500/20 text-[#e0e7ff] border-indigo-500/40',
      'Savings': 'bg-emerald-500/20 text-[#d1fae5] border-emerald-500/40',
      'Debit': 'bg-rose-500/20 text-[#ffe4e6] border-rose-500/40',
      'Auto': 'bg-cyan-500/20 text-[#cffafe] border-cyan-500/40',
      'Lifestyle': 'bg-pink-500/20 text-[#fce7f3] border-pink-500/40',
      'Youth': 'bg-lime-500/20 text-[#ecfccb] border-lime-500/40',
      'Investment': 'bg-amber-500/20 text-[#fef3c7] border-amber-500/40',
      'Business': 'bg-gray-500/20 text-[#f3f4f6] border-gray-500/40',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-[#f3f4f6] border-gray-500/40';
  };

  return (
    <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-[#f5f5f7] text-xl font-semibold">4. РЕКОМЕНДОВАННЫЕ ПРОДУКТЫ ДЛЯ КЛИЕНТА</h2>
        <p className="text-[#f5f5f7] text-sm mt-1">
          Подобрано на основе профиля клиента: доход {customerData.incomeValue?.toLocaleString() || customerData.salary_6to12m_avg?.toLocaleString()} ₽, возраст {customerData.age}, {customerData.gender === 'male' ? 'мужской' : 'женский'} пол
        </p>
      </div>

      <div className="space-y-4">
        {products.map((product) => {
          const isSelected = selectedProducts.includes(product.id);

          return (
            <div
              key={product.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-[#ef3124] bg-[#2a1a1a]' 
                  : 'border-[#2d2d2f] hover:border-[#3d3d3f]'
              }`}
              onClick={() => onProductToggle(product.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onProductToggle(product.id)}
                  className="mt-1 data-[state=checked]:bg-[#ef3124] data-[state=checked]:border-[#ef3124]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-[#f5f5f7] text-lg font-semibold">{product.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </div>
                      <p className="text-[#f5f5f7] text-sm mb-2">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        {product.cashback && (
                          <div className="flex items-center gap-1">
                            <span className="text-[#f5f5f7]">Кэшбэк:</span>
                            <span className="text-[#f5f5f7] font-medium">{product.cashback}</span>
                          </div>
                        )}
                        {product.limit && (
                          <div className="flex items-center gap-1">
                            <span className="text-[#f5f5f7]">Лимит:</span>
                            <span className="text-[#f5f5f7] font-medium">{product.limit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right min-w-[120px]">
                      <div className="text-[#f5f5f7] text-sm mb-1">Прогноз дохода</div>
                      <div className="text-[#34c759] text-lg font-semibold">
                        ₽{product.expectedRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#2d2d2f]">
                    <div className="text-[#f5f5f7] text-sm mb-2 font-medium">Почему рекомендовано:</div>
                    <ul className="text-[#f5f5f7] text-sm space-y-1">
                      {product.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#ef3124] mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-[#f5f5f7]">
          Недостаточно данных для формирования рекомендаций
        </div>
      )}
    </div>
  );
}