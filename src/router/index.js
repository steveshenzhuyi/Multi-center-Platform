import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";
import data from "@/components/data/data";
import coresearch from "@/components/coresearch/coresearch";
import indiresearch from "@/components/indiresearch/indiresearch";
import knowledgegraph from "@/components/knowledgegraph/knowledgegraph";
import dataimport from "@/components/dataimport/dataimport";
import personalpage from "@/components/admincenter/personalpage";
import resourcestatus from "@/components/admincenter/resourcestatus";
import authoritycontrol from "@/components/admincenter/authoritycontrol";
import thirdparty from "@/components/thirdparty/thirdparty";

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
          component: indiresearch,
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
          component: coresearch,
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
              path: "newcoresearch",
              name: "新建团队研究",
              component: () => import("@/components/coresearch/newCoresearch"),
              meta: {
                title: "新建团队研究"
              }
            }
          ]
        },
        {
          path: "/knowledgegraph",
          name: "知识图谱",
          component: knowledgegraph
        },
        {
          path: "/dataimport",
          name: "数据导入",
          component: dataimport
        },
        {
          path: "/personalpage",
          name: "个人主页",
          component: personalpage
        },
        {
          path: "/resourcestatus",
          name: "资源状态",
          component: resourcestatus
        },
        {
          path: "/authoritycontrol",
          name: "权限控制",
          component: authoritycontrol
        },
        {
          path: "/thirdparty",
          name: "第三方数据使用",
          component: thirdparty
        }
      ]
    }
  ]
});
