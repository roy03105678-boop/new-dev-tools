export interface InterestResult {
  totalAmount: number;
  totalInterest: number;
}

export function calculateSimpleInterest(principal: number, rate: number, period: number): InterestResult {
  const totalInterest = principal * (rate / 100) * period;
  return {
    totalAmount: principal + totalInterest,
    totalInterest,
  };
}

export function calculateCompoundInterest(principal: number, rate: number, period: number, frequency: number = 1): InterestResult {
  const totalAmount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * period);
  return {
    totalAmount,
    totalInterest: totalAmount - principal,
  };
}
