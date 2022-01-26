<template>
    <a-card>
        excel
        <a-upload :show-upload-list="false"
                  :custom-request="onUpload"
                  accept=".xlsx">
            <a-button>上传 excel</a-button>
        </a-upload>
    </a-card>
</template>

<script>
import {onMounted} from 'vue'

import XLSX from 'xlsx'

export default {
    name: 'componentExcel',
    setup() {

        onMounted(() => {
        })

        function readFile(file) {
            return new Promise(resolve => {
                let reader = new FileReader()
                reader.readAsBinaryString(file)
                reader.onload = e => {
                    resolve(e.target.result)
                }
            })
        }

        async function onUpload({file}) {
            const wb = XLSX.read(await readFile(file), {type: 'binary', cellDates: true})
            console.log(wb)
        }

        return {
            onUpload,
        }
    },
}
</script>

<style scoped>

</style>
