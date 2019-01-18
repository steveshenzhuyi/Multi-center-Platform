import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";
import data from "@/components/data/data";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/data",
          name: "数据总览",
          component: data
        },
        {
          path: "/indiresearch",
          name: "个人研究",
          component: () => import("@/components/indiresearch/indiresearch"),
          children: [
            {
              path: "newresearch",
              name: "新建个人研究",
              component: () => import("@/components/indiresearch/newResearch"),
              meta: {
                title: "新建个人研究"
              }
            },
            {
              path: "createcohort",
              name: "队列生成",
              component: () => import("@/components/indiresearch/createCohort"),
              meta: {
                title: "队列生成"
              }
            },
            {
              path: "researchlist",
              name: "研究列表",
              component: () => import("@/components/indiresearch/researchList"),
              meta: {
                title: "研究列表"
              }
            },
            {
              path: "newvariable",
              name: "变量生成",
              component: () => import("@/components/indiresearch/newVariable"),
              meta: {
                title: "变量生成"
              }
            },
            {
              path: "selectmodel",
              name: "模型选择",
              component: () => import("@/components/indiresearch/selectModel"),
              meta: {
                title: "模型选择"
              }
            },
            {
              path: "analysisresult",
              name: "结果分析",
              component: () =>
                import("@/components/indiresearch/analysisResult"),
              meta: {
                title: "结果分析"
              }
            },
            {
              path: "conceptsetList",
              name: "概念集列表",
              component: () =>
                import("@/components/indiresearch/conceptsetList")
            }
          ]
        },
        {
          path: "/coresearch",
          name: "协同研究",
          component: () => import("@/components/coresearch/coresearch"),
          children: [
            {
              path: "teamlist",
              name: "我的团队",
              component: () => import("@/components/coresearch/teamList"),
              meta: {
                title: "我的团队"
              }
            },
            {
              path: "myteam",
              name: "团队详情",
              component: () => import("@/components/coresearch/myTeam"),
              meta: {
                title: "团队详情"
              }
            },
            {
              path: "newresearch",
              name: "新建研究",
              component: () => import("@/components/coresearch/newResearch"),
              meta: {
                title: "新建研究"
              }
            },
            {
              path: "jointeam",
              name: "加入团队",
              component: () => import("@/components/coresearch/joinTeam"),
              meta: {
                title: "加入团队"
              }
            },
            {
              path: "newteam",
              name: "构建团队",
              component: () => import("@/components/coresearch/newTeam"),
              meta: {
                title: "构建团队"
              }
            },
            {
              path: "qualification",
              name: "资格审核",
              component: () => import("@/components/coresearch/qualification"),
              meta: {
                title: "资格审核"
              }
            },
            {
              path: "result",
              name: "成果讨论",
              component: () => import("@/components/coresearch/result"),
              meta: {
                title: "成果讨论"
              }
            },
            {
              path: "mccompute",
              name: "多中心计算",
              component: () => import("@/components/coresearch/mccompute"),
              meta: {
                title: "多中心计算"
              }
            }
          ]
        },
        {
          path: "/knowledgegraph",
          name: "知识图谱",
          component: () => import("@/components/knowledgegraph/knowledgegraph")
        },
        {
          path: "/dataimport",
          name: "数据导入",
          component: () => import("@/components/dataimport/dataimport")
        },
        {
          path: "/personalpage",
          name: "个人主页",
          component: () => import("@/components/personalpage")
        },
        {
          path: "/usermanage",
          name: "用户管理",
          component: () => import("@/components/admincenter/usermanage")
        },
        {
          path: "/authoritymanage",
          name: "权限控制",
          component: () => import("@/components/admincenter/authoritymanage")
        },
        {
          path: "/thirdparty",
          name: "第三方数据使用",
          component: () => import("@/components/thirdparty/thirdparty"),
          children: [
            {
              path: "jointeam",
              name: "加入团队",
              component: () => import("@/components/thirdparty/jointeam"),
              meta: {
                title: "加入团队"
              }
            }
          ]
        },
        {
          path: "/nodemanage",
          name: "节点管理",
          component: () => import("@/components/nodemanage/nodemanage"),
          children: [
            {
              path: "nodelist",
              name: "节点列表",
              component: () => import("@/components/nodemanage/nodeList"),
              meta: {
                title: "节点列表"
              }
            },
            {
              path: "nodedetail",
              name: "节点详情",
              component: () => import("@/components/nodemanage/nodeDetail"),
              meta: {
                title: "节点详情"
              }
            },
            {
              path: "operation",
              name: "操作查询",
              component: () => import("@/components/nodemanage/operation"),
              meta: {
                title: "操作查询"
              }
            }
          ]
        }
      ]
    }
  ]
});
