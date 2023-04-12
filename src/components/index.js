import ActionBar from './ActionBar/ActionBar.vue'
import ActionButton from './ActionButton/ActionButton.vue'
import Breadcrumb from './Breadcrumb/Breadcrumb.vue'
import Chart from './Chart/Chart.vue'
import Cropper from './Cropper/Cropper.vue'
import CropperDialog from './Cropper/CropperDialog.vue'
import Editor from './Editor/Editor.vue'
import Filter from './Filter/Filter.vue'
import FilterItem from './Filter/FilterItem.vue'
import FilterTag from './Filter/FilterTag.vue'
import FilterTagItem from './Filter/FilterTagItem.vue'
import FormTable from './FormTable/FormTable.vue'
import Loading from './Loading'
import Preview from './Preview'
import QrCode from './QrCode/QrCode.vue'
import Region from './Region/Region.vue'
import ResizeBox from './ResizeBox/ResizeBox.vue'
import SearchBar from './SearchBar/SearchBar.vue'
import UploadImage from './Upload/UploadImage.vue'
import UploadInput from './Upload/UploadInput.vue'

import { setupLoadingDirective } from './Loading/directive'

const componentList = [
    ActionBar,
    ActionButton,
    Breadcrumb,
    Chart,
    Cropper,
    CropperDialog,
    Editor,
    Filter,
    FilterItem,
    FilterTag,
    FilterTagItem,
    FormTable,
    QrCode,
    Region,
    ResizeBox,
    SearchBar,
    UploadImage,
    UploadInput,
]

export const xloading = Loading
export const xpreview = Preview

export default {
    install(app) {
        componentList.forEach((component) => {
            app.component(component.name, component)
        })

        app.config.globalProperties.$xloading = Loading
        app.config.globalProperties.$xpreview = Preview

        setupLoadingDirective(app)

        return app
    },
}
