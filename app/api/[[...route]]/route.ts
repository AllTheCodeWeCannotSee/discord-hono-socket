
import { Hono } from 'hono'
import { handle } from 'hono/vercel'


import profile from './profiles'
import server from './servers'
import channel from './channels'
import message from './messages'
import directMessage from './direct-messages'
import member from './members'



export const runtime = 'edge';

export const app = new Hono().basePath('/api')

const routes = app
    .route('/profile', profile)
    .route('/server', server)
    .route('/channel', channel)
    .route('/message', message)
    .route('/direct-message', directMessage)
    .route('/member', member)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;


