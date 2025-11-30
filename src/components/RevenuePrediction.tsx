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

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#2d2d2f] border border-[#3d3d3f] rounded-lg p-3 shadow-lg">
                    <p className="text-[#f5f5f7] font-medium mb-1">{label}</p>
                    <p className="text-[#34c759] font-semibold">
                        Влияние: ₽{payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex gap-6 w-full">
            <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6" style={{ width: '33.3333%' }}>
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

            <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6 flex-[2] min-w-0" style={{ width: '66.6667%' }}>
                <div className="mb-6">
                    <h2 className="text-[#f5f5f7] text-xl">3. ПРОГНОЗ ОСНОВАН НА ФАКТОРАХ</h2>
                    <p className="text-[#86868b] text-sm mt-1">(факторы влияния, метод SHAP)</p>
                </div>

                <div className="w-full" style={{ minWidth: 0 }}>
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
                                content={<CustomTooltip />}
                                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
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
                </div>


            </div>
        </div>
    );
}