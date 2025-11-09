// Mock data for Smart Event Planner
// Replace these with actual Convex queries when integrating backend

export interface AgendaItem {
	id: string
	title: string
	duration: number // in minutes
	startTime: string
	endTime?: string
	description?: string
	votes: number
	votedBy: string[]
	type: 'presentation' | 'discussion' | 'break' | 'activity'
}

export interface Event {
	id: string
	title: string
	date: string
	duration: number // in hours
	status: 'upcoming' | 'draft' | 'completed'
	participants: number
	agenda: AgendaItem[]
	createdAt: string
	tone: 'formal' | 'casual'
}

export const mockEvents: Event[] = [
	{
		id: '1',
		title: 'Q1 Product Strategy Meeting',
		date: '2025-11-15T10:00:00',
		duration: 3,
		status: 'upcoming',
		participants: 12,
		createdAt: '2025-11-01T09:00:00',
		tone: 'formal',
		agenda: [
			{
				id: 'a1',
				title: 'Opening & Goals Review',
				duration: 20,
				startTime: '10:00',
				description: 'Review quarterly objectives and set meeting expectations',
				votes: 8,
				votedBy: ['user1', 'user2'],
				type: 'presentation',
			},
			{
				id: 'a2',
				title: 'Product Roadmap Discussion',
				duration: 45,
				startTime: '10:20',
				description: 'Deep dive into upcoming features and priorities',
				votes: 12,
				votedBy: ['user1', 'user2', 'user3'],
				type: 'discussion',
			},
			{
				id: 'a3',
				title: 'Coffee Break',
				duration: 15,
				startTime: '11:05',
				description: 'Networking and refreshments',
				votes: 10,
				votedBy: ['user1'],
				type: 'break',
			},
			{
				id: 'a4',
				title: 'Market Analysis Workshop',
				duration: 40,
				startTime: '11:20',
				description: 'Collaborative analysis of competitive landscape',
				votes: 9,
				votedBy: ['user2', 'user3'],
				type: 'activity',
			},
			{
				id: 'a5',
				title: 'Action Items & Closing',
				duration: 20,
				startTime: '12:00',
				description: 'Summarize decisions and assign next steps',
				votes: 11,
				votedBy: ['user1', 'user2'],
				type: 'presentation',
			},
		],
	},
	{
		id: '2',
		title: 'Design System Workshop',
		date: '2025-11-20T14:00:00',
		duration: 2,
		status: 'draft',
		participants: 6,
		createdAt: '2025-11-03T11:30:00',
		tone: 'casual',
		agenda: [
			{
				id: 'b1',
				title: 'Component Library Review',
				duration: 30,
				startTime: '14:00',
				description: 'Walk through existing components',
				votes: 5,
				votedBy: ['user4'],
				type: 'presentation',
			},
			{
				id: 'b2',
				title: 'Token System Discussion',
				duration: 40,
				startTime: '14:30',
				description: 'Define color, spacing, and typography tokens',
				votes: 6,
				votedBy: ['user4', 'user5'],
				type: 'discussion',
			},
			{
				id: 'b3',
				title: 'Hands-on Building',
				duration: 50,
				startTime: '15:10',
				description: 'Create new components together',
				votes: 4,
				votedBy: ['user5'],
				type: 'activity',
			},
		],
	},
	{
		id: '3',
		title: 'Team Offsite Planning',
		date: '2025-12-05T09:00:00',
		duration: 6,
		status: 'upcoming',
		participants: 25,
		createdAt: '2025-10-28T16:00:00',
		tone: 'casual',
		agenda: [
			{
				id: 'c1',
				title: 'Welcome & Icebreakers',
				duration: 30,
				startTime: '09:00',
				description: 'Team building activities to start the day',
				votes: 18,
				votedBy: ['user6', 'user7'],
				type: 'activity',
			},
			{
				id: 'c2',
				title: 'Year in Review',
				duration: 45,
				startTime: '09:30',
				description: 'Celebrate wins and learn from challenges',
				votes: 20,
				votedBy: ['user6', 'user7', 'user8'],
				type: 'presentation',
			},
			{
				id: 'c3',
				title: 'Vision Workshop',
				duration: 90,
				startTime: '10:15',
				description: 'Collaborative session on company direction',
				votes: 22,
				votedBy: ['user7', 'user8'],
				type: 'discussion',
			},
			{
				id: 'c4',
				title: 'Lunch & Networking',
				duration: 60,
				startTime: '11:45',
				description: 'Catered lunch with open conversations',
				votes: 25,
				votedBy: ['user6', 'user7', 'user8', 'user9'],
				type: 'break',
			},
			{
				id: 'c5',
				title: 'Department Breakouts',
				duration: 75,
				startTime: '12:45',
				description: 'Team-specific planning sessions',
				votes: 19,
				votedBy: ['user8', 'user9'],
				type: 'activity',
			},
			{
				id: 'c6',
				title: 'Closing & Next Steps',
				duration: 30,
				startTime: '14:00',
				description: 'Wrap up and action items',
				votes: 21,
				votedBy: ['user6', 'user9'],
				type: 'presentation',
			},
		],
	},
	{
		id: '4',
		title: 'Sprint Planning Session',
		date: '2025-11-12T13:00:00',
		duration: 2,
		status: 'upcoming',
		participants: 8,
		createdAt: '2025-11-04T10:00:00',
		tone: 'formal',
		agenda: [
			{
				id: 'd1',
				title: 'Sprint Goals Review',
				duration: 15,
				startTime: '13:00',
				description: 'Align on sprint objectives',
				votes: 7,
				votedBy: ['user10'],
				type: 'presentation',
			},
			{
				id: 'd2',
				title: 'Backlog Refinement',
				duration: 50,
				startTime: '13:15',
				description: 'Review and estimate user stories',
				votes: 8,
				votedBy: ['user10', 'user11'],
				type: 'discussion',
			},
			{
				id: 'd3',
				title: 'Capacity Planning',
				duration: 25,
				startTime: '14:05',
				description: 'Assign tasks and validate workload',
				votes: 6,
				votedBy: ['user11'],
				type: 'activity',
			},
			{
				id: 'd4',
				title: 'Questions & Blockers',
				duration: 30,
				startTime: '14:30',
				description: 'Address concerns and dependencies',
				votes: 7,
				votedBy: ['user10', 'user11'],
				type: 'discussion',
			},
		],
	},
	{
		id: '5',
		title: 'Client Onboarding Workshop',
		date: '2025-10-30T10:00:00',
		duration: 4,
		status: 'completed',
		participants: 15,
		createdAt: '2025-10-15T14:00:00',
		tone: 'formal',
		agenda: [
			{
				id: 'e1',
				title: 'Platform Introduction',
				duration: 40,
				startTime: '10:00',
				description: 'Overview of features and capabilities',
				votes: 14,
				votedBy: ['user12', 'user13'],
				type: 'presentation',
			},
			{
				id: 'e2',
				title: 'Account Setup Demo',
				duration: 35,
				startTime: '10:40',
				description: 'Live walkthrough of initial configuration',
				votes: 13,
				votedBy: ['user12'],
				type: 'activity',
			},
			{
				id: 'e3',
				title: 'Q&A Session',
				duration: 25,
				startTime: '11:15',
				description: 'Open forum for questions',
				votes: 12,
				votedBy: ['user13'],
				type: 'discussion',
			},
			{
				id: 'e4',
				title: 'Lunch Break',
				duration: 45,
				startTime: '11:40',
				description: 'Catered meal and informal networking',
				votes: 15,
				votedBy: ['user12', 'user13', 'user14'],
				type: 'break',
			},
			{
				id: 'e5',
				title: 'Hands-on Training',
				duration: 75,
				startTime: '12:25',
				description: 'Guided practice with real scenarios',
				votes: 14,
				votedBy: ['user13', 'user14'],
				type: 'activity',
			},
			{
				id: 'e6',
				title: 'Success Planning',
				duration: 40,
				startTime: '13:40',
				description: 'Define goals and next steps',
				votes: 13,
				votedBy: ['user12', 'user14'],
				type: 'presentation',
			},
		],
	},
]

export const mockUser = {
	id: 'user1',
	name: 'Alex Thompson',
	email: 'alex@example.com',
	avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
}

// Helper to get events by status
export const getEventsByStatus = (status: Event['status']) => {
	return mockEvents.filter((event) => event.status === status)
}

// Helper to get event by id
export const getEventById = (id: string) => {
	return mockEvents.find((event) => event.id === id)
}

// Helper to calculate total event duration from agenda
export const calculateTotalDuration = (agenda: AgendaItem[]) => {
	return agenda.reduce((total, item) => total + item.duration, 0)
}
