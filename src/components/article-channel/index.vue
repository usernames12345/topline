<template>
     <el-select clearable :value= "value" @change= "$emit('input',$event)">
    <el-option
        v-for= 'item in channels'
        :key= 'item.id'
        :label= 'item.name'
        :value= 'item.id'
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name:"ArticleChannel",
  props: {
      value: {
        type:[String , Number],  //  类型  数字字符串
        required: true
      }
  },
  created (){
    this.loadChannels()
  },
  data() {
    return {
      channels: []
    }
  },
  methods: {
    async loadChannels () {
        try {
          const data = await this.$http({
              method: 'GET',
              url: '/channels'
          })
          this.channels = data.channels
        }catch (err) {
           this.$messaage.error('获取频道失败',err)
        }
    },
    handleChange (e) {
        this.$emit('input',e)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
