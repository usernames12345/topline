<template>
  <el-card>
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
          <!-- 如果想给一个组件注册一个原生事件 @原生事件.native -->
        <el-radio-button label="全部" @click.native = 'loadImages(false)'></el-radio-button>
        <el-radio-button label="收藏" @click.native = 'loadImages(true)'></el-radio-button>
      </el-radio-group>
      <el-button type="primary">上传图片</el-button>
    </div>
    <el-row :gutter= '20'>
      <el-col :span="4" v-for= "item in images" :key= "item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src= 'item.url'
            class="image"
           style = ' max-width:100% '>
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button 
              type="primary"
              plain
             :icon= "item.is_collected ? 'el-icon-star-on' :'el-icon-star-off'" 
              circle
              @click = 'handleCollect(item)'></el-button>
              <el-button type="primary"
               plain
               icon='el-icon-delete'
               circle
               @click = 'handleDelete(item)'
               ></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "MediaList",
  components: {},
  data() {
    return {
      active: "全部",
      images: []
    }
  },
  created () {
   this.loadImages()
  },
  methods: {
    async loadImages (collect = false) {
       try {
            const data = await this.$http ({
            method: 'GET',
            url: '/user/images',
            params: {
                collect,
                per: 1,
                per_page: 10
            }
        }) 
        console.log(data)
        this.images = data.results
       }catch (err) {
          console.log(err)
          this.$message.error ('加载图片失败',err)
       }
    },
    async handleCollect (item) {
        const collect = !item.is_collected
      try {
         const data = await this.$http ({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
              collect
          }
        })
        this.$message ({
            type: 'success',
            message: `收藏成功`
        })
        item.is_collected = data.collect
        this.$message({
            type: 'success',
            message: `${collect ? '' : '取消'}收藏成功`
        })
      }catch (err) {
          console.log(err)
          this.$message.error('收藏失败',err)
      }
    },
    async handleDelete(item) {
      try {
         await this.$http ({
          method: 'DELETE',
          url: `/user/images/${item.id}`
     })
    //   删除之后重新加载图片列表
    this.loadImages()
    this.$message({
        type: 'success',
        message: '删除成功',
    })
      }
      catch (err) {
        this.$message.error('删除失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.action {
  display: flex;
  justify-content: space-between;
}
.bottom {
    display: flex;
    justify-content: center;
}
</style>
