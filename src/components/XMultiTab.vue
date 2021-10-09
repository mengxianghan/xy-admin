<template>
    <div class="x-multi-tab">
        <a-tabs :active-key="current"
                type="editable-card"
                hide-add
                @change="onSwitch"
                @edit="onClose">
            <a-tab-pane v-for="(item,index) in list"
                        :key="index">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <span>{{ item.meta.title }}</span>
                        <template #overlay>
                            <a-menu @click="(menuInfo)=>handleMenu(menuInfo,item,index)">
                                <a-menu-item key="refresh">重新加载</a-menu-item>
                                <a-menu-item key="close">关闭</a-menu-item>
                                <a-menu-item v-if="list.length > 1"
                                             key="closeOther">关闭其他
                                </a-menu-item>
                                <a-menu-item v-if="index > 0"
                                             key="closeLeft">关闭左侧
                                </a-menu-item>
                                <a-menu-item v-if="index < list.length - 1"
                                             key="closeRight">关闭右侧
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
/**
 * @name XMultiTab
 * @description 多标签页
 */
import {onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter, onBeforeRouteUpdate} from 'vue-router';

export default {
    name: 'XMultiTab',
    setup() {
        const store = useStore();
        const router = useRouter();
        const list = computed(() => store.getters['multiTab/list']);
        const current = computed(() => store.getters['multiTab/current']);

        onBeforeRouteUpdate((to) => {
            onOpen(to);
        });

        onMounted(() => {
            onOpen(router.currentRoute.value);
        });

        /**
         * 菜单
         * @param {string} key 操作类型
         * @param {Number} route 路由
         */
        function handleMenu({key}, route, index) {
            switch (key) {
                case 'refresh': // 刷新
                    store.dispatch('multiTab/refresh', {route, index});
                    break;
                case 'close': // 关闭
                    store.dispatch('multiTab/close', {route, index});
                    break;
                case 'closeOther': // 关闭其他
                    store.dispatch('multiTab/closeOther', {route, index});
                    break;
                case 'closeLeft': // 关闭左侧
                    store.dispatch('multiTab/closeLeft', {route, index});
                    break;
                case 'closeRight': // 关闭右侧
                    store.dispatch('multiTab/closeRight', {route, index});
                    break;
            }
        }

        /**
         * 打开
         * @param {object} route 路由
         */
        function onOpen(route) {
            store.dispatch('multiTab/push', {route});
        }

        /**
         * 切换标签页
         * @param {Number} index 索引
         */
        function onSwitch(index) {
            store.dispatch('multiTab/switch', {
                route: list.value[index],
                index
            });
        }

        /**
         * 关闭标签页
         * @param {Number} index 索引
         * @param {string} action 操作
         */
        function onClose(index, action) {
            switch (action) {
                case 'remove':
                    store.dispatch('multiTab/close', {
                        route: list.value[index],
                        index
                    });
                    break;
            }
        }

        return {
            list,
            current,
            handleMenu,
            onSwitch,
            onClose
        };
    }
};
</script>

<style lang="scss"
       scoped>
.x-multi-tab {
    position: sticky;
    top: 48px;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    :deep(.ant-tabs-bar) {
        margin: 0;
        border: 0;
        background: #ffffff;
    }

    :deep(.ant-tabs-nav) {
        padding: 0 16px;
    }
}
</style>
