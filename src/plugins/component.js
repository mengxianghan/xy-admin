import LayoutMenu from '@/components/LayoutMenu/LayoutMenu'
import LayoutMenuIcon from '@/components/LayoutMenu/LayoutMenuIcon'
import LayoutMenuLink from '@/components/LayoutMenu/LayoutMenuLink'
import LayoutMenuSub from '@/components/LayoutMenu/LayoutMenuSub'
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'
import LayoutHeader from '@/components/LayoutHeader'
import MultiTab from '@/components/MultiTab'
import SearchBar from '@/components/SearchBar'

export default {
    install(app) {
        app.component('XLayoutMenu', LayoutMenu)
        app.component('XLayoutMenuIcon', LayoutMenuIcon)
        app.component('XLayoutMenuLink', LayoutMenuLink)
        app.component('XLayoutMenuSub', LayoutMenuSub)
        app.component('XActionBar', ActionBar)
        app.component('XActionButton', ActionButton)
        app.component('XLayoutHeader', LayoutHeader)
        app.component('XMultiTab', MultiTab)
        app.component('XSearchBar', SearchBar)
        return app
    },
}
