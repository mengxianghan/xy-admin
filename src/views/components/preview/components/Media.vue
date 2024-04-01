<demo>
## 多媒体
支持图片、音频、视频三种类型文件
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
        urls: [
            'http://cdn.xuanyunet.com/test/1.jpeg',
            'http://cdn.xuanyunet.com/test/1.mp3',
            'http://cdn.xuanyunet.com/test/1.mp4',
        ],
    })
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
