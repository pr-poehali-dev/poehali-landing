import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const IncomeCalculator = () => {
  const [b2cClients, setB2cClients] = useState([50]);
  const [b2bClients, setB2bClients] = useState([5]);

  // Фиксированные значения среднего чека
  const b2cAverageCheck = 2500;
  const b2bAverageCheck = 100000;

  // Расчет дохода
  const b2cMonthlyIncome = b2cClients[0] * b2cAverageCheck * 0.1;
  const b2bMonthlyIncome = b2bClients[0] * b2bAverageCheck * 0.15;
  const totalMonthlyIncome = b2cMonthlyIncome + b2bMonthlyIncome;
  const totalYearlyIncome = totalMonthlyIncome * 12;

  // Бонус за первое пополнение B2B
  const b2bFirstTimeBonus = b2bClients[0] * b2bAverageCheck * 0.15;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Калькулятор дохода
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Рассчитайте свой потенциальный доход от партнерской программы
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Настройки калькулятора */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon
                    name="Settings"
                    size={24}
                    className="mr-2 text-blue-600"
                  />
                  Параметры расчета
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* B2C клиенты */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Количество B2C клиентов: {b2cClients[0]}
                  </Label>
                  <Slider
                    value={b2cClients}
                    onValueChange={setB2cClients}
                    max={1000}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* B2B клиенты */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Количество B2B клиентов: {b2bClients[0]}
                  </Label>
                  <Slider
                    value={b2bClients}
                    onValueChange={setB2bClients}
                    max={20}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Информация об условиях */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Условия расчета:
                  </h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• B2C: 10% от пополнений (средний чек 2 500₽)</div>
                    <div>• B2B: 15% от пополнений (средний чек 100 000₽)</div>
                    <div>• Бонус B2B: 15% от первого пополнения</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Результаты расчета */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Icon name="Calculator" size={24} className="mr-2" />
                  Ваш доход
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Детализация по типам клиентов */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">
                        B2C клиенты
                      </div>
                      <div className="text-sm text-gray-600">
                        {b2cClients[0]} × {formatCurrency(b2cAverageCheck)} ×
                        10%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {formatCurrency(b2cMonthlyIncome)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">
                        B2B клиенты
                      </div>
                      <div className="text-sm text-gray-600">
                        {b2bClients[0]} × {formatCurrency(b2bAverageCheck)} ×
                        15%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-indigo-600">
                      {formatCurrency(b2bMonthlyIncome)}
                    </div>
                  </div>

                  {b2bClients[0] > 0 && (
                    <div className="flex items-center justify-between p-4 bg-blue-100 rounded-xl border border-blue-200">
                      <div>
                        <div className="font-semibold text-blue-900">
                          Бонус за первое пополнение
                        </div>
                        <div className="text-sm text-blue-700">
                          {b2bClients[0]} × {formatCurrency(b2bAverageCheck)} ×
                          15%
                        </div>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(b2bFirstTimeBonus)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Итоговые суммы */}
                <div className="border-t border-blue-200 pt-6">
                  <div className="text-center space-y-4">
                    <div>
                      <div className="text-sm text-blue-700 mb-1">
                        Доход в месяц
                      </div>
                      <div className="text-3xl font-bold text-blue-900">
                        {formatCurrency(totalMonthlyIncome)}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-blue-700 mb-1">
                        Доход в год
                      </div>
                      <div className="text-2xl font-bold text-blue-900">
                        {formatCurrency(totalYearlyIncome)}
                      </div>
                    </div>

                    {b2bClients[0] > 0 && (
                      <div className="bg-blue-100 rounded-xl p-4 border border-blue-200">
                        <div className="text-sm text-blue-700 mb-1">
                          + Разовый бонус
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatCurrency(b2bFirstTimeBonus)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Призыв к действию */}
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Хотите зарабатывать {formatCurrency(totalMonthlyIncome)} в
                    месяц?
                  </p>
                  <a
                    href="https://t.me/m/hEQRio2kNmFi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-block"
                  >
                    Стать партнером →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeCalculator;
