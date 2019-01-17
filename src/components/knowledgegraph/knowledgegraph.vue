<template>
  <div>
    <p>知识图谱</p>
    <el-form ref="NewConceptSets"
             label-width="100px"
             class="demo-ruleForm concept-container">
      <el-row :gutter="10"
              style="margin-top:10px;margin-bottom:10px"
              type="flex"
              justify="center">
        <el-col :span="14">
          <el-input prefix-icon="el-icon-search"
                    v-model="InputConceptName"
                    type="text"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     @click="getSearchData">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="content_padding"
         id="dashboard_svg">
    </div>
  </div>
</template>
<script>
import axios from "axios"
// import * as d3 from "d3"
// import d3tooltip from "d3-tooltip"

//D3图形全局变量
// let g = '', //D3画布
//   colorScale = '',  //组件颜色
//   tooltip = '', //图示框信息
//   marker = '',  //箭头信息
//   gs = '',  //节点元素信息
//   gText = '', //节点文字信息
//   forceSimulation = '', //力导向图信息
//   links = '', //连线元素信息
//   linksText = ''  //连线文字信息

// var that = ''

// //D3画布宽高
// let width = 800
// let height = 800

// //重复查询标志--用于第二次查询起重新绘制画布
// var flag = 0

// //节点数据和连线数据
// var nodes = []
// var edges = []


