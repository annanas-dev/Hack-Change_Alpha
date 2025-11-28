import { Checkbox } from './ui/checkbox';
import type { CustomerData, Product } from '../App';

interface ProductRecommendationsProps {
  customerData: CustomerData;
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

const getRecommendedProducts = (customerData: CustomerData): Product[] => {
  const products: Product[] = [];

  products.push(
    {
      id: 'travel-plus-card',
      name: 'Карта Alfa Travel',
      description: 'Дебетовая карта, которая копит на ваши путешествия',
      expectedRevenue: 150000,
      category: 'Credit',
      cashback: '30%',
      limit: 'до 100 000 ₽',
      reasons: [
        'Стабильный доход и хорошая кредитная история',
        'Высокий средний остаток на счёте',
      ],
    },
    {
      id: 'premium-debit',
      name: 'Карта Alpha Only',
      description: 'Кэшбек 7%, бесплатные такси и доступ в бизнес-залы по всему миру',
      expectedRevenue: 400000,
      category: 'Debit',
      cashback: '7.0%',
      limit: 'до 15 000 000 ₽',
      reasons: [
        'Стабильная активность на счёте',
      ],
    },
    {
      id: 'mortgage-standard',
      name: 'Дебетовая Альфа-Карта',
      description: 'Гравировка с особым характером и кэшбэк до 100% в Золотом Яблоке',
      expectedRevenue: 60000,
      category: 'Lending',
      limit: 'до 1 000 000 ₽',
      reasons: [
        'Высокий долгосрочный кредитный потенциал',
      ],
    }
  );

  return products;
};

export function ProductRecommendations({ customerData, selectedProducts, onProductToggle }: ProductRecommendationsProps) {
  const products = getRecommendedProducts(customerData);

  return (
    <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-[#f5f5f7] text-xl">4. РЕКОМЕНДОВАННЫЕ ПРОДУКТЫ ДЛЯ КЛИЕНТА</h2>
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
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-[#f5f5f7]">{product.name}</h3>
                      {product.cashback && (
                        <div className="text-[#86868b] text-sm mt-0.5">
                          Кэшбэк: {product.cashback}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-[#86868b] text-sm">Доход</div>
                      <div className="text-[#f5f5f7]">
                        ₽{product.expectedRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {product.limit && (
                    <div className="text-[#86868b] text-sm mb-2">
                      Лимит: {product.limit}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#2d2d2f]">
                    <div className="text-[#86868b] text-sm mb-1">Причины:</div>
                    <ul className="text-[#86868b] text-sm space-y-0.5">
                      {product.reasons.map((reason, idx) => (
                        <li key={idx}>• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
