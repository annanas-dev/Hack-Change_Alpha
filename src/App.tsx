import { useState } from 'react';
import { Header } from './components/Header';
import { CustomerForm } from './components/CustomerForm';
import { RevenuePrediction } from './components/RevenuePrediction';
import { ProductRecommendations } from './components/ProductRecommendations';
import { ActionButtons } from './components/ActionButtons';
import { toast, Toaster } from 'sonner';

export interface CustomerData {
    name: string;
    email: string;
    accountBalance: number;
    monthlyIncome: number;
    creditScore: number;
    accountAge: number;
    region: string;
    qualityTag: string;
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
        setPrediction(null);
        setSelectedProducts([]);
    };

    const handlePredictRevenue = () => {
        if (!customerData) return;

        setIsLoading(true);

        setTimeout(() => {
            const baseRevenue =
                customerData.accountBalance * 0.02 +
                customerData.monthlyIncome * 0.5 +
                customerData.creditScore * 10 +
                customerData.accountAge * 50;

            const revenue = Math.round(baseRevenue);
            const minRange = Math.round(revenue * 0.85);
            const maxRange = Math.round(revenue * 1.15);

            let reliability = 'Средняя';

            if (customerData.creditScore > 800 && customerData.accountAge > 24) {
                reliability = 'Очень высокая';
            } else if (customerData.creditScore > 700 && customerData.monthlyIncome > 50000) {
                reliability = 'Высокая';
            } else if (customerData.creditScore < 500 || customerData.accountAge < 6) {
                reliability = 'Низкая';
            } else if (customerData.creditScore < 400) {
                reliability = 'Очень низкая';
            }

            const factors = [
                {
                    name: 'Срок существования счета',
                    value: customerData.accountAge,
                    impact: Math.round(customerData.accountAge * 50)
                },
                {
                    name: 'Ежемесячный доход',
                    value: customerData.monthlyIncome,
                    impact: Math.round(customerData.monthlyIncome * 0.5)
                },
                {
                    name: 'Баланс счёта',
                    value: customerData.accountBalance,
                    impact: Math.round(customerData.accountBalance * 0.02)
                },
                {
                    name: 'Кредитный рейтинг',
                    value: customerData.creditScore,
                    impact: Math.round(customerData.creditScore * 10)
                },
                {
                    name: 'Кросс-продажи',
                    value: 85,
                    impact: Math.round(revenue * 0.12)
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

        if (!customerData?.email) {
            toast.error('Необходимо указать email клиента');
            return;
        }

        // Отправка email
        toast.success(`Предложение отправлено на адрес ${customerData.email}`);
    };

    const handleSendToCallCenter = () => {
        if (selectedProducts.length === 0) {
            toast.error('Выберите хотя бы один продукт');
            return;
        }

        toast.success(`Передано в колл-центр для клиента ${customerData?.name}`);
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

            <Header customerName={customerData?.name} />

            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="mb-6 flex items-center gap-3 text-[#86868b] text-sm">
                    <span>КЛИЕНТ</span>
                    <span>→</span>
                    <span>ПРОГНОЗЫ</span>
                    <span>→</span>
                    <span className="text-[#ef3124]">ПРЕДСКАЗАНИЯ</span>
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
                        {customerData && !prediction && (
                            <div className="bg-[#1d1d1f] border border-[#2d2d2f] rounded-xl p-6">
                                <div className="text-center py-12">
                                    <div className="text-[#86868b] mb-4">Готов для анализа профиля клиента</div>
                                    <button
                                        onClick={handlePredictRevenue}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-[#ef3124] hover:bg-[#d62915] text-white rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? 'Calculating...' : 'Predict Revenue'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {prediction && (
                            <RevenuePrediction
                                prediction={prediction}
                                customerData={customerData!}
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
                            customerEmail={customerData?.email}
                            selectedCount={selectedProducts.length}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}