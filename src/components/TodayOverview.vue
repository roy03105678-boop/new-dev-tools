<script setup lang="ts">
import { computed } from 'vue';
import { useThemeVars } from 'naive-ui';

const theme = useThemeVars();

// 获取当前日期信息
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];

// 农历转换函数
function getLunarDate() {
  // 简化的农历计算（基于查表法）
  const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0,
    0x049b0, 0x0a4b8, 0x0a4b0, 0x0b27a, 0x0aea0, 0x06d4d, 0x0a4d0, 0x0a4f2, 0x04270, 0x0d0a6,
    0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x0d8a6,
    0x0b55b, 0x056a0, 0x0a5b4, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50,
    0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d25d, 0x0d104, 0x0daa0,
    0x0aa50, 0x0b5a9, 0x0b6a0, 0x0b6d4, 0x0ada0, 0x055c0, 0x0ead9, 0x05b50, 0x056a0, 0x0a6d0,
    0x055d4, 0x0abac, 0x0a5a0, 0x0d9b3, 0x0ba50, 0x0b5a0, 0x0b6a3, 0x0ad50, 0x055b0, 0x0aba4,
    0x0a5b0, 0x052b8, 0x0a6e0, 0x0a6f3, 0x0d5a0, 0x0ea5d, 0x0d4a0, 0x0da50, 0x07aa7, 0x0b5a0,
    0x0ab50, 0x0b4b8, 0x0aae0, 0x0a6d7, 0x0abf0, 0x0dae6, 0x0ab50, 0x0bbb4, 0x0b6a0, 0x0baae,
    0x0ad12, 0x0d5a0, 0x0d740, 0x0d4a5, 0x0d250, 0x0d555, 0x0b540, 0x0b6a0, 0x095a6, 0x095b0,
    0x049b0, 0x0a4b8, 0x0a4b0, 0x0b27a, 0x0aea0, 0x06d4d, 0x0a4d0, 0x0a4f2, 0x04270, 0x0d0a6,
    0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x0d8a6,
  ];

  const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

  const baseDate = new Date(1900, 0, 31);
  const offset = Math.floor((now.getTime() - baseDate.getTime()) / 86400000);

  let lunarYear = 1900;
  let remaining = offset;

  for (let i = 0; i < lunarInfo.length; i++) {
    const daysInYear = 353 + ((lunarInfo[i] & 0xf800) >> 11);
    if (remaining < daysInYear) break;
    remaining -= daysInYear;
    lunarYear++;
  }

  const info = lunarInfo[lunarYear - 1900];
  let lunarMonth = 1;
  let daysInMonth = 0;

  for (let i = 0; i < 13; i++) {
    daysInMonth = 29 + ((info >> (12 - i)) & 1);
    if (remaining < daysInMonth) break;
    remaining -= daysInMonth;
    lunarMonth++;
  }

  const lunarDay = remaining + 1;
  const monthStr = lunarMonths[lunarMonth - 1] || '正';
  const dayStr = lunarDays[lunarDay - 1] || '初一';

  return `农历${lunarMonth === 1 ? lunarYear : ''}年${monthStr}月${dayStr}`;
}

// 计算年度进度
const yearProgress = computed(() => {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);
  const totalDays = (endOfYear.getTime() - startOfYear.getTime()) / 86400000;
  const passedDays = (now.getTime() - startOfYear.getTime()) / 86400000;
  return Math.round((passedDays / totalDays) * 10000) / 100;
});

// 励志寄语列表
const messages = [
  '时间如流水般匆匆流逝，让我们更加珍惜今天的每一分每一秒！',
  '每一秒都是新的开始，抓住当下，创造美好的未来！',
  '今天的努力，是明天成功的基石，让我们一起加油！',
  '生命中最珍贵的不是拥有，而是珍惜每一个当下的时刻。',
  '时光不会重来，但我们可以让每一刻都闪闪发光！',
];

const currentMessage = computed(() => {
  return messages[new Date().getDate() % messages.length];
});

const lunarDate = computed(() => getLunarDate());
</script>

<template>
  <div class="today-overview">
    <div class="overview-card">
      <div class="overview-header">
        <div class="date-info">
          <span class="date-main">{{ year }}年{{ month }}月{{ date }}日</span>
          <span class="date-sub">星期{{ dayOfWeek }}</span>
        </div>
        <div class="lunar-info">
          {{ lunarDate }}
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-label">
          <span>{{ year }}年进度</span>
          <span class="progress-percent">{{ yearProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${yearProgress}%` }" />
        </div>
      </div>

      <div class="message-section">
        {{ currentMessage }}
        <span class="emoji">😊 📖</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.today-overview {
  padding: 16px;
  margin-bottom: 24px;
}

.overview-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;

  :deep(.dark) & {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-color: #334155;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(37, 99, 108, 0.1);
  }
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-main {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;

  :deep(.dark) & {
    color: #e2e8f0;
  }
}

.date-sub {
  font-size: 12px;
  color: #64748b;

  :deep(.dark) & {
    color: #94a3b8;
  }
}

.lunar-info {
  font-size: 13px;
  color: #2563eb;
  font-weight: 500;

  :deep(.dark) & {
    color: #60a5fa;
  }
}

.progress-section {
  margin-bottom: 12px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
  color: #64748b;

  :deep(.dark) & {
    color: #94a3b8;
  }
}

.progress-percent {
  font-weight: 600;
  color: #2563eb;

  :deep(.dark) & {
    color: #60a5fa;
  }
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;

  :deep(.dark) & {
    background: #334155;
  }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  border-radius: 3px;
  transition: width 0.6s ease;
}

.message-section {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  padding: 8px 0;

  :deep(.dark) & {
    color: #cbd5e1;
  }
}

.emoji {
  margin-left: 4px;
  font-size: 14px;
}

@media (max-width: 640px) {
  .overview-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-main {
    font-size: 14px;
  }

  .message-section {
    font-size: 12px;
  }
}
</style>
