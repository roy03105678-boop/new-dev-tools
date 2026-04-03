export interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  monthlyDetails: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingPrincipal: number;
  }>;
}

/**
 * 等额本息计算
 * @param principal 贷款本金
 * @param annualRate 年利率 (百分比，如 4.5)
 * @param months 贷款月数
 */
export function calculateEqualInstallment(principal: number, annualRate: number, months: number): MortgageResult {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  
  let remainingPrincipal = principal;
  const monthlyDetails = [];
  let totalInterest = 0;

  for (let i = 1; i <= months; i++) {
    const interest = remainingPrincipal * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    remainingPrincipal -= principalPaid;
    totalInterest += interest;
    
    monthlyDetails.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPaid,
      interest: interest,
      remainingPrincipal: Math.max(0, remainingPrincipal),
    });
  }

  return {
    monthlyPayment,
    totalInterest,
    totalPayment: principal + totalInterest,
    monthlyDetails,
  };
}

/**
 * 等额本金计算
 * @param principal 贷款本金
 * @param annualRate 年利率 (百分比，如 4.5)
 * @param months 贷款月数
 */
export function calculateEqualPrincipal(principal: number, annualRate: number, months: number): MortgageResult {
  const monthlyRate = annualRate / 100 / 12;
  const principalPerMonth = principal / months;
  
  let remainingPrincipal = principal;
  const monthlyDetails = [];
  let totalInterest = 0;

  for (let i = 1; i <= months; i++) {
    const interest = remainingPrincipal * monthlyRate;
    const payment = principalPerMonth + interest;
    remainingPrincipal -= principalPerMonth;
    totalInterest += interest;

    monthlyDetails.push({
      month: i,
      payment: payment,
      principal: principalPerMonth,
      interest: interest,
      remainingPrincipal: Math.max(0, remainingPrincipal),
    });
  }

  return {
    monthlyPayment: monthlyDetails[0].payment, // 首月还款
    totalInterest,
    totalPayment: principal + totalInterest,
    monthlyDetails,
  };
}
