# useDate

## 代码演示

### 日期可选范围

::: tip
默认可选近 3 个月
:::

```vue

<template>
    <a-form :model="formData">
        <a-form-item name="datetime">
            <a-range-picker
                v-model:value="formData.dateTime"
                :disabled-date="(currentDate) => disableDate(currentDate, 'datetime')"
                @calendarChange="(dates) => onCalendarChange(dates, 'datetime')"></a-range-picker>
        </a-form-item>
    </a-form>
</template>

<script setup>
    import { useDate, useForm } from '@/hooks'

    const { disableDate, onCalendarChange } = useDate()
    const { formData } = useForm()
</script>

<style lang="less" scoped></style>
```

### 自定义可选范围

::: tip
仅可选择近 7 天
:::

```vue

<template>
    <a-form :model="formData">
        <a-form-item name="datetime">
            <a-range-picker
                v-model:value="formData.dateTime"
                :disabled-date="(currentDate) => disableDate(currentDate, 'datetime', 7, 'day')"
                @calendarChange="(dates) => onCalendarChange(dates, 'datetime')"></a-range-picker>
        </a-form-item>
    </a-form>
</template>

<script setup>
    import { useDate, useForm } from '@/hooks'

    const { disableDate, onCalendarChange } = useDate()
    const { formData } = useForm()
</script>

<style lang="less" scoped></style>
```

### 仅可选择今天及之前的日期

```vue

<template>
    <a-form :model="formData">
        <a-form-item name="datetime">
            <a-range-picker
                v-model:value="formData.dateTime"
                :disabled-date="(currentDate) => disableDateAfterToday(currentDate)"
                @calendarChange="(dates) => onCalendarChange(dates, 'datetime')"></a-range-picker>
        </a-form-item>
    </a-form>
</template>

<script setup>
    import { useDate, useForm } from '@/hooks'

    const { disableDateAfterToday, onCalendarChange } = useDate()
    const { formData } = useForm()
</script>

<style lang="less" scoped></style>
```

## API

### 返回值

| 参数                    | 说明     | 类型                                                                               |
|-----------------------|--------|----------------------------------------------------------------------------------|
| disableDate           | 禁用日期范围 | `(currentDate: Date, fieldName: string, duration?: number, unit?: Unit) => Date` |
| disableDateAfterToday | 禁用今天之后 | `(currentDate: Date) => Date`                                                    |
| onCalendarChange      | 日期发生改变 | `(dates: Array<Date>, filedName: string) => void`                                |

### Unit 可选值

| 名称          | 缩写 | 说明                |
|-------------|----|-------------------|
| week        | w  | 周（Week of Year）   |
| day         | d  | 日                 |
| month       | M  | 月份 (一月 0， 十二月 11) |
| quarter     | Q  | 季度                |
| year        | y  | 年                 |
| hour        | h  | 小时                |
| minute      | m  | 分钟                |
| second      | s  | 秒                 |
| millisecond | ms | 毫秒                |
