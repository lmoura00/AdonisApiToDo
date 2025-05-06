import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('email').where('email', value).first()
        return !match
      }),
    password: vine.string().minLength(6),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    password: vine.string().minLength(6),
  })
)
