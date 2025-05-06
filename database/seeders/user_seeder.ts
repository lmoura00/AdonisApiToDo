import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      { email: 'user1@example.com', password: '123456', name: 'John Doe' },
      { email: 'user2@example.com', password: '123456', name: 'Jane Doe' },
      { email: 'user3@example.com', password: '123456', name: 'John Wick' },
    ])
  }
}
