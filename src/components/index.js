import ActionBar from './ActionBar'
import ActionButton from './ActionButton'
import Breadcrumb from './Breadcrumb'
import Chart from './Chart'
import Cropper from './Cropper'
import CropperModal from './CropperModal'
import Editor from './Editor'
import FormTable from './FormTable'
import Filter from './Filter/Filter'
import FilterItem from './Filter/FilterItem'
import LayoutHeader from './LayoutHeader'
import LayoutMenu from './LayoutMenu'
import MultiTab from './MultiTab'
import QrCode from './QrCode'
import Region from './Region'
import SearchBar from './SearchBar'
import UploadImage from './Upload/UploadImage'
import UploadInput from './Upload/UploadInput'

import Loading from './Loading'
import Preview from './Preview'

export const loading = Loading
export const preview = Preview

const compList = [
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
    UploadImage,
    UploadInput,
]

export default {
    install(app) {
        compList.forEach((comp) => {
            app.component(`X${comp.name}`, comp)
        })
        return app
    },
}
