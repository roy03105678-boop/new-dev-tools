import { Coin } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Rmb converter',
  path: '/rmb-converter',
  description: 'Convert numeric amounts into Chinese RMB uppercase format for financial documents.',
  keywords: ['rmb', 'converter', 'finance', 'chinese'],
  component: () => import('./rmb-converter.vue'),
  icon: Coin,
  createdAt: new Date('2026-04-03'),
});