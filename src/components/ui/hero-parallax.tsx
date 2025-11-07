'use client'
import { Link } from '@tanstack/react-router'
import {
	type MotionValue,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from 'motion/react'
import React, { useState } from 'react'
import { EventFlowVisualization } from './event-flow-visualization'

export const HeroParallax = ({
	features,
}: {
	features: {
		title: string
		description: string
		longDescription: string
	}[]
}) => {
	const firstRow = features.slice(0, 5)
	const secondRow = features.slice(5, 10)
	const thirdRow = features.slice(10, 15)
	const ref = React.useRef(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	})

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

	const translateX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springConfig,
	)
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig,
	)
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig,
	)
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig,
	)
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig,
	)
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
		springConfig,
	)
	return (
		<div
			ref={ref}
			className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d"
		>
			<Header />
			<EventFlowVisualization />
			<motion.div
				style={{
					rotateX,
					rotateZ,
					translateY,
					opacity,
				}}
			>
				<motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
					{firstRow.map((feature) => (
						<FeatureCard
							feature={feature}
							translate={translateX}
							key={feature.title}
						/>
					))}
				</motion.div>
				<motion.div className="flex flex-row  mb-20 space-x-20 ">
					{secondRow.map((feature) => (
						<FeatureCard
							feature={feature}
							translate={translateXReverse}
							key={feature.title}
						/>
					))}
				</motion.div>
				<motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
					{thirdRow.map((feature) => (
						<FeatureCard
							feature={feature}
							translate={translateX}
							key={feature.title}
						/>
					))}
				</motion.div>
			</motion.div>
		</div>
	)
}

const Header = () => {
	return (
		<div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
			<h1 className="text-2xl md:text-7xl font-bold dark:text-white">
				The Future of Event Planning is Here.
			</h1>
			<p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
				EventFlow is a smart event planning application that streamlines event
				organization by using AI to generate intelligent agendas based on user
				preferences, which participants can then collaboratively refine in
				real-time.
			</p>
			<Link
				to="/dashboard"
				className="mt-8 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-size-[200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
			>
				Get Started
			</Link>
		</div>
	)
}

const FeatureCard = ({
	feature,
	translate,
}: {
	feature: {
		title: string
		description: string
		longDescription: string
	}
	translate: MotionValue<number>
}) => {
	const [isFlipped, setIsFlipped] = useState(false)

	return (
		<motion.div
			style={{
				x: translate,
			}}
			whileHover={{
				y: -20,
			}}
			key={feature.title}
			className="group/feature h-96 w-120 relative shrink-0"
			onClick={() => setIsFlipped(!isFlipped)}
		>
			<motion.div
				className="flip-card-inner w-full h-full"
				style={{ transformStyle: 'preserve-3d' }}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="flip-card-front absolute w-full h-full bg-gray-800 rounded-lg p-8">
					<h2 className="text-white text-2xl font-bold">{feature.title}</h2>
					<p className="text-white text-lg mt-4">{feature.description}</p>
				</div>
				<div
					className="flip-card-back absolute w-full h-full bg-gray-900 rounded-lg p-8"
					style={{ transform: 'rotateY(180deg)' }}
				>
					<h2 className="text-white text-2xl font-bold">{feature.title}</h2>
					<p className="text-white text-lg mt-4">{feature.longDescription}</p>
				</div>
			</motion.div>
		</motion.div>
	)
}
