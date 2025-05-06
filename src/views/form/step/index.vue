<script setup>
import { ref } from 'vue'
import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'

defineOptions({
  name: 'FormStep',
})

const currentTab = ref(0)

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

<template>
  <a-page-header
    :ghost="false"
    main
    title="分步表单"
  >
    将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
  </a-page-header>
  <a-card>
    <a-steps
      :current="currentTab"
      class="steps"
    >
      <a-step title="填写转账信息" />
      <a-step title="确认转账信息" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1
        v-if="currentTab === 0"
        @next="handleNext"
      />
      <step2
        v-if="currentTab === 1"
        @next="handleNext"
        @prev="handlePrev"
      />
      <step3
        v-if="currentTab === 2"
        @finish="handleFinish"
        @prev="handlePrev"
      />
    </div>
  </a-card>
</template>

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
