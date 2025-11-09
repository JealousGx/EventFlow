import { atom } from 'nanostores'

export const eventFormModalStore = atom<{
	isOpen: boolean
}>({
	isOpen: false,
})

export const toggleEventFormModal = () => {
	const currentState = eventFormModalStore.get().isOpen

	eventFormModalStore.set({ isOpen: !currentState })
}
