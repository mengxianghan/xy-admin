import {ref, reactive} from 'vue'

export default (options = {}) => {
    const loading = ref(false)
    const list = ref([])
    const searchForm = reactive({})
    const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '30', '40'],
        ...options ?? {}
    })

    /**
     * 重置分页
     */
    function resetPagination() {
        pagination.total = 0
        pagination.current = 1
    }

    return {
        loading,
        list,
        searchForm,
        pagination,
        resetPagination
    }
}
