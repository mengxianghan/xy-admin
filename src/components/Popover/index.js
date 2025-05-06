import PopoverConstructor from './Popover.vue'
import usePopover from './usePopover'

const Popover = usePopover({
  view: PopoverConstructor,
})

export { Popover, usePopover }
