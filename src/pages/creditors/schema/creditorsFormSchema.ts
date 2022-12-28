import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório").trim(),
    creditor_type: yup.string().required("Tipo de credor é obrigatório"),
})

export default schema