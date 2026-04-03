/**
 * 将数字转换为人民币大写格式
 * @param money 数字金额
 */
export function convertToRMB(money: number | string): string {
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const cnIntUnits = ['', '拾', '佰', '仟'];
  const cnIntRadice = ['', '万', '亿', '兆'];
  const cnDecUnits = ['角', '分', '厘', '毫'];
  const cnInteger = '整';
  const cnNegative = '负';
  
  let number = typeof money === 'string' ? parseFloat(money) : money;
  if (isNaN(number)) return '';
  if (number === 0) return cnNums[0] + '元' + cnInteger;

  let res = '';
  if (number < 0) {
    res += cnNegative;
    number = Math.abs(number);
  }

  const parts = number.toFixed(4).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  // 处理整数部分
  if (parseInt(integerPart) > 0) {
    let zeroCount = 0;
    const len = integerPart.length;
    for (let i = 0; i < len; i++) {
      const n = integerPart[i];
      const p = len - i - 1;
      const m = p % 4;
      const q = Math.floor(p / 4);
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          res += cnNums[0];
        }
        zeroCount = 0;
        res += cnNums[parseInt(n)] + cnIntUnits[m];
      }
      if (m === 0 && zeroCount < 4) {
        res += cnIntRadice[q];
      }
    }
  }

  if (res === '' || res === cnNegative) {
      res += cnNums[0];
  }
  res += '元';

  // 处理小数部分
  let hasDecimal = false;
  for (let i = 0; i < Math.min(decimalPart.length, 4); i++) {
    const n = decimalPart[i];
    if (n !== '0') {
      res += cnNums[parseInt(n)] + cnDecUnits[i];
      hasDecimal = true;
    }
  }
  
  if (!hasDecimal) {
    res += cnInteger;
  }

  return res;
}
