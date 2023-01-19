import * as yup from 'yup'

const schema = yup.object().shape({
    email: yup.string().trim().required('E-mail é obrigatório'),
})

export default schema
