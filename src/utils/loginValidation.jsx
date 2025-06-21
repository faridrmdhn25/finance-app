import * as Yup from 'yup'

export const loginValidation = Yup.object({
    email: Yup.string().email('Invalid email').required('Required fields'),
    password: Yup.string().required('Required fields').min(8, 'Minimum 8 characters'),
})
