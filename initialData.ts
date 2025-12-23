import { Settings, WeightLossPlan } from './types';

// 8个月减肥计划初始数据
export const initialWeightLossPlan: WeightLossPlan = {
  totalTarget: {
    startWeight: 84,
    endWeight: 60,
    totalWeeks: 32,
    monthlyTarget: 3,
  },
  phases: [
    {
      id: "phase-1",
      name: "启动期",
      weeks: "第1-2月",
      targetWeight: 78,
      weightLossTarget: 6,
      mainTasks: "建立习惯，启动代谢",
      dietPlan: {
        dailyCalories: "1300-1500大卡/天",
        cookingMethods: ["蒸、煮、凉拌"],
        dailyStructure: {
          breakfast: [
            "水煮蛋2个 + 蒸红薯150g + 黄瓜1根",
            "无糖燕麦片40g + 香蕉1根 + 鸡蛋2个",
          ],
          lunch: [
            "主食：蒸土豆200g / 糙米80g（生重）",
            "蛋白质：水煮鸡胸肉120g / 蒸鱼150g",
            "蔬菜：水煮混合蔬菜300g（西兰花、胡萝卜、菠菜）",
            "油脂：香油5滴",
          ],
          afternoonTea: ["苹果1个 + 无糖黑咖啡", "原味坚果10颗（加班能量站）"],
          dinner: [
            "主食：蒸南瓜100g（可省略）",
            "蛋白质：水煮豆腐150g",
            "蔬菜：大量蔬菜汤",
          ],
        },
        snackPrinciple: "饥饿时先喝水300ml，15分钟后还饿才吃黄瓜/番茄",
        mealPackages: {
          breakfast: [
            {
              id: "phase1-bf1",
              name: "经典早餐A",
              calories: 350,
              foodItems: ["水煮蛋2个", "蒸红薯150g", "黄瓜1根"],
              protein: 25,
              carbs: 30,
              fat: 10,
            },
            {
              id: "phase1-bf2",
              name: "经典早餐B",
              calories: 320,
              foodItems: ["无糖燕麦片40g", "香蕉1根", "鸡蛋2个"],
              protein: 20,
              carbs: 45,
              fat: 8,
            },
          ],
          lunch: [
            {
              id: "phase1-lunch1",
              name: "基础午餐A",
              calories: 450,
              foodItems: ["蒸土豆200g", "水煮鸡胸肉120g", "混合蔬菜300g"],
              protein: 35,
              carbs: 50,
              fat: 12,
            },
            {
              id: "phase1-lunch2",
              name: "基础午餐B",
              calories: 430,
              foodItems: ["糙米饭80g", "蒸鱼150g", "水煮蔬菜300g"],
              protein: 40,
              carbs: 45,
              fat: 10,
            },
          ],
          afternoonTea: [
            {
              id: "phase1-at1",
              name: "轻食下午茶",
              calories: 150,
              foodItems: ["苹果1个", "无糖黑咖啡"],
              protein: 3,
              carbs: 25,
              fat: 3,
            },
            {
              id: "phase1-at2",
              name: "能量下午茶",
              calories: 200,
              foodItems: ["原味坚果10颗"],
              protein: 5,
              carbs: 10,
              fat: 15,
            },
          ],
          dinner: [
            {
              id: "phase1-dinner1",
              name: "简单晚餐",
              calories: 300,
              foodItems: ["蒸南瓜100g", "水煮豆腐150g", "大量蔬菜"],
              protein: 25,
              carbs: 20,
              fat: 10,
            },
            {
              id: "phase1-dinner2",
              name: "无主食晚餐",
              calories: 280,
              foodItems: ["水煮鸡胸肉100g", "大量蔬菜"],
              protein: 30,
              carbs: 5,
              fat: 8,
            },
          ],
        },
      },
      exercisePlan: {
        weeklySchedule: {
          第一周: {
            type: "适应期",
            exercises: [
              { name: "晨间快走", sets: 1, reps: "30分钟（心率120-130）" },
              { name: "晚间零基础力量训练", sets: 1, reps: "20分钟" },
            ],
            duration: "运动3天，休息1天",
          },
          "第2-8周": {
            type: "建立习惯",
            exercises: [
              {
                name: "周一：胸部+三头肌",
                sets: 1,
                reps: "标准俯卧撑 4×12次 + 凳上俯卧撑 3×15次 + 平板支撑 3×45秒 + 快走30分钟",
              },
              {
                name: "周二：有氧日",
                sets: 1,
                reps: "慢跑40分钟（心率130-140） + 拉伸15分钟",
              },
              {
                name: "周三：背部+二头肌",
                sets: 1,
                reps: "水瓶划船 4×15次（用2L水瓶） + 反向飞鸟 3×12次 + 死虫式 3×10次/侧 + 开合跳 4×30秒",
              },
              {
                name: "周四：臀腿日",
                sets: 1,
                reps: "深蹲 4×20次 + 箭步蹲 3×12次/腿 + 靠墙静蹲 3×60秒 + 快走30分钟",
              },
              {
                name: "周五：HIIT日",
                sets: 1,
                reps: "波比跳 5×10次 + 高抬腿 4×30秒 + 登山跑 4×20次/侧",
              },
              {
                name: "周六：长时间有氧",
                sets: 1,
                reps: "户外徒步/骑行 60-90分钟",
              },
              {
                name: "周日：全身拉伸+瑜伽",
                sets: 1,
                reps: "30分钟",
              },
            ],
            duration: "每周6天运动，1天休息",
          },
        },
        programmerTips: [
          "将显示器垫高，实行站立办公（每天2小时）",
          "设置番茄闹钟：每45分钟代码→5分钟活动（深蹲20次/拉伸）",
          "水杯换成500ml大杯→强迫自己多走动接水",
        ],
      },
      milestones: [
        {
          id: "milestone-1-1",
          week: 1,
          description: "完成5次运动，体重可能不变（身体储水）",
          completed: false,
        },
        {
          id: "milestone-1-2",
          week: 2,
          description: "体重↓1.5kg，腰围↓2cm",
          completed: false,
        },
        {
          id: "milestone-1-3",
          week: 4,
          description: "体重↓3kg，能连续慢跑30分钟",
          completed: false,
        },
        {
          id: "milestone-1-4",
          week: 8,
          description: "体重↓6kg（78kg），养成运动习惯",
          completed: false,
        },
      ],
      tips: [
        "20:00前吃完晚餐",
        "深夜饥饿→先喝2杯水→无效→吃黄瓜/水煮蛋",
        "绝对禁止：泡面、炸鸡、奶茶、含糖饮料",
        "23:30前必须睡觉（睡眠不足会分泌皮质醇导致肥胖）",
        "睡前1小时关闭电子设备",
        "保证7-7.5小时睡眠",
      ],
    },
    {
      id: "phase-2",
      name: "加速期",
      weeks: "第3-4月",
      targetWeight: 72,
      weightLossTarget: 6,
      mainTasks: "突破平台，增加强度",
      dietPlan: {
        dailyCalories: "1400-1600大卡",
        cookingMethods: ["蒸、煮、烤"],
        dailyStructure: {
          breakfast: [
            "蒸山药200g + 水煮蛋 + 无糖豆浆300ml",
            "全麦面包2片 + 金枪鱼罐头 + 番茄",
          ],
          lunch: [
            "荞麦面80g（生重）+ 白灼虾150g + 凉拌黄瓜",
            "调味：生抽+芥末+醋（程序员快手餐）",
          ],
          afternoonTea: [
            "煮鸡蛋（办公室常备）",
            "即食鸡胸肉（开袋即食）",
            "无糖酸奶 + 蓝莓",
          ],
          dinner: ["蔬菜豆腐汤（无限量）+ 卤牛肉100g（周末做好分装）"],
        },
        snackPrinciple: "训练日可适当增加蛋白质摄入",
        mealPackages: {
          breakfast: [
            {
              id: "phase2-bf1",
              name: "山药鸡蛋餐",
              calories: 380,
              foodItems: ["蒸山药200g", "水煮蛋2个", "无糖豆浆300ml"],
              protein: 25,
              carbs: 50,
              fat: 10,
            },
            {
              id: "phase2-bf2",
              name: "全麦面包餐",
              calories: 360,
              foodItems: ["全麦面包2片", "金枪鱼罐头80g", "番茄1个"],
              protein: 28,
              carbs: 40,
              fat: 12,
            },
          ],
          lunch: [
            {
              id: "phase2-lunch1",
              name: "荞麦面虾餐",
              calories: 500,
              foodItems: ["荞麦面80g", "白灼虾150g", "凉拌黄瓜"],
              protein: 35,
              carbs: 60,
              fat: 10,
            },
            {
              id: "phase2-lunch2",
              name: "程序员快手餐",
              calories: 480,
              foodItems: ["荞麦面80g", "鸡胸肉120g", "蔬菜沙拉"],
              protein: 32,
              carbs: 55,
              fat: 15,
            },
          ],
          afternoonTea: [
            {
              id: "phase2-at1",
              name: "蛋白下午茶",
              calories: 120,
              foodItems: ["煮鸡蛋2个"],
              protein: 14,
              carbs: 2,
              fat: 8,
            },
            {
              id: "phase2-at2",
              name: "酸奶水果",
              calories: 150,
              foodItems: ["无糖酸奶1杯", "蓝莓100g"],
              protein: 8,
              carbs: 20,
              fat: 5,
            },
          ],
          dinner: [
            {
              id: "phase2-dinner1",
              name: "豆腐汤套餐",
              calories: 350,
              foodItems: ["蔬菜豆腐汤", "卤牛肉100g"],
              protein: 25,
              carbs: 15,
              fat: 12,
            },
          ],
        },
      },
      exercisePlan: {
        weeklySchedule: {
          周一: {
            type: "俯卧撑进阶",
            exercises: [
              { name: "标准俯卧撑", sets: 4, reps: "15次" },
              { name: "钻石俯卧撑", sets: 3, reps: "10次" },
              { name: "宽距俯卧撑", sets: 3, reps: "12次" },
              { name: "HIIT：波比跳", sets: 5, reps: "12次" },
            ],
            duration: "45分钟",
          },
          周二: {
            type: "跑步日",
            exercises: [
              { name: "间歇跑", sets: 6, reps: "慢跑5分钟+快跑1分钟" },
            ],
            duration: "45分钟",
          },
          周三: {
            type: "臀腿强化",
            exercises: [
              { name: "单腿深蹲", sets: 3, reps: "8次/腿" },
              { name: "保加利亚分腿蹲", sets: 3, reps: "10次/腿" },
              { name: "臀桥", sets: 4, reps: "20次" },
              { name: "跳绳", sets: 4, reps: "2分钟" },
            ],
            duration: "45分钟",
          },
          周四: {
            type: "上肢力量",
            exercises: [
              { name: "引体向上（或弹力带划船）", sets: 4, reps: "力竭" },
              { name: "倒立撑（靠墙）", sets: 3, reps: "力竭" },
              { name: "臂屈伸（用椅子）", sets: 3, reps: "15次" },
              { name: "核心：卷腹", sets: 4, reps: "20次" },
            ],
            duration: "45分钟",
          },
          周五: {
            type: "HIIT燃脂",
            exercises: [
              {
                name: "30秒冲刺+30秒休息×10轮",
                sets: 1,
                reps: "开合跳、深蹲跳、登山跑、高抬腿",
              },
            ],
            duration: "30分钟",
          },
          周六: {
            type: "户外活动",
            exercises: [{ name: "游泳/羽毛球/篮球", sets: 1, reps: "90分钟" }],
            duration: "90分钟",
          },
          周日: {
            type: "休息",
            exercises: [{ name: "休息或轻度拉伸", sets: 1, reps: "30分钟" }],
            duration: "30分钟",
          },
        },
        programmerTips: [
          "保持站立办公习惯",
          "继续使用番茄工作法",
          "增加水的摄入量",
        ],
      },
      milestones: [
        {
          id: "milestone-2-1",
          week: 12,
          description: "体重74kg，体脂率下降4-5%",
          completed: false,
        },
        {
          id: "milestone-2-2",
          week: 16,
          description: "体重72kg，完成10个标准俯卧撑",
          completed: false,
        },
        {
          id: "milestone-2-3",
          week: 16,
          description: "基础代谢提升15%",
          completed: false,
        },
        {
          id: "milestone-2-4",
          week: 16,
          description: "腰围减少8-10cm，体能明显增强（爬楼不喘）",
          completed: false,
        },
      ],
      tips: [
        "引入碳水循环：训练日增加主食至100g生重，休息日主食减半，增加蛋白质",
        "欺骗餐：每2周一次（放在午餐）",
        "平台期应对：连续2周体重不降时，增加100大卡蛋白质，减少50g碳水，改变运动类型",
      ],
    },
    {
      id: "phase-3",
      name: "塑形期",
      weeks: "第5-6月",
      targetWeight: 67,
      weightLossTarget: 5,
      mainTasks: "塑形为主，优化体脂",
      dietPlan: {
        dailyCalories: "1500-1700大卡",
        cookingMethods: ["蒸、煮、烤、煎（少油）"],
        dailyStructure: {
          breakfast: ["燕麦50g + 全蛋2个 + 蛋白2个 + 牛油果半个"],
          lunch: ["藜麦80g + 卤鸡腿去皮 + 蒸时蔬"],
          afternoonTea: ["训练后加餐：香蕉1根 + 蛋白粉1勺（或牛奶）"],
          dinner: ["三文鱼/鳕鱼150g（蒸锅）+ 沙拉菜"],
        },
        snackPrinciple:
          "运动后30分钟内补充蛋白质，睡前2小时喝酪蛋白（或喝牛奶）",
        mealPackages: {
          breakfast: [
            {
              id: "phase3-bf1",
              name: "高蛋白早餐",
              calories: 420,
              foodItems: ["燕麦50g", "全蛋2个", "蛋白2个", "牛油果半个"],
              protein: 35,
              carbs: 30,
              fat: 20,
            },
          ],
          lunch: [
            {
              id: "phase3-lunch1",
              name: "藜麦鸡腿餐",
              calories: 550,
              foodItems: ["藜麦80g", "卤鸡腿去皮1个", "蒸时蔬200g"],
              protein: 40,
              carbs: 45,
              fat: 15,
            },
          ],
          afternoonTea: [
            {
              id: "phase3-at1",
              name: "训练后加餐",
              calories: 200,
              foodItems: ["香蕉1根", "蛋白粉1勺"],
              protein: 25,
              carbs: 20,
              fat: 5,
            },
          ],
          dinner: [
            {
              id: "phase3-dinner1",
              name: "三文鱼沙拉",
              calories: 400,
              foodItems: ["三文鱼150g", "混合沙拉菜200g"],
              protein: 35,
              carbs: 10,
              fat: 25,
            },
            {
              id: "phase3-dinner2",
              name: "鳕鱼沙拉",
              calories: 380,
              foodItems: ["鳕鱼150g", "混合沙拉菜200g"],
              protein: 32,
              carbs: 8,
              fat: 22,
            },
          ],
        },
      },
      exercisePlan: {
        weeklySchedule: {
          周一: {
            type: "胸肌日",
            exercises: [
              { name: "标准俯卧撑", sets: 4, reps: "20次" },
              { name: "下斜俯卧撑", sets: 4, reps: "15次" },
              { name: "双杠臂屈伸（用椅子）", sets: 4, reps: "12次" },
              { name: "有氧：慢跑", sets: 1, reps: "20分钟" },
            ],
            duration: "60分钟",
          },
          周二: {
            type: "背部日",
            exercises: [
              { name: "引体向上", sets: 4, reps: "力竭" },
              { name: "澳洲引体（桌子下）", sets: 4, reps: "15次" },
              { name: "超人起飞", sets: 3, reps: "20次" },
              { name: "有氧：跳绳", sets: 1, reps: "15分钟" },
            ],
            duration: "60分钟",
          },
          周三: {
            type: "腿部日",
            exercises: [
              { name: "pistol squat（手枪蹲）", sets: 3, reps: "5次/腿" },
              { name: "深蹲跳", sets: 4, reps: "15次" },
              { name: "单腿硬拉", sets: 3, reps: "12次/腿" },
              { name: "有氧：椭圆机/爬楼梯", sets: 1, reps: "30分钟" },
            ],
            duration: "60分钟",
          },
          周四: {
            type: "肩部+手臂",
            exercises: [
              { name: "倒立撑", sets: 5, reps: "5次" },
              { name: "侧平举（用水瓶）", sets: 4, reps: "15次" },
              { name: "臂屈伸", sets: 4, reps: "15次" },
              { name: "有氧：HIIT", sets: 1, reps: "20分钟" },
            ],
            duration: "60分钟",
          },
          周五: {
            type: "核心强化",
            exercises: [
              { name: "龙旗（简易版）", sets: 3, reps: "5次" },
              { name: "健腹轮（或卷腹）", sets: 4, reps: "20次" },
              { name: "俄罗斯转体", sets: 4, reps: "30次" },
              { name: "有氧：慢跑", sets: 1, reps: "40分钟" },
            ],
            duration: "60分钟",
          },
          周六日: {
            type: "户外活动+拉伸",
            exercises: [
              { name: "户外活动", sets: 1, reps: "60-90分钟" },
              { name: "全身拉伸", sets: 1, reps: "30分钟" },
            ],
            duration: "90-120分钟",
          },
        },
        programmerTips: [
          "每周2次，睡前拉伸15分钟（促进生长激素分泌）",
          "保持良好的睡眠习惯",
          "注意饮食营养均衡",
        ],
      },
      milestones: [
        {
          id: "milestone-3-1",
          week: 20,
          description: "体重69kg，体脂率20%以下",
          completed: false,
        },
        {
          id: "milestone-3-2",
          week: 24,
          description: "体重67kg，腹肌开始显现",
          completed: false,
        },
        {
          id: "milestone-3-3",
          week: 24,
          description: "肌肉量明显增加",
          completed: false,
        },
        {
          id: "milestone-3-4",
          week: 24,
          description: "衣服尺码下降2-3个，精力提升，代码效率提高",
          completed: false,
        },
      ],
      tips: [
        "蛋白质提升至30%：120-130g/天",
        "碳水：150g（训练日）/ 100g（休息日）",
        "脂肪：40g",
        "周末备餐：周日蒸好5天份的紫薯、鸡胸肉，分装冷冻，每天带1份去公司",
      ],
    },
    {
      id: "phase-4",
      name: "冲刺期",
      weeks: "第7-8月",
      targetWeight: 63,
      weightLossTarget: 4,
      mainTasks: "稳定巩固，防止反弹",
      dietPlan: {
        dailyCalories: "1600-1800大卡",
        cookingMethods: ["各种烹饪方式，控制油量"],
        dailyStructure: {
          breakfast: ["全麦面包3片 + 花生酱 + 煎蛋（无油）+ 牛奶"],
          lunch: ["正常米饭100g + 家常炒菜（少油）+ 瘦肉100g"],
          afternoonTea: ["水果1个", "原味坚果10颗"],
          dinner: ["蒸粗粮 + 蛋白质 + 大量蔬菜"],
        },
        snackPrinciple: "什么都可以吃，但控制份量",
        mealPackages: {
          breakfast: [
            {
              id: "phase4-bf1",
              name: "全麦面包套餐",
              calories: 450,
              foodItems: ["全麦面包3片", "花生酱10g", "煎蛋1个", "牛奶200ml"],
              protein: 25,
              carbs: 55,
              fat: 15,
            },
          ],
          lunch: [
            {
              id: "phase4-lunch1",
              name: "家常便饭",
              calories: 600,
              foodItems: ["米饭100g", "瘦肉100g", "炒菜200g", "蔬菜汤"],
              protein: 30,
              carbs: 70,
              fat: 18,
            },
          ],
          afternoonTea: [
            {
              id: "phase4-at1",
              name: "水果坚果",
              calories: 180,
              foodItems: ["苹果1个", "原味坚果10颗"],
              protein: 4,
              carbs: 25,
              fat: 12,
            },
          ],
          dinner: [
            {
              id: "phase4-dinner1",
              name: "粗粮套餐",
              calories: 420,
              foodItems: ["蒸红薯150g", "鸡胸肉120g", "清炒蔬菜"],
              protein: 28,
              carbs: 40,
              fat: 10,
            },
          ],
        },
      },
      exercisePlan: {
        weeklySchedule: {
          "周一/三/五": {
            type: "全身力量训练",
            exercises: [{ name: "全身力量训练", sets: 1, reps: "45分钟" }],
            duration: "45分钟",
          },
          "周二/四": {
            type: "中强度有氧",
            exercises: [{ name: "中强度有氧", sets: 1, reps: "40分钟" }],
            duration: "40分钟",
          },
          周六: {
            type: "户外活动",
            exercises: [{ name: "户外活动", sets: 1, reps: "60分钟" }],
            duration: "60分钟",
          },
          周日: {
            type: "休息",
            exercises: [{ name: "休息", sets: 1, reps: "全天" }],
            duration: "全天",
          },
        },
        programmerTips: [
          "保持运动习惯，不求强度，但求坚持",
          "继续使用番茄工作法",
          "保持良好的睡眠习惯",
        ],
      },
      milestones: [
        {
          id: "milestone-4-1",
          week: 28,
          description: "体重65kg，决定最后冲刺",
          completed: false,
        },
        {
          id: "milestone-4-2",
          week: 32,
          description: "体重63kg，体脂率15-17%",
          completed: false,
        },
        {
          id: "milestone-4-3",
          week: 32,
          description: "达到目标95%，身体适应新体重",
          completed: false,
        },
        {
          id: "milestone-4-4",
          week: 32,
          description: "养成运动习惯（不运动不舒服），学会自我管理",
          completed: false,
        },
      ],
      tips: [
        "逐步恢复正常饮食：增加优质碳水（红薯→米饭）",
        "每周2次欺骗餐（但不能暴食）",
        "学习计算食物热量，为维持期打基础",
        "注意心理建设：防止厌倦情绪和放弃念头",
      ],
    },
    {
      id: "phase-5",
      name: "维持期",
      weeks: "第9-12月",
      targetWeight: 60,
      weightLossTarget: 3,
      mainTasks: "养成易瘦体质",
      dietPlan: {
        dailyCalories: "1800-2000大卡",
        cookingMethods: ["各种烹饪方式，控制油量"],
        dailyStructure: {
          breakfast: ["健康早餐，种类多样化"],
          lunch: ["正常饮食，控制份量"],
          afternoonTea: ["水果或坚果"],
          dinner: ["清淡为主，适量蛋白质和蔬菜"],
        },
        snackPrinciple: "80%健康+20%放纵，工作日严格控制，周末正常社交",
        mealPackages: {
          breakfast: [
            {
              id: "phase5-bf1",
              name: "均衡早餐",
              calories: 500,
              foodItems: ["全麦面包2片", "鸡蛋2个", "牛奶200ml", "水果1个"],
              protein: 25,
              carbs: 55,
              fat: 18,
            },
            {
              id: "phase5-bf2",
              name: "中式早餐",
              calories: 480,
              foodItems: ["包子2个", "豆浆300ml", "鸡蛋1个"],
              protein: 20,
              carbs: 70,
              fat: 12,
            },
          ],
          lunch: [
            {
              id: "phase5-lunch1",
              name: "营养午餐",
              calories: 700,
              foodItems: ["米饭120g", "鱼肉150g", "蔬菜200g", "汤"],
              protein: 35,
              carbs: 80,
              fat: 20,
            },
          ],
          afternoonTea: [
            {
              id: "phase5-at1",
              name: "健康下午茶",
              calories: 200,
              foodItems: ["水果1个", "坚果少量"],
              protein: 3,
              carbs: 25,
              fat: 12,
            },
          ],
          dinner: [
            {
              id: "phase5-dinner1",
              name: "清淡晚餐",
              calories: 550,
              foodItems: ["杂粮饭100g", "豆腐150g", "清炒蔬菜"],
              protein: 25,
              carbs: 60,
              fat: 15,
            },
          ],
        },
      },
      exercisePlan: {
        weeklySchedule: {
          每周: {
            type: "常态化运动",
            exercises: [
              { name: "每周3次运动", sets: 1, reps: "成为生活一部分" },
              { name: "融入日常", sets: 1, reps: "骑行上班、爬楼梯" },
            ],
            duration: "灵活安排",
          },
        },
        programmerTips: [
          "保持站立办公习惯",
          "继续使用番茄工作法",
          "保持良好的睡眠习惯",
        ],
      },
      milestones: [
        {
          id: "milestone-5-1",
          week: 40,
          description: "稳定在62kg左右",
          completed: false,
        },
        {
          id: "milestone-5-2",
          week: 48,
          description: "稳定在60kg，养成易瘦体质",
          completed: false,
        },
        {
          id: "milestone-5-3",
          week: 48,
          description: "形成永久习惯：每天称体重、餐前拍照、久坐提醒",
          completed: false,
        },
      ],
      tips: [
        "体重浮动2kg内立即调整",
        "保持运动习惯，每周至少3次",
        "继续监测体重和体脂率",
        "保持良好的生活习惯",
      ],
    },
  ],
};
// 初始用户进度
export const initialUserProgress = {
  currentWeight: 84,
  startDate: new Date().toISOString().split('T')[0],
  currentPhase: 'phase-1',
  completedMilestones: [],
  streakCount: 0,
  totalCheckIns: 0,
  lastUpdated: new Date().toISOString().split('T')[0]
};

// 初始设置
export const initialSettings = {
  reminderEnabled: true,
  reminderTime: '08:00',
  measurementReminderEnabled: true,
  measurementReminderDay: 'Sunday',
  theme: 'auto'
} as Settings;
