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
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group >
            <el-radio label="">全部</el-radio>
            <el-radio></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <article-channel >下拉菜单</article-channel>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
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

    <el-table class="article-list" :data= "articles" style="width: 100%" v-loading= "articleLoading">
      <el-table-column label="封面" width="180">
        <template slot-scope="scope">
          <img v-for="item in scope.row.cover.images" :src="item" :key="item">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column width="180" label="状态">
        <template slot-scope="scope">
          <el-tag type="statusType[scope.row.status].type">{{ statusType[scope.row.status].label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" width="180" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain>修改</el-button>
          <el-button size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      数据分页 page-size  每页大小（每页的数量）
      total 一共有多少数据（总记录数）
      分页组件会根据煤业的每页大小和总记录数来进行分页
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total= "totalCount"
      @current-change= "handleCurrentChange"
      :disabled= "articleLoading"
    ></el-pagination>
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
          type: "info",
          label: "草稿"
        },
        {
          type: "",
          label: "待审核"
        },
        {
          type: "success",
          label: "审核通过"
        },
        {
          type: "warning",
          label: "审核失败"
        },
        {
          type: "danger",
          label: "已删除"
        }
      ],
      //  要求返回的数据
      pageSize: 10, //  每页大小
      totalCount: 1000, //总数据量
      page: 1, //  当前页码
      articleLoading: false, //  加载中
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
  created() {
    this.loadAticles();
  },
  methods: {
    //  请求开始
    //  请求开始加载loading
    async loadAticles() {
      this.articleLoading = true
      //  除了登陆相关接口之外其他的接口都必须在请求头中通过Authorization字段提供用户token
      //  当我们登陆成功服务端会生成一个token令牌放到用户信息中
      const data = await this.$http({
        method: "GET",
        url: "/articles",
        // headers: {
        //     //自定义请求头
        //     // Authorization:`Bearer ${ token }`
        //     //后端要求：将token 以`Bearer`的数据格式放到请求头的 Authorization字段中
        // }

        params: {
          per_page: this.pageSize,
          page: this.page
        }
      });
      this.articles = data.results;
      this.totalCount = data.total_count;
      //  请求结束  停止loading
      this.articleLoading = false
    },
    //  组件说明  参数为当前页
    handleCurrentChange(page) {
      //  将数据中的页码修改为当前改变的页码
      this.page = page;
      //  改变页码之后再进行文章的重新加载
      this.loadAticles();
    }
  }
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
}

.article-list {
  margin-bottom: 30px;
}
</style>
