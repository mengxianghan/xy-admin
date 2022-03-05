<template>
    <div>
        <a-card>
            <x-editor v-model="content" />
        </a-card>
        <a-card v-if="content"
                title="输出"
                class="mt-8-2">
            {{content}}
        </a-card>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'componentEditor',
    setup() {
        const content = ref('')

        return {
            content
        }
    }
}
</script>

<style scoped>
</style>
