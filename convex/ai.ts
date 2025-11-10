import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
import { ConvexError, v } from 'convex/values'

import { api } from './_generated/api'
import { action, mutation, query } from './_generated/server'
import { getUserId } from './users'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable not set.')
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export const getMessages = query({
  args: {
    eventId: v.id('events'),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new ConvexError('You must be logged in to view messages.')
    }

    const participant = await ctx.db
      .query('participants')
      .withIndex('by_user_and_event', (q) =>
        q.eq('userId', userId).eq('eventId', args.eventId),
      )
      .first()

    if (!participant || !['owner', 'editor'].includes(participant.role)) {
      throw new ConvexError(
        'You must be an owner or editor to view messages.',
      )
    }

    return ctx.db
      .query('aiChatMessages')
      .withIndex('by_event_id', (q) => q.eq('eventId', args.eventId))
      .collect()
  },
})

export const sendMessage = mutation({
  args: {
    eventId: v.id('events'),
    content: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new ConvexError('You must be logged in to send a message.')
    }

    const participant = await ctx.db
      .query('participants')
      .withIndex('by_user_and_event', (q) =>
        q.eq('userId', userId).eq('eventId', args.eventId),
      )
      .first()

    if (!participant || !['owner', 'editor'].includes(participant.role)) {
      throw new ConvexError(
        'You must be an owner or editor to send a message.',
      )
    }

    await ctx.db.insert('aiChatMessages', {
      eventId: args.eventId,
      userId,
      content: args.content,
      role: args.role,
    })

    if (args.role === 'user') {
      await ctx.scheduler.runAfter(0, api.ai.getAIResponse, {
        eventId: args.eventId,
        message: args.content,
      })
    }
  },
})

export const getAIResponse = action({
  args: {
    eventId: v.id('events'),
    message: v.string(),
  },
  handler: async (ctx, args) => {

    const user = await ctx.runQuery(api.users.getCurrentUser)

    if (!user) {
      throw new ConvexError('User not found.')
    }

    const event = await ctx.runQuery(api.events.getEvent, {
      eventId: args.eventId,
    })

    if (!event) {
      throw new ConvexError('Event not found.')
    }
    const { text } = streamText({
      model: google('gemini-2.5-flash'),
      system: `You are an expert event planner. The user is asking for help with their event: "${event.title}". The event is on ${event.date} and has a ${event.tone} tone. The goals are: ${event.goals}.`,
      prompt: `The user's message is: "${args.message}". Please provide a helpful response.`,
    })

    await ctx.runMutation(api.ai.sendMessage, {
      eventId: args.eventId,
      content: await text,
      role: 'assistant',
    })
  },
})
