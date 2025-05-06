import vine from '@vinejs/vine'

export const createSessionValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    password: vine.string().minLength(6),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6),
  })
)