export default {
  name: 'Scale',
  data() {
    return {
      //D3图形全局变量
      g: '',
      colorScale: '',  //组件颜色
      tooltip: '', //图示框信息
      marker: '',  //箭头信息
      gs: '',  //节点元素信息
      gText: '', //节点文字信息
      forceSimulation: '', //力导向图信息
      links: '', //连线元素信息
      linksText: '',  //连线文字信息
      //D3画布大小
      width: 800,
      height: 800,
      //重复查询标志--用于第二次查询起重新绘制画布
      flag: 0,
      //节点数据和连线数据
      nodes: [],
      edges: [],
      //搜索概念ID
      InputConceptName: "",
      ConceptId: "",
      LastConceptId: "",
      //查询得到的中心节点和父子节点信息
      EmptyCenter: 0,
      CenterNode: '',
      AncestorNodes: [],
      DescendantNodes: [],
      //父子节点数量
      anc_num: 0,
      des_num: 0,
    }
  },

  methods: {
    //获取搜索结果
    getSearchData() {
      //第二次查询开始，刷新D3画布
      if (this.flag != 0) {
        this.refreshSVG()
        this.LastConceptId = this.CenterNode.subject
      }
      //重置数据
      this.ConceptId = this.InputConceptName
      this.nodes = []
      this.edges = []
      this.EmptyCenter = 0
      this.CenterNode = ''
      this.AncestorNodes = []
      this.DescendantNodes = []
      this.anc_num = 0
      this.des_num = 0
      //获取中心节点、父子节点查询结果
      var p1 = this.searchCenterConcept()
      var p2 = this.searchAncestorConcept()
      var p3 = this.searchDescendantConcept()
      //等待全部查询完成
      Promise.all([p1, p2, p3]).then(() => {
        if (this.EmptyCenter != 1) {
          //添加D3节点
          this.nodes.push(this.CenterNode)
          this.nodes = this.nodes.concat(this.AncestorNodes)
          this.nodes = this.nodes.concat(this.DescendantNodes)
          //添加D3父节点关系
          for (var i = 0; i < this.anc_num; i++) {
            // 创建父节点关系信息
            var relationship = {}
            relationship.source = 0
            relationship.target = i + 1
            relationship.relation = 'Is a'
            relationship.value = 2.5
            relationship.type = 1
            //添加父节点关系
            this.edges.push(relationship)
          }
          //添加D3子节点关系
          for (var i = 0; i < this.des_num; i++) {
            // 创建子节点关系信息
            var relationship = {}
            relationship.source = this.anc_num + i + 1
            relationship.target = 0
            relationship.relation = 'Subsumes'
            relationship.value = 2
            relationship.type = 2
            //添加子节点关系
            this.edges.push(relationship)
          }
          //创建D3图形
          this.createForceGraph()
          this.createToolTip()
          this.createArrow()
          this.updateLinks()
          this.updateNodes()
          //置位刷新标志
          this.flag = this.flag + 1
        }
        else {
          console.log('No Matching Concept')
        }
      })
    },

    // getClickSearch(d) {
    //   this.ConceptId = d
    //   console.log(d)
    //   nodes = []
    //   edges = []
    //   this.AncestorNodes = []
    //   this.DescendantNodes = []
    //   this.anc_num = 0
    //   this.des_num = 0
    //   //第二次查询开始，刷新D3画布
    //   if (flag != 0) {
    //     this.refreshSVG()
    //   }
    //   //获取中心节点、父子节点查询结果
    //   var p1 = this.searchCenterConcept()
    //   var p2 = this.searchAncestorConcept()
    //   var p3 = this.searchDescendantConcept()
    //   //等待全部查询完成
    //   Promise.all([p1, p2, p3]).then(() => {
    //     //添加D3节点
    //     nodes.push(this.CenterNode)
    //     nodes = nodes.concat(this.AncestorNodes)
    //     nodes = nodes.concat(this.DescendantNodes)
    //     //添加D3父节点关系
    //     for (var i = 0; i < this.anc_num; i++) {
    //       // 创建父节点关系信息
    //       var relationship = {}
    //       relationship.source = 0
    //       relationship.target = i + 1
    //       relationship.relation = 'Is a'
    //       relationship.value = 2.5
    //       relationship.type = 1
    //       //添加父节点关系
    //       edges.push(relationship)
    //     }
    //     //添加D3子节点关系
    //     for (var i = 0; i < this.des_num; i++) {
    //       // 创建子节点关系信息
    //       var relationship = {}
    //       relationship.source = this.anc_num + i + 1
    //       relationship.target = 0
    //       relationship.relation = 'Subsumes'
    //       relationship.value = 2
    //       relationship.type = 2
    //       //添加子节点关系
    //       edges.push(relationship)
    //     }
    //     console.log(nodes)
    //     console.log(edges)
    //     //创建D3图形
    //     this.createForceGraph()
    //     this.createToolTip()
    //     this.createArrow()
    //     this.updateLinks()
    //     this.updateNodes()
    //     //置位刷新标志
    //     flag = flag + 1
    //   })
    // },

    //查询中心节点信息
    searchCenterConcept() {
      return new Promise((resolve, reject) => {
        const InputConceptName = this.ConceptId;
        axios.get('/knowledgeGraph/queryConceptID', {
          params: {
            "token": this.GLOBAL.token,
            "query": InputConceptName
          },
          //timeout: 1000 * 60 * 3
        })
          .then((response) => {
            // console.log(InputConceptName)
            const searchConcepts = response.data.data.results.bindings
            //创建中心节点概念信息
            if (searchConcepts.length != 0) {
              var centerConcept = {}
              centerConcept.type = 1
              var a = searchConcepts[0].subject.value.split('#')
              centerConcept.subject = a[1]
              centerConcept.name = searchConcepts[0].label.value
              centerConcept.domain = searchConcepts[0].domain.value
              centerConcept.class = searchConcepts[0].class.value
              centerConcept.voc = searchConcepts[0].voc.value
              centerConcept.std = Object.getOwnPropertyNames(searchConcepts[0]).length > 5 ? searchConcepts[0].std.value : ''
              //添加中心节点
              this.CenterNode = centerConcept
              resolve()
            }
            else {
              this.EmptyCenter = 1
              resolve()
            }
          })
          .catch(function (error) {
            console.log("error", error);
            //拒绝Promise
            reject(error)
          });
      })
    },

    searchAncestorConcept() {
      return new Promise((resolve, reject) => {
        const InputConceptName = this.ConceptId;
        axios.get('/knowledgeGraph/queryConceptAncestor', {
          params: {
            "token": this.GLOBAL.token,
            "query": InputConceptName
          },
          //timeout: 1000 * 60 * 3
        })
          .then((response) => {
            // console.log(InputConceptName)
            const searchConcepts = response.data.data.results.bindings

            if (searchConcepts.length > 0) {
              var target_num = 0
              for (var i = 0; i < searchConcepts.length; i++) {
                //计数变更
                target_num++
                //创建父节点概念信息
                var ancestorConcept = {}
                ancestorConcept.type = 0
                var a = searchConcepts[i].anc.value.split('#')
                ancestorConcept.subject = a[1]
                ancestorConcept.name = searchConcepts[i].label.value
                ancestorConcept.domain = searchConcepts[i].domain.value
                ancestorConcept.class = searchConcepts[i].class.value
                ancestorConcept.voc = searchConcepts[i].voc.value
                ancestorConcept.std = Object.getOwnPropertyNames(searchConcepts[i]).length > 5 ? searchConcepts[i].std.value : ''
                //添加父节点
                this.AncestorNodes.push(ancestorConcept)
              }
              //记录父节点数量
              this.anc_num = target_num
            }
            //完成Promise
            resolve()
          })
          .catch(function (error) {
            console.log("error", error);
            //拒绝Promise
            reject(error)
          });
      })
    },

    searchDescendantConcept() {
      return new Promise((resolve, reject) => {
        const InputConceptName = this.ConceptId;
        axios.get('/knowledgeGraph/queryConceptDescendant', {
          params: {
            "token": this.GLOBAL.token,
            "query": InputConceptName
          },
          //timeout: 1000 * 60 * 3
        })
          .then((response) => {
            // console.log(InputConceptName)
            const searchConcepts = response.data.data.results.bindings

            if (searchConcepts.length > 0) {
              var source_num = 0
              for (var i = 0; i < searchConcepts.length; i++) {
                //计数变更
                source_num++
                //创建子节点概念信息
                var descendantConcept = {}
                descendantConcept.type = 2
                var a = searchConcepts[i].des.value.split('#')
                descendantConcept.subject = a[1]
                descendantConcept.name = searchConcepts[i].label.value
                descendantConcept.domain = searchConcepts[i].domain.value
                descendantConcept.class = searchConcepts[i].class.value
                descendantConcept.voc = searchConcepts[i].voc.value
                descendantConcept.std = Object.getOwnPropertyNames(searchConcepts[i]).length > 5 ? searchConcepts[i].std.value : ''
                //添加子节点
                this.DescendantNodes.push(descendantConcept)
              }
              //记录父节点数量
              this.des_num = source_num
            }
            //完成Promise
            resolve()
          })
          .catch(function (error) {
            console.log("error", error);
            //拒绝Promise
            reject(error)
          });
      })
    },

    //绘制D3画布
    drawSVG() {
      const svg = d3.select("#dashboard_svg")
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      this.g = svg.append('g')
        .attr("class", "everything");

      // colorScale = d3.scaleOrdinal()
      //   .domain(d3.range(nodes.length))
      //   .range(d3.schemeCategory10)

      console.log('drawSVG')
    },

    //创建力导向图forceSimulation
    createForceGraph() {
      this.forceSimulation = d3.forceSimulation()
        .force('link', d3.forceLink())
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter())

      this.forceSimulation.nodes(this.nodes).on('tick', this.ticked)
      this.forceSimulation.force('link')
        .links(this.edges)
        .distance(function (d) {
          return d.value * 100
        })
      this.forceSimulation.force('center')
        .x(this.width / 2)
        .y(this.height / 2)

      console.log('createForceGraph')
    },

    //创建图示框
    createToolTip() {
      // tooltip = d3tooltip(d3)

      this.tooltip = d3.select("#dashboard_svg")
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      console.log('createToolTip')
    },

    //创建箭头
    createArrow() {
      this.marker = this.g.append("marker")
        .attr("id", function (d) { return d; })
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10")//坐标系的区域
        .attr("refX", 28)//箭头坐标
        .attr("refY", 0.8)
        .attr("markerWidth", 6)//标识的大小
        .attr("markerHeight", 10)
        .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr("stroke-width", 1)//箭头宽度
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")//箭头的路径
        .attr('fill', '#000000');//箭头颜色
    },

    //创建连线--更新全局变量links和linksText
    updateLinks() {
      this.links = this.g.append('g')
        .selectAll('line')
        .data(this.edges)
        .enter()
        .append('line')
        .attr('stroke', function (d, i) {
          if (d.type == 1) {
            return '#CC0066';
          }
          else {
            return '#FFCC33';
          }
        })
        .attr('stroke-width', 1)
        .attr("marker-end", "url(#arrow)")

      this.linksText = this.g.append('g')
        .selectAll('.lineText')
        .data(this.edges)
        .enter()
        .append('text')
        .attr('class', 'linetext')
        .text(function (d) {
          return d.relation
        })
        .style('fill-opacity', 0)

      console.log('updateLinks')
    },

    //创建节点--更新全局变量gs
    updateNodes() {
      this.gs = this.g.selectAll('.circleText')
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
          var cirX = d.x
          var cirY = d.y
          return 'translate(' + cirX + ',' + cirY + ')'
        })
        .call(
          //监听拖拽事件
          d3.drag()
            .on('start', this.dragStart)
            .on('drag', this.drag)
            .on('end', this.dragEnd)
        )

      var that = this
      this.gs.append('circle')
        .attr('r', 10)
        .attr('fill', function (d, i) {
          console.log(that.LastConceptId)
          if (d.subject == that.LastConceptId) {
            return '#0099CC'
          }
          else if (d.type == 1) {
            return '#0099CC';
          }
          else if (d.type == 0) {
            return '#CC0066';
          }
          else {
            return '#FFCC33';
          }
        })

      this.gText = this.g.append('g')
        .selectAll(".nodetext")
        .data(this.nodes)
        .enter()
        .append("text")
        .attr("class", "nodetext")
        .attr("dx", -20)
        .attr("dy", 20)
        .text(function (d) {
          if (d.index == 0) {
            return d.name
          }
        })

      that = this
      this.gs.on('mouseover', function (d, i) {
        //显示连线文字
        that.linksText.style('fill-opacity', function (edge) {
          if ((edge.source == d || edge.target == d) && d.index != 0) {
            return 1.0;
          }
          else {
            return 0.0;
          }
        })
        //隐藏中心节点文字
        if (d.index == 0) {
          that.gText.text(null)
        }
        //显示图示框
        that.tooltip.html("Concept" + ": " + d.name + "<br />" +
          "Domain" + ": " + d.domain + "<br />" +
          "Vocabulary" + ": " + d.voc + "<br />" +
          "Class" + ": " + d.class + "<br />" +
          "Standard" + ": " + d.std)
          .style('top', d3.event.pageY - 20 + 'px')
        if (d3.event.pageX >= that.width / 2) {
          that.tooltip.style('left', d3.event.pageX + 20 + 'px')
        }
        else {
          that.tooltip.style('left', d3.event.pageX - 140 + 'px')
        }
        that.tooltip.transition()
          .duration(200)
          .style('opacity', 0.8)
        // tooltip.show()
      })
        .on('mouseout', function (d, i) {
          //隐藏连线文字
          that.linksText.style('fill-opacity', function (edge) {
            return 0.0
          })
          //显示中心节点文字
          that.gText.text(function (d) {
            if (d.index == 0) {
              return d.name
            }
          })
          //隐藏图示框
          that.tooltip.style('opacity', 0)
          // tooltip.hide()
        })
        .on('click', function (d, i) {
          that.tooltip.style('opacity', 0)
          that.InputConceptName = d.subject
          that.getSearchData()
        })

      console.log('updateNodes')
    },

    //重置D3画布
    refreshSVG() {
      this.g.selectAll('*').remove()
    },

    //动态变化过程计算函数
    ticked() {
      //更新连线位置--更新全局变量links
      this.links
        .attr('x1', function (d) {
          return d.source.x
        })
        .attr('y1', function (d) {
          return d.source.y
        })
        .attr('x2', function (d) {
          return d.target.x
        })
        .attr('y2', function (d) {
          return d.target.y
        })

      //更新连线文字位置--更新全局变量linksText
      this.linksText
        .attr('x', function (d) {
          return (d.source.x + d.target.x) / 2
        })
        .attr('y', function (d) {
          return (d.source.y + d.target.y) / 2
        })

      //更新节点和节点文字位置--更新全局变量gs
      this.gs.attr('transform', d => {
        return 'translate(' + d.x + ',' + d.y + ')'
      })

      this.gText.attr("x", function (d) { return d.x });
      this.gText.attr("y", function (d) { return d.y + 20 / 2; });

      // console.log(nodes)
      // console.log(edges)
    },

    //拖动开始
    dragStart(d) {
      if (!d3.event.active) {
        this.forceSimulation.alphaTarget(0.8).restart()
      }
      d.fx = d.x
      d.fy = d.y
    },
    //拖动结束
    dragEnd(d) {
      if (!d3.event.active) {
        this.forceSimulation.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    },
    //拖动过程
    drag(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    },
  },

  mounted() {
    //绘制D3画布
    this.drawSVG()
  },

};

</script>
<style>
div.tooltip {
  color: white;
  position: absolute;
  text-align: center;
  width: 120px;
  height: auto;
  padding: 2px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid black;
  pointer-events: none;
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-align: left;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}
</style>