<demo>
## 多张图片预览
点击左右切换按钮可以预览多张图片。`current` 可以设置默认打开时展示第几张图片
</demo>

<!-- #region snippet -->
<template>
    <a-button
        type="primary"
        @click="handlePreview">
        预览
    </a-button>
</template>

<script setup>
import { Preview } from '@/components'

function handlePreview() {
    Preview.open({
        current: 1,
        urls: [
            'http://cdn.xuanyunet.com/test/1.jpeg',
            'http://cdn.xuanyunet.com/test/2.jpeg',
            'http://cdn.xuanyunet.com/test/3.jpeg',
            'http://cdn.xuanyunet.com/test/4.jpeg',
        ],
    })
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
