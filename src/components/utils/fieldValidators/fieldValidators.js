export const required = value => {
    if(value) return undefined

    return "Это поле обязательно для заполнения"
}
export const maxLengthCreator = (MaxLength) => (value) => {
    // console.log(MaxLength)
    // console.log(value)
    if(value.length > MaxLength) return `Максимальная длина ${MaxLength} символов`

    return undefined
}
