import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";
import myresearch from "@/components/myresearch/myresearch";
import hisresearch from "@/components/myresearch/hisresearch";
import data from "@/components/data/data";
import coresearch from "@/components/coresearch/coresearch";
import knowledgegraph from "@/components/knowledgegraph/knowledgegraph";
import dataimport from "@/components/dataimport/dataimport";
import personalpage from "@/components/admincenter/personalpage";
import resourcestatus from "@/components/admincenter/resourcestatus";
import authoritycontrol from "@/components/admincenter/authoritycontrol";
import thirdparty from "@/components/thirdparty/thirdparty";
import createqueue from "@/components/myresearch/createqueue";

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
          path: "/myresearch",
          name: "我的研究",
          component: myresearch
        },
        {
          path: "/myresearch/createqueue",
          name: "创建队列",
          component: createqueue
        },
        {
          path: "/hisresearch",
          name: "历史研究",
          component: hisresearch
        },
        {
          path: "/coresearch",
          name: "协同研究",
          component: coresearch,
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
