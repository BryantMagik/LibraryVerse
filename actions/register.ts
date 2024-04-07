"use server"

import * as z from "zod"

import { RegisterSchema } from "@/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    //Validación

    const validatedFiels = RegisterSchema.safeParse(values)

    if (!validatedFiels.success) {
        return { error: "Invalid Fields!" }
    }

    return { success: "Email sent!" }

} 