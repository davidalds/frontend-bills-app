export const monetaryFormat = (num: string, isPrinting: boolean) => {
    if (!Number(num) && !isPrinting) return ''
    const value = isPrinting ? Number(num) : Number(num) / 100
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export const monetaryUnformat = (num: number) => {
    return String(num).replace(/[R$]/g, '').replace('.', '').replace(',', '.')
}

export const dateFormat = (date: Date) => {
    return String(date).split('-').reverse().join('/')
}
