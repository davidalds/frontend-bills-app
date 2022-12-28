import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
        .string()
        .email('E-mail deve ser válido')
        .required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
    confirmar_senha: yup
        .string()
        .required('Confirmar senha é obrigatório')
        .test('isEqualPasswords', 'Senhas diferentes', (value, context) => {
            return value === context.parent.password
        })
})

export default schema
