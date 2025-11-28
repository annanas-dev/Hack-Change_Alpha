import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Prediction, CustomerData } from '../App';

interface RevenuePredictionProps {
  prediction: Prediction;
  customerData: CustomerData;
}

export function RevenuePrediction({ prediction, customerData }: RevenuePredictionProps) {
  const chartData = prediction.factors.map(factor => ({
    name: factor.name,
    impact: factor.impact,
  }));

  return (
    <div className="space-y-6">
      {/* Блок прогноза дохода */}
      <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-[#f5f5f7] text-xl">2. ПРОГНОЗ ДОХОДНОСТИ</h2>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[#86868b] text-sm mb-1">Прогнозируемая годовая выручка</div>
            <div className="text-[#f5f5f7] text-4xl">₽{prediction.revenue.toLocaleString()}</div>
          </div>

          <div>
            <div className="text-[#86868b] text-sm mb-1">Доверительный интервал</div>
            <div className="text-[#86868b]">
              ₽{prediction.minRange.toLocaleString()} - ₽{prediction.maxRange.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-[#86868b] text-sm">Надёжность:</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#34c759] rounded-full"></div>
              <span className="text-[#34c759]">{prediction.reliability}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Причины прогноза */}
      <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-[#f5f5f7] text-xl">3. ПРОГНОЗ ОСНОВАН НА ФАКТОРАХ</h2>
          <p className="text-[#86868b] text-sm mt-1">(факторы влияния, метод SHAP)</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2f" />
            <XAxis 
              type="number"
              tick={{ fill: '#86868b', fontSize: 12 }}
              stroke="#2d2d2f"
            />
            <YAxis 
              type="category"
              dataKey="name" 
              tick={{ fill: '#86868b', fontSize: 12 }}
              stroke="#2d2d2f"
              width={120}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1d1d1f', 
                border: '1px solid #2d2d2f',
                borderRadius: '8px',
                color: '#f5f5f7'
              }}
              formatter={(value: number) => [`₽${value.toLocaleString()}`, 'Влияние']}
            />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
              {chartData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#ef3124' : index === 1 ? '#ff6b6b' : index === 2 ? '#4a90e2' : index === 3 ? '#50c878' : '#ffa500'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 pt-4 border-t border-[#2d2d2f]">
          <button className="text-[#ef3124] hover:text-[#d62915] text-sm transition-colors">
            [ Показать больше факторов ]
          </button>
        </div>
      </div>
    </div>
  );
}
