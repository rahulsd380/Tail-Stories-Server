import { z } from "zod";

const LoginValidationSchema= z.object({
    body: z.object({
        email: z.string({required_error: 'Email is required'}),
        password: z.string({required_error: 'Password is required'})
    })
});

const refreshToeknValidationSchema = z.object({
    cookies : z.object({
        refreshToken : z.string({required_error : "Refresh token is required."}),
    })
});

export const AuthValidations = {
    LoginValidationSchema,
    refreshToeknValidationSchema,
}