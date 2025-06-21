import * as Yup from 'yup'

export const transactionValidation = Yup.object({
    category: Yup.string().required("Required category!"),
    amount: Yup.number().typeError("Must be a number!").required("Required amount!")
})
