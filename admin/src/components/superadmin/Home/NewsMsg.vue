<template>
  <div id="chart"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(['NewsListAll', 'NewsClass'])
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      //console.log(this.NewsListAll)
      let DataName = [];
      let DataMysqlName = [];
      this.NewsClass.filter(item=>{
         return item.flag === '2'
      }).forEach(el => {
        DataName.push(el.classify_name)
        DataMysqlName.push(el.news_className)
      });
       
       let DataSum = [];
        DataMysqlName.forEach(el=>{
          let num = this.NewsListAll[el].length
          DataSum.push(num)
        })
      var myChart = this.$echarts.init(document.getElementById("chart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "新闻分类数量图" },
        tooltip: {},
        xAxis: {
          data: DataName,
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: DataSum,
          },
        ],
      });
    },
  },

};
</script>

<style scoped>
#chart {
  width: 94%;
  height: 410px;
  margin: 20px auto;
}
</style>