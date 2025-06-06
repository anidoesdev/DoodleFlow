import z from "zod"

export const User = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    name: z.string().max(20)
})

export const SigninSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8)
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
})