// 示例
// [
//   {
//     id: '01',
//     label: '工作台',
//     url: '/index/home'
//   },
//   {
//     id: '02',
//     label: '权限管理',
//     children: [
//       {
//         id: '0201',
//         label: '用户管理',
//         url: '/index/user'
//       }
//     ]
//   }
// ]
const menuList = [
  {
    id: '01',
    label: '工作台',
    url: '/index/home'
  },
  {
    id: '02',
    label: '权限管理',
    children: [
      {
        id: '0201',
        label: '用户管理',
        url: '/index/user'
      }
    ]
  }
]
export default menuList
