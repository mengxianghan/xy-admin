import ActionBar from './ActionBar.vue'
import ActionButton from './ActionButton.vue'
import Breadcrumb from './Breadcrumb.vue'
import Chart from './Chart.vue'
import Cropper from './Cropper.vue'
import CropperDialog from './CropperDialog.vue'
import Editor from './Editor.vue'
import FormTable from './FormTable.vue'
import Filter from './Filter/Filter.vue'
import FilterItem from './Filter/FilterItem.vue'
import QrCode from './QrCode.vue'
import Region from './Region.vue'
import SearchBar from './SearchBar.vue'
import ResizeBox from './ResizeBox/ResizeBox.vue'
import UploadImage from './Upload/UploadImage.vue'
import UploadInput from './Upload/UploadInput.vue'

import LoadingInstance from './Loading'
import Preview from './Preview'

import { setupLoadingDirective } from './Loading/directive'

const componentList = [
    ActionBar,
    ActionButton,
    Breadcrumb,
    Chart,
    Cropper,
    CropperDialog,
    Editor,
    FormTable,
    Filter,
    FilterItem,
    QrCode,
    Region,
    SearchBar,
    ResizeBox,
    UploadImage,
    UploadInput,
]

export const Loading = LoadingInstance
export const preview = Preview

export default {
    install(app) {
        componentList.forEach((component) => {
            app.component(component.name, component)
        })

        setupLoadingDirective(app)

        return app
    },
}
