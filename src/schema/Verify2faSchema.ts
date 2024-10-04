import * as yup from 'yup'

export const Verify2faSchema = yup.object(
    {
        token: yup.string().required("token is required and must be a 6 digit code "),
    }
)

