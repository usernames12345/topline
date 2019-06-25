<template>
    <div class='layout-wrap'></div>
    <AppAside></AppAside>
    <AppHeader></AppHeader>
</template>
<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
    name: 'AppLayout',
    components: {
      AppAside,
      AppHeader
    },
    data () {
        return {
        }
    }
}
</script>
<style lang='less' scoped>
</style>
