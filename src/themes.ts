import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1e40af',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    infoColor: '#06b6d4',
  },
  Menu: {
    itemHeight: '36px',
    itemTextColor: '#64748b',
    itemTextColorHover: '#18a058',
    itemTextColorActive: '#18a058',
    itemTextColorActiveHover: '#18a058',
    itemColorHover: '#f0fdf4',
    itemColorActive: '#f0fdf4',
    itemColorActiveHover: '#f0fdf4',
    borderRadius: '6px',
  },
  Layout: {
    color: '#f8fafc',
    siderColor: '#ffffff',
    siderBorderColor: '#e2e8f0',
  },
  Card: {
    color: '#ffffff',
    borderColor: '#e2e8f0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  Button: {
    borderRadiusMedium: '6px',
  },
  Input: {
    borderRadius: '6px',
  },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#1e40af',
    primaryColorSuppl: '#60a5fa',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    infoColor: '#06b6d4',
  },
  Notification: {
    color: '#1f2937',
    titleTextColor: '#f3f4f6',
    descriptionTextColor: '#d1d5db',
  },
  Menu: {
    itemHeight: '36px',
    itemTextColor: '#9ca3af',
    itemTextColorHover: '#18a058',
    itemTextColorActive: '#18a058',
    itemTextColorActiveHover: '#18a058',
    itemColorHover: '#1e3a1f',
    itemColorActive: '#1e3a1f',
    itemColorActiveHover: '#1e3a1f',
    borderRadius: '6px',
  },
  Layout: {
    color: '#0f172a',
    siderColor: '#1e293b',
    siderBorderColor: '#334155',
  },
  Card: {
    color: '#1f2937',
    borderColor: '#374151',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  },
  Button: {
    borderRadiusMedium: '6px',
  },
  Input: {
    borderRadius: '6px',
    color: '#1f2937',
    border: '1px solid #374151',
  },
  Table: {
    tdColor: '#1f2937',
    thColor: '#374151',
    borderColor: '#374151',
  },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1f2937' },
    },
  },
};
