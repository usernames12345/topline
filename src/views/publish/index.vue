<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <!-- 表单 -->
    <el-form ref="form" :model="articleForm" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor 
          v-model="articleForm.content"
          ref="myQuillEditor"
          :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="封面"></el-form-item>
      <el-form-item label="频道">
        <article-channel v-model ="articleForm.channel_id"></article-channel>
      </el-form-item>
    </el-form>
    <!-- /表单 -->
  </el-card>
</template>
<script>
import ArticleChannel from '@/components/article-channel'
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import { quillEditor } from 'vue-quill-editor'
export default {
  name: "AppPublish",
  created () {
    if(this.$route.name === 'publish-edit'){
      this.loadArticles()
    }
  },
  components: {
    ArticleChannel,
    quillEditor
  },
  data() {
    return {
      articleForm: {
        title: "",
        content: "",
        channel_id: "",
        cover: {
          type: 0,
          images: []
        }
      },
      editorOption: {}  //富文本编辑器配置选项
    }
  },

  /**
   * 监视
   * 可以监视实例中的数据成员
   * 当被监视数据发生变化 就会调用处理函数
   */
  // watch: {
  //   //  监视实例（this）中的$route 当$route 发生变化 执行处理函数
  //   '$route' (to,from) {
  //      console.log (this.$route)
  //      //  对路由变化做出响应
  //      console.log (to,from)
  //      //  从编辑到发布由于是一个组件路由会缓存 不会重新创建
  //     //  所以在这里加一个处理
  //     //对于当前组件来说如果你是从编辑过来的
  //     if(from.name === 'publish-edit') {
  //       this.articleForm = {
  //         title: '', //标题
  //         content: '', //内容
  //         channel_id: '', //频道
  //         cover: {
  //           type: 0,   //封面类型 -1 自动  0 无图 1 1张  3 3张
  //           images: []
  //         } //  封面
  //       }
  //     }
  //   }
  // },

  created () {
    if(this.$route.name === 'publish-edit') {
      this.loadArticles()
    }
  },
  methods: {
    async loadArticles () {
        try {
          const data = await this.$http ({
            method: 'GET',
            url: `/articles/${this.$route.params.id}`
          })
        this.articleForm = data
        }catch (err) {
          console.log(err)
          this.$message.error('获取文章列表失败')
        }
    },
    async handlePublish(draft) {
      try {
        if(this.$route.name === 'publish'){
          await this.$http({
            method: "POST",
            url: "/articles",
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: "success",
            message: "发布成功"
          })
        }else{
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      } catch (err) {
        this.$message.error("操作失败", err)
      }
    }
  }
}
</script>
<style>
  .ql-editor {
  height: 500px !important;
}
</style>

<style lang='less' scoped>
.publish-card {
  .header {
    min-height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>
