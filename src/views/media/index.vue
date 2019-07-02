<template>
  <el-card>
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
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
              <el-button type="primary" plain :icon= "item.is_collected ? 'el-icon-star-on' :'el-icon-star-off'" circle></el-button>
              <el-button type="primary" plain icon='el-icon-delete' circle></el-button>
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
