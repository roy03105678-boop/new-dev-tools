import { Cash } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Interest calculator',
  path: '/interest-calculator',
  description: 'Accurately calculate simple and compound interest with various compounding frequencies.',
  keywords: ['interest', 'calculator', 'finance', 'compound', 'simple'],
  component: () => import('./interest-calculator.vue'),
  icon: Cash,
  createdAt: new Date('2026-04-03'),
});