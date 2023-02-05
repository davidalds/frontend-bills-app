import * as yup from 'yup'

const schema = yup.object().shape({
    title: yup.string().required("Título é obrigatório").trim(),
    price: yup.string().required("Valor é obrigatório"),
    payday: yup.string().required("Data de pagamento é obrigatório"),
    Creditor: yup.object().shape({
        id: yup.string().required("Credor é obrigatório") 
    })
})

export default schema
