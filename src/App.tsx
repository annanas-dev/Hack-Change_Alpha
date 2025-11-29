import { useState } from 'react';
import { Header } from './components/Header';
import { CustomerForm } from './components/CustomerForm';
import { RevenuePrediction } from './components/RevenuePrediction';
import { ProductRecommendations } from './components/ProductRecommendations';
import { ActionButtons } from './components/ActionButtons';
import { toast, Toaster } from 'sonner';

export interface CustomerData {
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

  const handleCustomerSubmit = (data: CustomerData) => {
    setCustomerData(data);
    setIsLoading(true);
    
    // Сразу запускаем прогноз при отправке формы
    setTimeout(() => {
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
      } else if (data.incomeValue < 20000) {
        reliability = 'Очень низкая';
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
      setIsLoading(false);
    }, 1500);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Информация о клиенте */}
          <div className="space-y-6">
            <CustomerForm 
              onSubmit={handleCustomerSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column - Прогнозы */}
          <div className="space-y-6">
            {prediction && customerData && (
              <RevenuePrediction 
                prediction={prediction} 
                customerData={customerData}
              />
            )}
          </div>
        </div>

        {/* Full Width - Детали прогноза и Продукты */}
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