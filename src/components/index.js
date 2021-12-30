import XLayoutMenu from '@/components/XLayoutMenu/XLayoutMenu';
import XActionBar from '@/components/XActionBar';
import XActionButton from '@/components/XActionButton';
import XLayoutHeader from '@/components/XLayoutHeader';
import XMultiTab from '@/components/XMultiTab';
import XSearchBar from '@/components/XSearchBar';

export const install = (app) => {
    app.component(XLayoutMenu.name, XLayoutMenu)
    app.component(XActionBar.name, XActionBar)
    app.component(XActionButton.name, XActionButton)
    app.component(XLayoutHeader.name, XLayoutHeader)
    app.component(XMultiTab.name, XMultiTab)
    app.component(XSearchBar.name, XSearchBar)
    app.component(XLayoutMenu.name, XLayoutMenu)
    return app
}