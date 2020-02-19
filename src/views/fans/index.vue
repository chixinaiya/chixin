<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝管理" name="list">
          <div class="fans-list">
            <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
           background layout="prev, pager, next" 
           :page-size="reqParams.per_page"
           :current-page="reqParams.page"
           @current-change="pager"
           :total="total"
           ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pictrue">
          <div style="width:600px;height:400px" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "app-fans",
  data() {
    return {
      activeName: "list",
      fansList: [],
      total: 0,
      reqParams: {
        page: 1,
        per_page: 24
      }
    };
  },
   mounted () {
    const myChart = echarts.init(this.$refs.dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  },
  created() {
    this.getFans();
  },
  methods: {
    //切换分页
    pager(newPage){
      this.reqParams.page=newPage
      this.getFans()
    },
    async getFans() {
      const res = await this.$http.get("followers", { params: this.reqParams });
      this.fansList = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.fans-list {
  .fans-item {
    padding-top: 10px;
    display: inline-block;
    width: 100px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    margin-right: 30px;
    margin-bottom: 20px;
    p {
      padding: 0;
      font-size: 12px;
    }
  }
}
</style>