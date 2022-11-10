<template>
    <a-card :bordered="false">
        <a-steps class="steps"
                 :current="currentTab">
            <a-step title="填写转账信息" />
            <a-step title="确认转账信息" />
            <a-step title="完成" />
        </a-steps>
        <div class="content">
            <step1 v-if="currentTab === 0"
                   @next="handleNext" />
            <step2 v-if="currentTab === 1"
                   @next="handleNext"
                   @prev="handlePrev" />
            <step3 v-if="currentTab === 2"
                   @prev="handlePrev"
                   @finish="handleFinish" />
        </div>
    </a-card>
</template>

<script>
export default { name: 'formStep' }
</script>

<script setup>
import { ref } from 'vue'

import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'

const currentTab = ref(0)

// handler
function handleNext() {
    if (currentTab.value < 2) {
        currentTab.value += 1
    }
}

function handlePrev() {
    if (currentTab.value > 0) {
        currentTab.value -= 1
    }
}

function handleFinish() {
    currentTab.value = 0
}
</script>

<style lang="less" scoped>
.steps {
    max-width: 750px;
    margin: 16px auto;
}

.content {
    max-width: 560px;
    margin: 40px auto 0;
}
</style>
