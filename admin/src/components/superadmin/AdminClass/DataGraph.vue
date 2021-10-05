<template>
  <div id="chart"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['TagNews'])
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      
      let DataTag = [];
      this.TagNews.forEach(el => {
        DataTag.push(el.tag_name)
      });
      //console.log(DataTag)

      let DataMsg = [];
      DataTag.forEach(item=>{
        let num = Math.floor(Math.random()*100)
        DataMsg.push({value: num, name: item})
      })
      var myChart = this.$echarts.init(document.getElementById("chart"));
      // 绘制图表
      myChart.setOption({
  legend: {
    orient: 'vertical',
    x: 'left',
    data: DataTag,
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
        emphasis: {
          show: true
        }
      },
      labelLine: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      data: DataMsg
    }
  ]
});
    },
  },
}
</script>

<style scoped>
#chart {
  width: 95%;
  height: 310px;
  margin: 20px auto;
}
</style>