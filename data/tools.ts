export interface Tool {
  name: string;
  description: string;
}

export interface Reminder {
  title: string;
  items: string[];
}

export interface Monitoring指标 {
  name: string;
  frequency: string;
  description: string;
}

export interface ToolsData {
  工具清单: Tool[];
  重要提醒: Reminder[];
  监测指标: Monitoring指标[];
}

export const toolsData: ToolsData = {
  工具清单: [
    { name: '薄荷健康APP', description: '记录饮食' },
    { name: 'Keep/训记APP', description: '记录运动' },
    { name: '体脂秤', description: '监测体脂、肌肉' },
    { name: '食物秤', description: '精准控制（前期必备）' },
    { name: '手环/手表', description: '监测心率、睡眠' }
  ],
  重要提醒: [
    {
      title: '必须避免的坑',
      items: [
        '节食：会反弹+脱发+内分泌失调',
        '过度有氧：会掉肌肉+皮肤松弛',
        '不吃主食：会暴躁+脑力下降（程序员致命）',
        '追求速度：每月减5kg以上会皮肤松弛'
      ]
    },
    {
      title: '出现以下情况立即调整',
      items: [
        '连续3天失眠',
        '掉头发明显增多',
        '不来月经（女生）',
        '情绪低落、无法工作'
      ]
    }
  ],
  监测指标: [
    { name: '体重', frequency: '每天晨起空腹', description: '记录在薄荷健康APP' },
    { name: '围度', frequency: '每周', description: '腰围、胸围、大腿围' },
    { name: '体型', frequency: '每月', description: '拍照对比（正面、侧面、背面）' },
    { name: '体脂率', frequency: '每周', description: '使用体脂秤监测' }
  ]
};
