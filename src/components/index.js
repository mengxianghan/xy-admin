import ActionBar from './ActionBar.vue'
import ActionButton from './ActionButton.vue'
import Breadcrumb from './Breadcrumb.vue'
import Chart from './Chart.vue'
import Cropper from './Cropper.vue'
import CropperModal from './CropperModal.vue'
import Editor from './Editor.vue'
import FormTable from './FormTable.vue'
import Filter from './Filter/Filter.vue'
import FilterItem from './Filter/FilterItem.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutMenu from './LayoutMenu/index.vue'
import MultiTab from './MultiTab.vue'
import QrCode from './QrCode.vue'
import Region from './Region.vue'
import SearchBar from './SearchBar.vue'
import ResizeBox from './ResizeBox/index.vue'
import UploadImage from './Upload/UploadImage.vue'
import UploadInput from './Upload/UploadInput.vue'

import Loading from './Loading'
import Preview from './Preview'

const components = [
    ActionBar,
    ActionButton,
    Breadcrumb,
    Chart,
    Cropper,
    CropperModal,
    Editor,
    FormTable,
    Filter,
    FilterItem,
    LayoutHeader,
    LayoutMenu,
    MultiTab,
    QrCode,
    Region,
    SearchBar,
    ResizeBox,
    UploadImage,
    UploadInput,
]

export const loading = Loading
export const preview = Preview

export default {
    install(app) {
        components.forEach((component) => {
            app.component(component.name, component)
        })
        return app
    },
}
