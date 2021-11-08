import {ref} from 'vue'

export function useForm() {
    const form = ref({})

    return {
        form
    }
}
