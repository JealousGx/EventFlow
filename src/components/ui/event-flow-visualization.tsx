'use client'
import { motion } from 'motion/react'

const flowSteps = ['Create', 'Generate', 'Vote', 'Finalize']

export const EventFlowVisualization = () => {
	return (
		<div className="w-full max-w-4xl mx-auto py-12">
			<div className="relative flex items-center justify-between">
				<div className="absolute left-0 right-0 h-1 bg-gray-700" />
				{flowSteps.map((step) => (
					<div key={step} className="relative z-10">
						<motion.div
							className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg"
							initial={{ scale: 0.8, opacity: 0.8 }}
							whileHover={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							{step}
						</motion.div>
					</div>
				))}
			</div>
		</div>
	)
}
