<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- 
          table表格不需要我们去手动v-for 遍历
          你只需要将数据交给table表格的data属性即可
          然后配置el-table-column即可
       -->
    </el-card>
    <!-- 
        label  列头标题
        prop 遍历项中的数据字段
        width 列宽
        表格默认把数据当成文本去输出 如果需要其他格式则需要自定义
        template中的内容就是表格自定义的内容
        如果需要在template中遍历数据则需要给template配置
        slot-scope名称是固定的
        scope 值是我们起的名字 结果就是我们可以通过scope.row 访问
        当前遍历对象就像访问item一样
     -->
     
    <el-table class="article-list" 
       :data= 'articles' 
       style="width: 100%">
      <el-table-column
         label="封面"
          width="180">
       <template slot-scope = "scope">
         <img
           v-for = 'item in scope.row.cover.images'
          :src= "item" 
          :key = "item">
      </template>
      </el-table-column>
      <el-table-column 
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        width = '180'
        label = "状态">
        <template slot-scope = "scope">
          <el-tag type = 'statusType[scope.row.status].type'>{{ statusType[scope.row.status].label }}</el-tag>
        </template>
       </el-table-column>
      <el-table-column
        prop= 'pubdate'
        width = '180'
        label = "发布时间">
       </el-table-column>
       <el-table-column
          label = "操作">
        <template slot-scope="scope">
            <el-button size="mini" type="primary" plain>修改</el-button>
            <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <el-pagination 
      background layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      articles: [],
      statusType: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ]
    }
  },
  created() {
    this.loadAticles()
  },
  methods: {
    //  请求开始
    async loadAticles() {
      //  除了登陆相关接口之外其他的接口都必须在请求头中通过Authorization字段提供用户token
      //  当我们登陆成功服务端会生成一个token令牌放到用户信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        // headers: {
        //     //自定义请求头
        //     // Authorization:`Bearer ${ token }`
        //     //后端要求：将token 以`Bearer`的数据格式放到请求头的 Authorization字段中
        // }
      })
      this.articles = data.results
      console.log(data)

    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
}

.article-list {
  margin-bottom: 30px;
}
</style>
