export const monetaryFormat = (num: string, editing: boolean) => {
    if (!Number(num) && !editing) return ''
    const value = editing ? Number(num) : Number(num) / 100
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value)
}

export const monetaryUnformat = (num: number) => {
    return String(num).replace(/[R$]/g, '').replace('.', '').replace(',', '.')
}

export const dateFormat = (data: Date) =>{
    return new Date(data).toLocaleDateString('pt-BR')
}
