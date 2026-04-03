import { Home } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Mortgage calculator',
  path: '/mortgage-calculator',
  description: 'Calculate mortgage interest and monthly payments with both equal installment and equal principal methods.',
  keywords: ['mortgage', 'calculator', 'finance', 'loan'],
  component: () => import('./mortgage-calculator.vue'),
  icon: Home,
  createdAt: new Date('2026-04-03'),
});