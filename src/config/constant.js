// 月简写对应表
export const dateMap = new Map([
  [1, 'Jan.'],
  [2, 'Feb.'],
  [3, 'Mar.'],
  [4, 'Apr.'],
  [5, 'May.'],
  [6, 'Jun.'],
  [7, 'Jul.'],
  [8, 'Aug.'],
  [9, 'Sept.'],
  [10, 'Oct.'],
  [11, 'Nov.'],
  [12, 'Dec.'],
])

/**
 * 以下为获取非物质文化遗产需要参数
 * 信息来源：中国非物质文化遗产网：https://www.ihchina.cn/
 *
 * https://www.ihchina.cn/getProject.html
 * ?province=     所属地区
 * &rx_time=      公布时间
 * &type=10       类型
 * &cate=         新增项目 / 扩展项目
 * &keywords=     关键词
 * &category_value=16
 * &limit=10      每页 ？ 个
 * &p=1           第几页
 */
// 所属地区
export const PROVINCE = [
  {
    value: '',
    label: '全部'
  },
  {
    value: '110000',
    label: '北京市',
  },
  {
    value: '120000',
    label: '天津市'
  },
  {
    value: '130000',
    label: '河北省'
  },
  {
    value: '140000',
    label: '山西省'
  },
  {
    value: '150000',
    label: '内蒙古自治区'
  },
  {
    value: '210000',
    label: '辽宁省'
  },
  {
    value: '220000',
    label: '吉林省'
  },
  {
    value: '230000',
    label: '黑龙江省'
  },
  {
    value: '310000',
    label: '上海市'
  },
  {
    value: '320000',
    label: '江苏省'
  },
  {
    value: '330000',
    label: '浙江省'
  },
  {
    value: '340000',
    label: '安徽省'
  },
  {
    value: '350000',
    label: '福建省'
  },
  {
    value: '360000',
    label: '江西省'
  },
  {
    value: '370000',
    label: '山东省'
  },
  {
    value: '410000',
    label: '河南省'
  },
  {
    value: '420000',
    label: '湖北省'
  },
  {
    value: '430000',
    label: '湖南省'
  },
  {
    value: '440000',
    label: '广东省'
  },
  {
    value: '450000',
    label: '广西壮族自治区'
  },
  {
    value: '460000',
    label: '海南省'
  },
  {
    value: '500000',
    label: '重庆市'
  },
  {
    value: '510000',
    label: '四川省'
  },
  {
    value: '520000',
    label: '贵州省'
  },
  {
    value: '530000',
    label: '云南省'
  },
  {
    value: '540000',
    label: '西藏自治区'
  },
  {
    value: '610000',
    label: '陕西省'
  },
  {
    value: '620000',
    label: '甘肃省'
  },
  {
    value: '630000',
    label: '青海省'
  },
  {
    value: '640000',
    label: '宁夏回族自治区'
  },
  {
    value: '650000',
    label: '新疆维吾尔自治区'
  },
  {
    value: '990122',
    label: '新疆生产建设兵团'
  },
  {
    value: '810000',
    label: '香港'
  },
  {
    value: '820000',
    label: '澳门'
  },
  {
    value: '990121',
    label: '中直单位'
  },
]

// 类型
export const TYPE = [
  {
    value: '',
    label: '全部'
  },
  {
    value: '1',
    label: '民间文学'
  },
  {
    value: '2',
    label: '传统音乐'
  },
  {
    value: '3',
    label: '传统舞蹈'
  },
  {
    value: '4',
    label: '传统戏剧'
  },
  {
    value: '5',
    label: '曲艺'
  },
  {
    value: '6',
    label: '传统体育、游艺与杂技'
  },
  {
    value: '7',
    label: '传统美术'
  },
  {
    value: '8',
    label: '传统技艺'
  },
  {
    value: '9',
    label: '传统医药'
  },
  {
    value: '10',
    label: '民俗'
  }
]

// 新增项目 / 扩展项目 默认新增
export const CATE = "1"

// 反馈类型
export const FEEDBACK_LIST = [
  {
    label: "bug",
    value: 1
  },
  {
    label: '功能优化',
    value: 2
  },
  {
    label: '功能调整',
    value: 3
  },
  {
    label: '新增功能',
    value: 4
  },
  {
    label: '其他',
    value: 5
  }
]
export const FEEDBACK_MAP = new Map([
  [1, "bug"],
  [2, "功能优化"],
  [3, "功能调整"],
  [4, "新增功能"],
  [5, "其他"]
])