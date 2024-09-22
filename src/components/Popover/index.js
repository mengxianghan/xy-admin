import usePopover from './usePopover'
import PopoverConstructor from './Popover.vue'

const Popover = usePopover({
    view: PopoverConstructor,
})

export { Popover, usePopover }
