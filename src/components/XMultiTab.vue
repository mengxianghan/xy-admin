<template>
    <div class="x-multi-tab">
        <a-tabs :active-key="current"
                type="card"
                @change="handleChange">
            <a-tab-pane v-for="(item,index) in multiTabList"
                        :key="index">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <div>
                            {{ item.meta.title }}
                            <span v-if="current === index"
                                  class="x-multi-tab__reload-btn"
                                  @click.stop="handleReload(item)"><a-icon type="reload"
                                                                           class="ma-0"
                                                                           :spin="spin"/></span>
                            <span class="x-multi-tab__close-btn"
                                  @click.stop="handleClose(item)"><a-icon type="close"
                                                                          class="ma-0"/></span>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="reload"
                                             @click="handleReload(item)">重新加载
                                </a-menu-item>
                                <a-menu-item key="close"
                                             @click="handleClose(item)">关闭
                                </a-menu-item>
                                <a-menu-item v-if="multiTabList.length > 1"
                                             key="closeOther"
                                             @click="handleCloseOther(item)">关闭其他
                                </a-menu-item>
                                <a-menu-item v-if="index > 0"
                                             key="closeLeft"
                                             @click="handleCloseLeft(item)">关闭左侧
                                </a-menu-item>
                                <a-menu-item v-if="index < multiTabList.length - 1"
                                             key="closeRight"
                                             @click="handleCloseRight(item)">关闭右侧
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {findIndex} from 'lodash'

export default {
    name: 'XMultiTab',
    data() {
        return {
            spin: false
        }
    },
    computed: {
        ...mapGetters({
            multiTabList: 'multiTab/list',
            current: 'multiTab/current'
        })
    },
    watch: {
        '$route'(to) {
            this.handleOpen(to)
        }
    },
    created() {
    },
    mounted() {
        this.handleOpen(this.$route)
    },
    methods: {
        ...mapActions({
            open: 'multiTab/open',
            close: 'multiTab/close',
            closeLeft: 'multiTab/closeLeft',
            closeRight: 'multiTab/closeRight',
            closeOther: 'multiTab/closeOther',
            reload: 'multiTab/reload'
        }),
        /**
         * 打开
         * @param route
         */
        handleOpen(route) {
            this.open({route})
        },
        /**
         * 关闭
         * @param route
         */
        handleClose(route) {
            this.close({route})
        },
        /**
         * 关闭左侧
         * @param route
         */
        handleCloseLeft(route) {
            this.closeLeft({route})
        },
        /**
         * 关闭右侧
         * @param route
         */
        handleCloseRight(route) {
            this.closeRight({route})
        },
        /**
         * 关闭其他
         * @param route
         */
        handleCloseOther(route) {
            this.closeOther({route})
        },
        /**
         * 刷新
         * @param route
         */
        handleReload(route) {
            // 判断是否当前路由
            if (route.fullPath !== this.$route.fullPath) {
                // 不是当前路由，跳转到指定路由
                this.$router.push(route)
            }
            this.spin = true
            setTimeout(() => {
                this.spin = false
            }, 1000)
            setTimeout(() => {
                this.reload({route})
                this.$nextTick(() => {
                    this.reload({route})
                })
            }, 0)
        },
        /**
         * 切换标签页
         * @param {Number} index 索引
         */
        handleChange(index) {
            this.$router.push(this.multiTabList[index])
        }
    }
}
</script>

<style lang="less"
       scoped>
.x-multi-tab {
    position: sticky;
    top: 48px;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .ant-dropdown-trigger {
        display: flex;
        padding: 0 16px;
        align-items: center;
        font-weight: 400;
    }

    &__reload-btn,
    &__close-btn {
        font-size: 12px;
        margin-left: 8px;
        color: @text-color-secondary;
        transition: color .3s;

        &:hover {
            color: @primary-color;
        }
    }

    ::v-deep {
        .ant-tabs-bar {
            margin: 0;
            border: 0;
            background: #ffffff;
        }

        .ant-tabs-nav {
            padding: 0 12px;
        }

        .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
            padding: 0;
        }
    }
}
</style>
