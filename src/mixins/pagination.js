export default {
    data() {
        return {
            loading: false,
            list: [],
            searchForm: {},
            pagination: {
                showSizeChanger: true, // 是否可以改变 pageSize
                showTotal: (total, range) => `共 ${total} 条`, // 总条数
                current: 1, // 当前页数
                pageSize: 10, // 每页条数
                total: 0 // 数据总数
            },
            searchLayout: {
                md: 8,
                xl: 6
            }
        }
    },
    methods: {
        /**
         * 搜索
         */
        onSearch() {
        },
        /**
         * 更新分页
         * 解决删除数据页码更新问题
         */
        updatePagination() {
            const {total, current, pageSize} = this.pagination
            const totalPage = Math.ceil((total - 1) / pageSize)
            this.pagination = {
                ...this.pagination,
                current: current > totalPage ? totalPage : current
            }
        },
        /**
         * 重置分页
         */
        resetPagination() {
            this.pagination = this.$options.data().pagination
        }
    }
}
