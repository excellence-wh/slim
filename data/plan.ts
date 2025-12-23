export interface MonthlyTarget {
  月份: string;
  目标体重: string;
  减重目标: string;
  主要任务: string;
}

export interface WeightLossPlan {
  总目标: string;
  时间: string;
  月均: string;
  月度分解目标: MonthlyTarget[];
}

export const weightLossPlan: WeightLossPlan = {
  总目标: '减重24kg',
  时间: '32周',
  月均: '3kg',
  月度分解目标: [
    {
      月份: '第1-2月',
      目标体重: '78kg',
      减重目标: '-6kg',
      主要任务: '建立习惯，启动代谢'
    },
    {
      月份: '第3-4月',
      目标体重: '72kg',
      减重目标: '-6kg',
      主要任务: '突破平台，增加强度'
    },
    {
      月份: '第5-6月',
      目标体重: '67kg',
      减重目标: '-5kg',
      主要任务: '塑形为主，优化体脂'
    },
    {
      月份: '第7-8月',
      目标体重: '63kg',
      减重目标: '-4kg',
      主要任务: '稳定巩固，防止反弹'
    },
    {
      月份: '维持期',
      目标体重: '60kg',
      减重目标: '-3kg',
      主要任务: '养成易瘦体质'
    }
  ]
};
