import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useState } from 'react'

import { ActiveUsers } from '@/features/dashboard/event/active-users'
import { AgendaTimeline } from '@/features/dashboard/event/agenda-timeline'
import { EventHeader } from '@/features/dashboard/event/header'

import { mockEvents } from '@/lib/mock-data'

const CURRENT_USER_ID = 'user-1'

interface ActiveUser {
	id: string
	name: string
	lastSeen: string
}

export const Route = createFileRoute('/dashboard/events/$eventId')({
	component: RouteComponent,
})

function RouteComponent() {
	const [, setIsAIDrawerOpen] = useState(false)
	const currentEvent = mockEvents[0] // Replace with actual event fetching logic
	const activeUsers: ActiveUser[] = []

	const handleAgendaReorder = () => {}

	const handleVote = () => {}

	const handleAddAgendaItem = () => {}

	const handleUpdateAgendaItem = () => {}
	const handleDeleteAgendaItem = () => {}

	return (
		<motion.div
			key="event"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className="pt-20"
		>
			<EventHeader
				event={currentEvent}
				onAIAssist={() => setIsAIDrawerOpen(true)}
			/>

			<div className="max-w-7xl mx-auto px-6 pb-20">
				{activeUsers.length > 0 && (
					<div className="mb-6 flex justify-end">
						<ActiveUsers users={activeUsers} currentUserId={CURRENT_USER_ID} />
					</div>
				)}
				<AgendaTimeline
					agenda={currentEvent.agenda}
					onReorder={handleAgendaReorder}
					onVote={handleVote}
					onAddItem={handleAddAgendaItem}
					onUpdateItem={handleUpdateAgendaItem}
					onDeleteItem={handleDeleteAgendaItem}
				/>
			</div>
		</motion.div>
	)
}
