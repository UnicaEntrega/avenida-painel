import Vue from 'vue'

export const validadorCpf = function (cpf) {
    cpf = (cpf || '').replace(/[^\d]+/g, '')
    if (!cpf) return true
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") return 'CPF incorreto'
    let add = 0
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i)
    let rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(cpf.charAt(9))) return 'CPF incorreto'
    add = 0
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(cpf.charAt(10))) return 'CPF incorreto'
    return true
}

export const validadorCnpj = function (cnpj) {
    cnpj = (cnpj || '').replace(/[^\d]+/g, '')
    if (!cnpj) return true
    if (cnpj.length != 14) return false
    if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999") return 'CNPJ incorreto'
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(0)) return 'CNPJ incorreto'
    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(1)) return 'CNPJ incorreto'
    return true
}

export const validadorEmail = function (val) {
    if (!val) return true
    return new RegExp(/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i).test(val) || "Este email é inválido."
}

export const validadorSenhaIgual = function (val, valOld) {
    return val === valOld || 'As senhas não são idênticas'
}

export const validadorRequerido = function (val) {
    if (val===null || val===undefined || val==='') return "Este campo é obrigatório."
    return true
}

export const validadorTelefone = function (val) {
    if (!val) return true
    return (val.length == 14 || val.length == 15) || 'Telefone incompleto'
}

export const validadorData = function (val) {
    if (!val) return true
    return val.length === 10 && Vue.moment(val, 'DD/MM/YYYY').isValid() || "Esta data é inválida"
}

export const validadorDataHora = function (val) {
    if (!val) return true
    return val.length === 16 && Vue.moment(val, 'DD/MM/YYYY HH:mm').isValid() || "Esta data é inválida"
}

export const validadorNumero = function (val) {
    if (!val) return true
    let charValidos = '1234567890,.'
    let valido = true
    for (let char of val.toString()) {
        if (!charValidos.includes(char)) {
            valido = false
            break
        }
    }
    return valido || "Este número é inválido"
}