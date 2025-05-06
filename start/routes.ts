const UsersController = () => import('#controllers/users_controller')
const TasksController = () => import('#controllers/tasks_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/session', [SessionController, 'store'])
router.delete('/session', [SessionController, 'destroy'])
router.resource('/user', UsersController).apiOnly()
router
  .group(() => {
    router.resource('task', TasksController)
  })
  .use(middleware.auth())
