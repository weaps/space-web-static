// 班级空间路由列表

// 班级空间首页
const CSHome = () => import("@/pages/class-space/home/home");

export const ClassSpaceRouter = [
  {
    path: "/class-space/home",
    name: "CSHome",
    component: CSHome,
    meta: { requiresAuth: false },
  },
];
