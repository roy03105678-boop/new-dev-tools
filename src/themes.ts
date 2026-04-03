import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1e40af',
    successColor: '#2563eb',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    infoColor: '#2563eb',
  },
  Menu: {
    itemHeight: '36px',
    itemTextColor: '#64748b',
    itemTextColorHover: '#2563eb',
    itemTextColorActive: '#2563eb',
    itemTextColorActiveHover: '#2563eb',
    itemColorHover: '#ffffff',
    itemColorActive: '#ffffff',
    itemColorActiveHover: '#ffffff',
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
      InternalSelectMenu: { height: '500px', color: '#ffffff' },
    },
  },
  Select: {
    peers: {
      InternalSelectMenu: { color: '#ffffff' },
    },
  },
  Dropdown: {
    color: '#ffffff',
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#1e40af',
    primaryColorSuppl: '#60a5fa',
    successColor: '#3b82f6',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    infoColor: '#3b82f6',
  },
  Notification: {
    color: '#1f2937',
    titleTextColor: '#f3f4f6',
    descriptionTextColor: '#d1d5db',
  },
  Menu: {
    itemHeight: '36px',
    itemTextColor: '#9ca3af',
    itemTextColorHover: '#60a5fa',
    itemTextColorActive: '#2563eb',
    itemTextColorActiveHover: '#2563eb',
    itemColorHover: '#f0f4f8',
    itemColorActive: '#ffffff',
    itemColorActiveHover: '#ffffff',
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
      InternalSelectMenu: { height: '500px', color: '#1e293b' },
    },
  },
  Select: {
    peers: {
      InternalSelectMenu: { color: '#1e293b' },
    },
  },
  Dropdown: {
    color: '#1e293b',
  },
};
