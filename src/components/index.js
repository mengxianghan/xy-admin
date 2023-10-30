import ActionBar from './ActionBar/ActionBar.vue'
import ActionButton from './ActionButton/ActionButton.vue'
import Breadcrumb from './Breadcrumb/Breadcrumb.vue'
import Cascader from './Cascader/Cascader.vue'
import Chart from './Chart/Chart.vue'
import Cropper from './Cropper/Cropper.vue'
import CropperDialog from './Cropper/CropperDialog.vue'
import Editor from './Editor/Editor.vue'
import FilterForm from './FilterForm/FilterForm.vue'
import FormTable from './FormTable/FormTable.vue'
import Loading from './Loading'
import Preview from './Preview'
import QrCode from './QrCode/QrCode.vue'
import ResizeBox from './ResizeBox/ResizeBox.vue'
import SearchBar from './SearchBar/SearchBar.vue'
import TagSelect from './TagSelect/TagSelect.vue'
import Transfer from './Transfer/Transfer.vue'
import UploadImage from './Upload/UploadImage.vue'
import UploadInput from './Upload/UploadInput.vue'
import Scrollbar from './Scrollbar/Scrollbar.vue'

import { setupLoadingDirective } from './Loading/directive'

const componentList = [
    ActionBar,
    ActionButton,
    Breadcrumb,
    Cascader,
    Chart,
    Cropper,
    CropperDialog,
    Editor,
    FilterForm,
    FormTable,
    QrCode,
    ResizeBox,
    SearchBar,
    TagSelect,
    Transfer,
    UploadImage,
    UploadInput,
    Scrollbar,
]

export const loading = Loading
export const preview = Preview

export default {
    install(app) {
        componentList.forEach((component) => {
            app.component(component.name, component)
        })

        app.config.globalProperties.$loading = Loading
        app.config.globalProperties.$preview = Preview

        setupLoadingDirective(app)

        return app
    },
}
