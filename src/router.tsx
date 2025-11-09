import * as Sentry from '@sentry/tanstackstart-react'
import { createRouter } from '@tanstack/react-router'

import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		defaultPreload: 'intent',
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
	})

	if (!router.isServer) {
		Sentry.init({
			dsn: import.meta.env.VITE_SENTRY_DSN,
			integrations: [],
		})
	}

	return router
}
