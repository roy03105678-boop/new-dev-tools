import { Percentage } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Interest rate converter',
  path: '/interest-rate-converter',
  description: 'Quickly convert between annual, monthly, and daily interest rates.',
  keywords: ['interest', 'rate', 'converter', 'finance'],
  component: () => import('./interest-rate-converter.vue'),
  icon: Percentage,
  createdAt: new Date('2026-04-03'),
});