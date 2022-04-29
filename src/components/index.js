import Loading from './Loading'
import Preview from './Preview'

import ActionBar from './ActionBar'
import ActionButton from './ActionButton'
import Chart from './Chart'
import Drawer from './Drawer'
import LayoutHeader from './LayoutHeader'
import LayoutMenu from './LayoutMenu'
import ModTitle from './ModTitle'
import MultiTab from './MultiTab'
import Search from './Search'
import Space from './Space'
import TinyEditor from './TinyEditor'

const useCompList = [Loading, Preview]

const compList = [ActionBar, ActionButton, Chart, Drawer, LayoutHeader, LayoutMenu, ModTitle, MultiTab, Search, Space, TinyEditor]

export default {
    install(Vue) {
        compList.forEach((comp) => {
            Vue.component(comp.name, comp)
        })

        useCompList.forEach(comp=>{
            Vue.use(comp)
        })
    },
}