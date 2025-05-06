<script setup>
defineOptions({
  name: 'AppList',
})

const listData = []
</script>

<template>
  <a-list :data-source="listData" />
</template>

<style lang="less" scoped></style>
