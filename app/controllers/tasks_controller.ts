import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.load('tasks')
    return user.tasks
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const { title, description } = await request.validateUsing(createTaskValidator)
      await user.related('tasks').create({ title, description })
      return { title, description }
    } catch (error) {
      return response.status(400).send({ message: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail('id', params.id)
      return task
    } catch (error) {
      return response.status(400).send({ message: 'Task not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { title, description, done } = await request.validateUsing(updateTaskValidator)
      const task = await Task.findOrFail('id', params.id)
      task.merge({ title, description, done })
      await task.save()
      return task
    } catch (error) {
      return response.status(400).send({ message: 'Task not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail('id', params.id)
      await task.delete()
    } catch (error) {
      return response.status(400).send({ message: 'Task not found' })
    }
  }
}
