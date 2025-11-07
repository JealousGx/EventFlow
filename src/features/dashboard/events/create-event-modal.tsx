import { Calendar, Clock, Sparkles, Users, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface CreateEventModalProps {
	isOpen: boolean
	onClose: () => void
	onCreate: (eventData: EventFormData) => void
}

export interface EventFormData {
	title: string
	date: string
	duration: number
	participants: number
	tone: 'formal' | 'casual'
	goals: string
}

export function CreateEventModal({
	isOpen,
	onClose,
	onCreate,
}: CreateEventModalProps) {
	const [formData, setFormData] = useState<EventFormData>({
		title: '',
		date: '',
		duration: 2,
		participants: 10,
		tone: 'formal',
		goals: '',
	})

	const [step, setStep] = useState(1)

	const handleSubmit = () => {
		onCreate(formData)
		onClose()
		// Reset form
		setFormData({
			title: '',
			date: '',
			duration: 2,
			participants: 10,
			tone: 'formal',
			goals: '',
		})
		setStep(1)
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded z-50 overflow-hidden"
					>
						{/* Header */}
						<div className="relative p-6 border-b border-border">
							<motion.div
								className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10"
								animate={{
									opacity: [0.5, 0.8, 0.5],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
								}}
							/>
							<div className="relative z-10 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
										<Sparkles className="w-5 h-5 text-primary-foreground" />
									</div>
									<div>
										<h2>Create New Event</h2>
										<p className="text-sm text-muted-foreground">
											Step {step} of 2
										</p>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={onClose}
									className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
								>
									<X className="w-5 h-5" />
								</motion.button>
							</div>
						</div>

						{/* Content */}
						<div className="p-6 max-h-[60vh] overflow-y-auto">
							<AnimatePresence mode="wait">
								{step === 1 ? (
									<motion.div
										key="step1"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className="space-y-6"
									>
										{/* Title */}
										<div>
											<label htmlFor="title" className="block mb-2">
												Event Title
											</label>
											<input
												type="text"
												name="title"
												value={formData.title}
												onChange={(e) =>
													setFormData({ ...formData, title: e.target.value })
												}
												placeholder="e.g., Q1 Planning Meeting"
												className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
											/>
										</div>

										{/* Date & Time */}
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label
													htmlFor="date"
													className="mb-2 flex items-center gap-2"
												>
													<Calendar className="w-4 h-4" />
													Date & Time
												</label>
												<input
													type="datetime-local"
													name="date"
													value={formData.date}
													onChange={(e) =>
														setFormData({ ...formData, date: e.target.value })
													}
													className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
												/>
											</div>

											<div>
												<label
													htmlFor="duration"
													className="mb-2 flex items-center gap-2"
												>
													<Clock className="w-4 h-4" />
													Duration (hours)
												</label>
												<input
													name="duration"
													type="number"
													value={formData.duration}
													onChange={(e) =>
														setFormData({
															...formData,
															duration: Number(e.target.value),
														})
													}
													min="0.5"
													step="0.5"
													className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
												/>
											</div>
										</div>

										{/* Participants */}
										<div>
											<label
												htmlFor="participants"
												className="mb-2 flex items-center gap-2"
											>
												<Users className="w-4 h-4" />
												Expected Participants
											</label>
											<input
												type="number"
												name="participants"
												value={formData.participants}
												onChange={(e) =>
													setFormData({
														...formData,
														participants: Number(e.target.value),
													})
												}
												min="1"
												className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
											/>
										</div>

										{/* Tone */}
										<div>
											<label htmlFor="tone" className="block mb-3">
												Event Tone
											</label>

											<div className="grid grid-cols-2 gap-4">
												<motion.button
													type="button"
													name="tone"
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													onClick={() =>
														setFormData({ ...formData, tone: 'formal' })
													}
													className={`p-4 border-2 rounded transition-all ${
														formData.tone === 'formal'
															? 'border-primary bg-primary/10'
															: 'border-border hover:border-primary/50'
													}`}
												>
													<div className="text-2xl mb-2">👔</div>
													<div className="font-medium">Formal</div>
													<div className="text-sm text-muted-foreground">
														Professional & structured
													</div>
												</motion.button>

												<motion.button
													type="button"
													name="tone"
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													onClick={() =>
														setFormData({ ...formData, tone: 'casual' })
													}
													className={`p-4 border-2 rounded transition-all ${
														formData.tone === 'casual'
															? 'border-primary bg-primary/10'
															: 'border-border hover:border-primary/50'
													}`}
												>
													<div className="text-2xl mb-2">😊</div>
													<div className="font-medium">Casual</div>
													<div className="text-sm text-muted-foreground">
														Relaxed & collaborative
													</div>
												</motion.button>
											</div>
										</div>
									</motion.div>
								) : (
									<motion.div
										key="step2"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className="space-y-6"
									>
										{/* Goals */}
										<div>
											<label htmlFor="goals" className="block mb-2">
												Event Goals & Objectives
											</label>
											<textarea
												value={formData.goals}
												name="goals"
												onChange={(e) =>
													setFormData({ ...formData, goals: e.target.value })
												}
												placeholder="Describe what you want to achieve in this event. The AI will use this to generate your agenda."
												rows={6}
												className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
											/>
											<p className="text-sm text-muted-foreground mt-2">
												💡 Example: "Align team on Q1 priorities, review product
												roadmap, and plan sprint goals"
											</p>
										</div>

										{/* AI Preview */}
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="p-4 bg-accent/50 border border-border rounded"
										>
											<div className="flex items-start gap-3">
												<Sparkles className="w-5 h-5 text-primary mt-0.5" />
												<div>
													<p className="mb-2">
														AI will generate a structured agenda based on your
														inputs
													</p>
													<p className="text-sm text-muted-foreground">
														You'll be able to edit, reorder, and collaborate on
														the agenda after creation.
													</p>
												</div>
											</div>
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Footer */}
						<div className="p-6 border-t border-border flex justify-between">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => (step === 1 ? onClose() : setStep(1))}
								className="px-6 py-3 border border-border rounded hover:border-primary transition-colors"
							>
								{step === 1 ? 'Cancel' : 'Back'}
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => (step === 1 ? setStep(2) : handleSubmit())}
								disabled={step === 1 && !formData.title}
								className="px-6 py-3 bg-primary text-primary-foreground rounded disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{step === 1 ? 'Next' : 'Create Event'}
							</motion.button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
