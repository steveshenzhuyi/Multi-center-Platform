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
              component: () => import("@/components/indiresearch/newResearch")
            },
            {
              path: "createcohort",
              name: "新建队列",
              component: () => import("@/components/indiresearch/createCohort")
            },
            {
              path: "researchlist",
              name: "研究列表",
              component: () => import("@/components/indiresearch/researchList")
            },
            {
              path: "newvariable",
              name: "变量生成",
              component: () => import("@/components/indiresearch/newVariable")
            },
            {
              path: "selectmodel",
              name: "模型选择",
              component: () => import("@/components/indiresearch/selectModel")
            },
            {
              path: "analysisresult",
              name: "结果分析",
              component: () =>
                import("@/components/indiresearch/analysisResult")
            }
          ]
        },
        {
          path: "/coresearch",
          name: "协同研究",
          component: () => import("@/components/coresearch/coresearch"),
          children: [
            {
              path: "myteam",
              name: "我的团队",
              component: () => import("@/components/coresearch/myteam"),
              meta: {
                title: "我的团队"
              }
            },
            {
              path: "newresearch",
              name: "新建研究",
              component: () => import("@/components/coresearch/newresearch"),
              meta: {
                title: "新建研究"
              }
            },
            {
              path: "jointeam",
              name: "加入团队",
              component: () => import("@/components/coresearch/jointeam"),
              meta: {
                title: "加入团队"
              }
            },
            {
              path: "newteam",
              name: "构建团队",
              component: () => import("@/components/coresearch/newteam"),
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
              path: "newcoresearch",
              name: "新建团队研究",
              component: () => import("@/components/coresearch/newcoresearch"),
              meta: {
                title: "新建团队研究"
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
          component: () => import("@/components/thirdparty/thirdparty")
        },
        {
          path: "/nodemanage",
          name: "节点管理",
          component: () => import("@/components/nodemanage/nodemanage")
        }
      ]
    }
  ]
});
