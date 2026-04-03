/**
 * 利率转换计算
 * 年利率 (Annual Rate) = 月利率 * 12 = 日利率 * 360 (按银行通常标准)
 */

export function convertFromAnnual(annualRate: number) {
  return {
    annual: annualRate,
    monthly: annualRate / 12,
    daily: annualRate / 360,
  };
}

export function convertFromMonthly(monthlyRate: number) {
  return {
    annual: monthlyRate * 12,
    monthly: monthlyRate,
    daily: (monthlyRate * 12) / 360, // 统一按年利率转换，避免月大月小问题
  };
}

export function convertFromDaily(dailyRate: number) {
  return {
    annual: dailyRate * 360,
    monthly: (dailyRate * 360) / 12,
    daily: dailyRate,
  };
}
