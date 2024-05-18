import { Router } from 'express'
import usersRouter from './user'
import login from './login'

const router = Router()

router.use('/login', login)
router.use('/users', usersRouter)

export default router