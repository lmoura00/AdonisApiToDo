import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      { title: 'Task 1', description: 'Description 1', done: false, userId: 1 },
      { title: 'Task 2', description: 'Description 2', done: false, userId: 1 },
      { title: 'Task 3', description: 'Description 3', done: false, userId: 2 },
    ])
  }
}
