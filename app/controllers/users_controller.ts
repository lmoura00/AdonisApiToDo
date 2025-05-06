import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.query().preload('tasks')
    return users
  }

  async store({ request }: HttpContext) {
    const { email, password, name } = await request.validateUsing(createUserValidator)
    const user = await User.create({ email, password, name })
    return user
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return user.load('tasks')
    } catch (error) {
      return response.status(400).send({ message: 'User not found' })
    }
  }

  async update({ params, request }: HttpContext) {
    const { name, password } = await request.validateUsing(updateUserValidator)
    const user = await User.findOrFail(params.id)
    user.merge({ name, password })
    await user.save()
    return user
  }

  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
