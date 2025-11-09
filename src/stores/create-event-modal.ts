import { atom } from 'nanostores'

export const createEventModalStore = atom<{
	isOpen: boolean
}>({
	isOpen: false,
})

export const toggleCreateEventModal = () => {
	const currentState = createEventModalStore.get().isOpen

	createEventModalStore.set({ isOpen: !currentState })
}
