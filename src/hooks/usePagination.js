import {ref} from 'vue'

export default (options = {}) => {
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
        ...options ?? {},
    })

    /**
     * 重置分页
     */
    function resetPagination() {
        pagination.value = {
            ...pagination.value,
            current: 1,
        }
    }

    return {
        loading,
        list,
        pagination,
        resetPagination,
    }
}
