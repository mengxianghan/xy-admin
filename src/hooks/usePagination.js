import {ref} from 'vue'

export function usePagination() {
    const loading = ref(false)
    const list = ref([])
    const pagination = ref({
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '30', '40'],
    })

    /**
     * 重置分页
     */
    function resetPagination() {
        pagination.value = {
            ...pagination.value,
            total: 0,
            current: 1,
            pageSize: 10,
        }
    }

    return {
        loading,
        list,
        pagination,
    }
}