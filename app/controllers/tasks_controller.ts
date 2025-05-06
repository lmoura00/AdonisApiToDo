import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({}: HttpContext) {
    const users = await Task.all()
    return users
  }

  async store({ request }: HttpContext) {
    const user = await Task.create(request.only(['title', 'description', 'done', 'userId']))
    return user
  }

  async show({ params }: HttpContext) {
    const user = await Task.findOrFail(params.id)
    return user
  }

  async update({ params, request }: HttpContext) {
    const user = await Task.findOrFail(params.id)
    user.merge(request.only(['title', 'description', 'done', 'userId']))
    await user.save()
    return user
  }

  async destroy({ params }: HttpContext) {
    const user = await Task.findOrFail(params.id)
    await user.delete()
  }
}
