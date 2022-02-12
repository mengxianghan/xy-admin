import LayoutMenu from './LayoutMenu'
import ActionBar from './ActionBar'
import ActionButton from './ActionButton'
import Breadcrumb from './Breadcrumb'
import Chart from './Chart'
import Cropper from './Cropper'
import CropperModal from './CropperModal'
import Editor from './Editor'
import FormTable from './FormTable'
import Filter from './Filter/Filter'
import LayoutHeader from './LayoutHeader'
import MultiTab from './MultiTab'
import SearchBar from './SearchBar'
import UploadImage from './Upload/UploadImage'

import Loading from './Loading'
import Preview from './Preview'

export const loading = Loading
export const preview = Preview

export default {
    install(app) {
        app.component('XLayoutMenu', LayoutMenu)
        app.component('XActionBar', ActionBar)
        app.component('XActionButton', ActionButton)
        app.component('XBreadcrumb', Breadcrumb)
        app.component('XChart', Chart)
        app.component('XCropper', Cropper)
        app.component('XCropperModal', CropperModal)
        app.component('XEditor', Editor)
        app.component('XFormTable', FormTable)
        app.component('XFilter', Filter)
        app.component('XLayoutHeader', LayoutHeader)
        app.component('XMultiTab', MultiTab)
        app.component('XSearchBar', SearchBar)
        app.component('XUploadImage', UploadImage)
        return app
    },
}
