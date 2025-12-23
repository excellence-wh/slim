export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface ExerciseDay {
  type: string;
  exercises: Exercise[];
  duration?: string;
}

export interface WeeklySchedule {
  [key: string]: ExerciseDay;
}

export interface DietPlan {
  dailyCalories: string;
  cookingMethods: string[];
  dailyStructure: {
    breakfast: string[];
    lunch: string[];
    afternoonTea: string[];
    dinner: string[];
  };
  加餐原则: string;
}

export interface Milestone {
  name: string;
  description: string;
}

export interface Phase {
  id: string;
  name: string;
  weeks: string;
  target: string;
  dietPlan: DietPlan;
  exercisePlan: {
    description: string;
    weeklySchedule: WeeklySchedule;
  };
  milestones: Milestone[];
  程序员专项改造?: {
    办公桌改造: string[];
    加班应对方案: string[];
    睡眠管理: string[];
  };
}

export const phases: Phase[] = [
  {
    id: 'phase1',
    name: '第一阶段：第1-2月（启动期）',
    weeks: '8周',
    target: '适应期 → 78kg',
    dietPlan: {
      dailyCalories: '1300-1500大卡/天',
      cookingMethods: ['蒸：鱼、鸡胸肉、红薯、玉米、鸡蛋、蔬菜', '煮：水煮肉片、蔬菜汤、燕麦、荞麦面'],
      dailyStructure: {
        breakfast: [
          '水煮蛋2个 + 蒸红薯150g + 黄瓜1根',
          '无糖燕麦片40g + 香蕉1根 + 鸡蛋2个'
        ],
        lunch: [
          '主食：蒸土豆200g / 糙米80g（生重）',
          '蛋白质：水煮鸡胸肉120g / 蒸鱼150g',
          '蔬菜：水煮混合蔬菜300g（西兰花、胡萝卜、菠菜）',
          '油脂：香油5滴'
        ],
        afternoonTea: [
          '苹果1个 + 无糖黑咖啡',
          '原味坚果10颗（加班能量站）'
        ],
        dinner: [
          '主食：蒸南瓜100g（可省略）',
          '蛋白质：水煮豆腐150g',
          '蔬菜：大量蔬菜汤'
        ]
      },
      加餐原则: '饥饿时先喝水300ml，15分钟后还饿才吃黄瓜/番茄'
    },
    exercisePlan: {
      description: '第一周（适应）：晨间快走30分钟（心率120-130），晚间零基础力量训练20分钟，频率：运动3天，休息1天',
      weeklySchedule: {
        '周一：胸部+三头肌': {
          type: '力量训练',
          exercises: [
            { name: '标准俯卧撑', sets: 4, reps: '12次' },
            { name: '凳上俯卧撑', sets: 3, reps: '15次' },
            { name: '平板支撑', sets: 3, reps: '45秒' }
          ],
          duration: '快走30分钟'
        },
        '周二：有氧日': {
          type: '有氧训练',
          exercises: [
            { name: '慢跑', sets: 1, reps: '40分钟（心率130-140）' },
            { name: '拉伸', sets: 1, reps: '15分钟' }
          ]
        },
        '周三：背部+二头肌': {
          type: '力量训练',
          exercises: [
            { name: '水瓶划船', sets: 4, reps: '15次（用2L水瓶）' },
            { name: '反向飞鸟', sets: 3, reps: '12次' },
            { name: '死虫式', sets: 3, reps: '10次/侧' },
            { name: '开合跳', sets: 4, reps: '30秒' }
          ]
        },
        '周四：臀腿日': {
          type: '力量训练',
          exercises: [
            { name: '深蹲', sets: 4, reps: '20次' },
            { name: '箭步蹲', sets: 3, reps: '12次/腿' },
            { name: '靠墙静蹲', sets: 3, reps: '60秒' }
          ],
          duration: '快走30分钟'
        },
        '周五：HIIT日': {
          type: 'HIIT',
          exercises: [
            { name: '波比跳', sets: 5, reps: '10次' },
            { name: '高抬腿', sets: 4, reps: '30秒' },
            { name: '登山跑', sets: 4, reps: '20次/侧' }
          ]
        },
        '周六：长时间有氧': {
          type: '有氧训练',
          exercises: [
            { name: '户外徒步/骑行', sets: 1, reps: '60-90分钟' }
          ]
        },
        '周日：全身拉伸+瑜伽': {
          type: '拉伸',
          exercises: []
        }
      }
    },
    milestones: [
      { name: '第1周末', description: '完成5次运动，体重可能不变（身体储水）' },
      { name: '第2周末', description: '体重↓1.5kg，腰围↓2cm' },
      { name: '第4周末', description: '体重↓3kg，能连续慢跑30分钟' },
      { name: '第8周末', description: '体重↓6kg（78kg），养成运动习惯' }
    ],
    程序员专项改造: {
      办公桌改造: [
        '将显示器垫高，实行站立办公（每天2小时）',
        '设置番茄闹钟：每45分钟代码→5分钟活动（深蹲20次/拉伸）',
        '水杯换成500ml大杯→强迫自己多走动接水'
      ],
      加班应对方案: [
        '20:00前吃完晚餐',
        '深夜饥饿→先喝2杯水→无效→吃黄瓜/水煮蛋',
        '绝对禁止：泡面、炸鸡、奶茶、含糖饮料'
      ],
      睡眠管理: [
        '23:30前必须睡觉（睡眠不足会分泌皮质醇导致肥胖）',
        '睡前1小时关闭电子设备',
        '保证7-7.5小时睡眠'
      ]
    }
  },
  {
    id: 'phase2',
    name: '第二阶段：第3-4月（加速期）',
    weeks: '8周',
    target: '突破平台期 → 72kg',
    dietPlan: {
      dailyCalories: '1400-1600大卡',
      cookingMethods: ['蒸：鱼、鸡胸肉、红薯、玉米、鸡蛋、蔬菜', '煮：水煮肉片、蔬菜汤、燕麦、荞麦面'],
      dailyStructure: {
        breakfast: [
          '蒸山药200g + 水煮蛋 + 无糖豆浆300ml',
          '全麦面包2片 + 金枪鱼罐头 + 番茄'
        ],
        lunch: [
          '荞麦面80g（生重）+ 白灼虾150g + 凉拌黄瓜',
          '调味：生抽+芥末+醋（程序员快手餐）'
        ],
        afternoonTea: [
          '煮鸡蛋（办公室常备）',
          '即食鸡胸肉（开袋即食）',
          '无糖酸奶 + 蓝莓'
        ],
        dinner: [
          '蔬菜豆腐汤（无限量）+ 卤牛肉100g（周末做好分装）'
        ]
      },
      加餐原则: '饥饿时先喝水300ml，15分钟后还饿才吃黄瓜/番茄'
    },
    exercisePlan: {
      description: '加入抗阻训练，提高运动强度',
      weeklySchedule: {
        '周一：俯卧撑进阶': {
          type: '力量训练',
          exercises: [
            { name: '标准俯卧撑', sets: 4, reps: '15次' },
            { name: '钻石俯卧撑', sets: 3, reps: '10次' },
            { name: '宽距俯卧撑', sets: 3, reps: '12次' },
            { name: 'HIIT：波比跳', sets: 5, reps: '12次' }
          ]
        },
        '周二：跑步日': {
          type: '有氧训练',
          exercises: [
            { name: '间歇跑：慢跑5分钟+快跑1分钟×6组', sets: 1, reps: '总时长：45分钟' }
          ]
        },
        '周三：臀腿强化': {
          type: '力量训练',
          exercises: [
            { name: '单腿深蹲', sets: 3, reps: '8/腿' },
            { name: '保加利亚分腿蹲', sets: 3, reps: '10/腿' },
            { name: '臀桥', sets: 4, reps: '20次' },
            { name: '跳绳', sets: 4, reps: '2分钟' }
          ]
        },
        '周四：上肢力量': {
          type: '力量训练',
          exercises: [
            { name: '引体向上（或弹力带划船）', sets: 4, reps: '力竭' },
            { name: '倒立撑（靠墙）', sets: 3, reps: '力竭' },
            { name: '臂屈伸（用椅子）', sets: 3, reps: '15次' },
            { name: '核心：卷腹', sets: 4, reps: '20次' }
          ]
        },
        '周五：HIIT燃脂': {
          type: 'HIIT',
          exercises: [
            { name: '30秒冲刺+30秒休息×10轮：开合跳', sets: 10, reps: '30秒冲刺+30秒休息' },
            { name: '30秒冲刺+30秒休息×10轮：深蹲跳', sets: 10, reps: '30秒冲刺+30秒休息' },
            { name: '30秒冲刺+30秒休息×10轮：登山跑', sets: 10, reps: '30秒冲刺+30秒休息' },
            { name: '30秒冲刺+30秒休息×10轮：高抬腿', sets: 10, reps: '30秒冲刺+30秒休息' }
          ]
        },
        '周六：游泳/羽毛球/篮球': {
          type: '有氧训练',
          exercises: [
            { name: '游泳/羽毛球/篮球', sets: 1, reps: '90分钟' }
          ]
        },
        '周日：休息或轻度拉伸': {
          type: '休息',
          exercises: []
        }
      }
    },
    milestones: [
      { name: '第12周末', description: '体重74kg，体脂率下降4-5%' },
      { name: '第16周末', description: '体重72kg，完成10个标准俯卧撑' },
      { name: '基础代谢提升15%', description: '基础代谢提升15%' },
      { name: '腰围减少8-10cm', description: '腰围减少8-10cm' },
      { name: '体能明显增强', description: '爬楼不喘' }
    ]
  },
  {
    id: 'phase3',
    name: '第三阶段：第5-6月（塑形期）',
    weeks: '8周',
    target: '雕刻线条 → 67kg',
    dietPlan: {
      dailyCalories: '1500-1700大卡',
      cookingMethods: ['蒸：鱼、鸡胸肉、红薯、玉米、鸡蛋、蔬菜', '煮：水煮肉片、蔬菜汤、燕麦、荞麦面'],
      dailyStructure: {
        breakfast: [
          '燕麦50g + 全蛋2个 + 蛋白2个 + 牛油果半个'
        ],
        lunch: [
          '藜麦80g + 卤鸡腿去皮 + 蒸时蔬'
        ],
        afternoonTea: [
          '训练后加餐：香蕉1根 + 蛋白粉1勺（或牛奶）'
        ],
        dinner: [
          '三文鱼/鳕鱼150g（蒸锅）+ 沙拉菜'
        ]
      },
      加餐原则: '饥饿时先喝水300ml，15分钟后还饿才吃黄瓜/番茄'
    },
    exercisePlan: {
      description: '力量为主，有氧为辅，分化训练',
      weeklySchedule: {
        '周一：胸肌日': {
          type: '力量训练',
          exercises: [
            { name: '标准俯卧撑', sets: 4, reps: '20次' },
            { name: '下斜俯卧撑', sets: 4, reps: '15次' },
            { name: '双杠臂屈伸（用椅子）', sets: 4, reps: '12次' }
          ],
          duration: '有氧：慢跑20分钟'
        },
        '周二：背部日': {
          type: '力量训练',
          exercises: [
            { name: '引体向上', sets: 4, reps: '力竭' },
            { name: '澳洲引体（桌子下）', sets: 4, reps: '15次' },
            { name: '超人起飞', sets: 3, reps: '20次' }
          ],
          duration: '有氧：跳绳15分钟'
        },
        '周三：腿部日': {
          type: '力量训练',
          exercises: [
            { name: 'pistol squat（手枪蹲）', sets: 3, reps: '5/腿' },
            { name: '深蹲跳', sets: 4, reps: '15次' },
            { name: '单腿硬拉', sets: 3, reps: '12/腿' }
          ],
          duration: '有氧：椭圆机/爬楼梯 30分钟'
        },
        '周四：肩部+手臂': {
          type: '力量训练',
          exercises: [
            { name: '倒立撑', sets: 5, reps: '5次' },
            { name: '侧平举（用水瓶）', sets: 4, reps: '15次' },
            { name: '臂屈伸', sets: 4, reps: '15次' }
          ],
          duration: '有氧：HIIT 20分钟'
        },
        '周五：核心强化': {
          type: '力量训练',
          exercises: [
            { name: '龙旗（简易版）', sets: 3, reps: '5次' },
            { name: '健腹轮（或卷腹）', sets: 4, reps: '20次' },
            { name: '俄罗斯转体', sets: 4, reps: '30次' }
          ],
          duration: '有氧：慢跑40分钟'
        },
        '周六日：户外活动+拉伸': {
          type: '有氧训练',
          exercises: [
            { name: '户外活动', sets: 1, reps: '60-90分钟' },
            { name: '拉伸', sets: 1, reps: '15-20分钟' }
          ]
        }
      }
    },
    milestones: [
      { name: '第20周末', description: '体重69kg，体脂率20%以下' },
      { name: '第24周末', description: '体重67kg，腹肌开始显现' },
      { name: '肌肉量明显增加', description: '肌肉量明显增加' },
      { name: '衣服尺码下降2-3个', description: '衣服尺码下降2-3个' },
      { name: '精力提升', description: '代码效率提高（真·程序员福利）' }
    ]
  },
  {
    id: 'phase4',
    name: '第四阶段：第7-8月（冲刺期）',
    weeks: '8周',
    target: '巩固成果 → 63kg',
    dietPlan: {
      dailyCalories: '1600-1800大卡',
      cookingMethods: ['蒸：鱼、鸡胸肉、红薯、玉米、鸡蛋、蔬菜', '煮：水煮肉片、蔬菜汤、燕麦、荞麦面'],
      dailyStructure: {
        breakfast: [
          '全麦面包3片 + 花生酱 + 煎蛋（无油）+ 牛奶'
        ],
        lunch: [
          '正常米饭100g + 家常炒菜（少油）+ 瘦肉100g'
        ],
        afternoonTea: [
          '苹果1个 + 无糖黑咖啡',
          '原味坚果10颗'
        ],
        dinner: [
          '蒸粗粮 + 蛋白质 + 大量蔬菜'
        ]
      },
      加餐原则: '什么都可以吃，但控制份量'
    },
    exercisePlan: {
      description: '运动常态化，习惯养成期',
      weeklySchedule: {
        '周一/三/五：全身力量训练': {
          type: '力量训练',
          exercises: [],
          duration: '45分钟'
        },
        '周二/四：中强度有氧': {
          type: '有氧训练',
          exercises: [],
          duration: '40分钟'
        },
        '周六：户外活动': {
          type: '有氧训练',
          exercises: [],
          duration: '60分钟'
        },
        '周日：休息': {
          type: '休息',
          exercises: []
        }
      }
    },
    milestones: [
      { name: '第28周末', description: '体重65kg，决定最后冲刺' },
      { name: '第32周末', description: '体重63kg，体脂率15-17%' },
      { name: '达到目标95%', description: '达到目标95%，身体适应新体重' },
      { name: '养成运动习惯', description: '不运动不舒服' },
      { name: '学会自我管理', description: '学会自我管理' }
    ]
  },
  {
    id: 'phase5',
    name: '第9-12月（维持期）',
    weeks: '16周',
    target: '稳定在60kg，养成易瘦体质',
    dietPlan: {
      dailyCalories: '维持期',
      cookingMethods: [],
      dailyStructure: {
        breakfast: [],
        lunch: [],
        afternoonTea: [],
        dinner: []
      },
      加餐原则: '80%健康+20%放纵，工作日严格控制，周末正常社交，体重浮动2kg内立即调整'
    },
    exercisePlan: {
      description: '每周3次运动成为生活一部分，融入日常',
      weeklySchedule: {
        '每周3次运动': {
          type: '综合训练',
          exercises: [],
          duration: '30-45分钟'
        }
      }
    },
    milestones: [
      { name: '稳定体重', description: '稳定在60kg左右' },
      { name: '养成易瘦体质', description: '养成易瘦体质' },
      { name: '永久习惯', description: '每天称体重（监控），餐前拍照（防暴食），久坐提醒（护腰+防胖）' }
    ]
  }
];
