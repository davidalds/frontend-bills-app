import * as yup from 'yup'

const schema = yup.object().shape({
    password: yup.string().required('Campo obrigatório'),
    confirm_password: yup
        .string()
        .required('Campo obrigatório')
        .test('isPasswordEqual', 'Senhas diferentes', (value, context) => {
            return value === context.parent.password
        }),
})

export default schema
