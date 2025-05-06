import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.query().preload('tasks')
    return users
  }

  async store({ request }: HttpContext) {
    const user = await User.create(request.only(['email', 'password', 'name']))
    return user
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user
  }

  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.merge(request.only(['email', 'password', 'name']))
    await user.save()
    return user
  }

  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
