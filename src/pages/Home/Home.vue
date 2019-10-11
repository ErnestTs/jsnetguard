<template>
    <div class="homeBoard">
        <Header />
        <Content />
    </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Content from '@/components/Content/Content'

export default {
    components: {
        Header, Content
    },
    data () {
        return {}
    }
}
</script>

<style lang='less' scoped>
.homeBoard {
    height: auto;
    background-color: #f7f7f7;
}
html,body {
    background: #f7f7f7;
}
</style>
