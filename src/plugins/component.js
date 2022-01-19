import LayoutMenu from '@/components/LayoutMenu'
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'
import Breadcrumb from '@/components/Breadcrumb'
import Chart from '@/components/Chart'
import Filter from '@/components/Filter'
import FilterItem from '@/components/FilterItem'
import LayoutHeader from '@/components/LayoutHeader'
import MultiTab from '@/components/MultiTab'
import SearchBar from '@/components/SearchBar'

export default {
    install(app) {
        app.component('XLayoutMenu', LayoutMenu)
        app.component('XActionBar', ActionBar)
        app.component('XActionButton', ActionButton)
        app.component('XBreadcrumb', Breadcrumb)
        app.component('XChart', Chart)
        app.component('XFilter', Filter)
        app.component('XFilterItem', FilterItem)
        app.component('XLayoutHeader', LayoutHeader)
        app.component('XMultiTab', MultiTab)
        app.component('XSearchBar', SearchBar)
        return app
    },
}
