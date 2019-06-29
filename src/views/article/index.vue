<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label>全部</el-radio>
            <el-radio
              v-for="(item, index) in statusType"
              :key="item.label"
              :label="index"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="filterParams.channel_id" clearable>
            <el-option v-for="item in channels" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            @click="handleDateChange"
            value-firmat="yyyy-MM-dd"
            v-model="range_date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="articleLoading" @click="handleFilter">查询</el-button>
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

    <el-table class="article-list" :data="articles" style="width: 100%" v-loading="articleLoading">
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
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
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
      :page-size="pageSize"
      :total="totalCount"
      @current-change="handleCurrentChange"
      :disabled="articleLoading"
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
      filterParams: {
        //   要返回的数据
        status: "", //  文章状态
        channel_id: "", //  频道id
        begin_pubdate: "", //  开始时间
        end_pubdate: "" //  结束时间
      },
      channels: [],
      range_date: " " //  事件范围绑定 这个字段在这里无意义主要是为了触发handleDateChange事件
    };
  },
  created() {
    this.loadAticles(), this.loadChannels();
  },
  methods: {
      async handleDelete (item) {
      try {
        // 删除确认提示
        // 如果手动catch了异常还是会被外部的try catch捕获到
        //  但是代码可以继续往后执行
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 如果手动 catch 了它的异常，还是会被外部的 try-catch 捕获到
        // 但是代码依然可以继续往后执行
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })

        // 确认：执行删除操作
        await this.$http({
          method: 'DELETE',
          url: `/articles/${item.id}`
        })

        this.$message({
          type: 'success',
          message: '删除成功'
        })

        // 删除成功重新加载数据列表
        this.loadArticles()
      } 
      catch (err) {
        if (err === 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message.error('删除失败')
      }
    },
    //  点击查询按钮 根据文章列表加载文章
    handleFilter() {
      this.page = 1;
      this.loadAticles()
    },
    handleDateChange(value) {
        this.filteerParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      //  输出数组把第0项给begin  第二项给 end
    },
    async loadChannels() {
      try {
        const data = await this.$http({
          method: "GET",
          url: "/channels"
        });
        //  console.log(data)
        this.channels = data.channels;
      } catch (err) {
        this.$message.error("获取频道失败")
      }
    },
    //  请求开始
    //  请求开始加载loading
    async loadAticles(){
     try{
       this.articleLoading = true
      //  除了登陆相关接口之外其他的接口都必须在请求头中通过Authorization字段提供用户token
      //  当我们登陆成功服务端会生成一个token令牌放到用户信息中

      //  在加载文章中筛选无用数据
      const filterData = {}
      for (let key in this.filterParams) {
        const item = this.filterParams[key]
        if (item !== "" && item !== null && item !== undefined) {
          filterDta[key] = item
        }
      }
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
          page: this.page,
          //   把除去之后的状态给到  除去过滤数据剩余数据的状态
          status: filterData.status
          //  ...filterData     将filterData混入当前对象中
        }
      })
      this.articles = data.results
      this.totalCount = data.total_count
      //  请求结束  停止loading
      this.articleLoading = false
     } catch(err) {
       this.$message.error("加载文章列表失败")
     }
    },
    
    //  组件说明  参数为当前页
    handleCurrentChange(page) {
      //  将数据中的页码修改为当前改变的页码
      this.page = page;
      //  改变页码之后再进行文章的重新加载
      this.loadAticles()
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
