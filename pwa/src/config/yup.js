/* eslint-disable */
import * as Yup from "yup";

const translation = {
    mixed: {
        default: "${path} é inválido",
        required: "${path} é um campo obrigatório",
        oneOf: "${path} deve ser um dos seguintes valores: ${values}",
        notOneOf: "${path} não pode ser um dos seguintes valores: ${values}",
    },
    string: {
        length: "${path} deve ter exatamente ${length} caracteres",
        min: "${path} deve ter pelo menos ${min} caracteres",
        max: "${path} deve ter no máximo ${max} caracteres",
        email: "${path} tem o formato de e-mail inválido",
        url: "${path} deve ter um formato de URL válida",
        trim: "${path} não deve conter espaços no início ou no fim.",
        lowercase: "${path} deve estar em maiúsculo",
        uppercase: "${path} deve estar em minúsculo",
    },
    number: {
        min: "${path} deve ser no mínimo ${min}",
        max: "${path} deve ser no máximo ${max}",
        lessThan: "${path} deve ser menor que ${less}",
        moreThan: "${path} deve ser maior que ${more}",
        notEqual: "${path} não pode ser igual à ${notEqual}",
        positive: "${path} deve ser um número positivo",
        negative: "${path} deve ser um número negativo",
        integer: "${path} deve ser um número inteiro",
    },
    date: {
        min: "${path} deve ser maior que a data ${min}",
        max: "${path} deve ser menor que a data ${max}",
    },
    array: {
        min: "${path} deve ter no mínimo ${min} itens",
        max: "${path} deve ter no máximo ${max} itens",
    },
};

Yup.setLocale(translation);

function validateCpf(message) {
    return this.test("test-cpf", message, function (value) {
        const { path, createError } = this;

        let cpf = value.replace(/\D/g, "");

        if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf))
            return false;

        var result = true;

        [9, 10].forEach(function (j) {
            var sum = 0,
                r;

            cpf.split(/(?=)/)
                .splice(0, j)
                .forEach(function (e, i) {
                    sum += parseInt(e) * (j + 2 - (i + 1));
                });

            r = sum % 11;
            r = r < 2 ? 0 : 11 - r;

            if (r !== parseInt(cpf.substring(j, j + 1))) result = false;
        });

        return result || createError({ path, message });
    });
}

Yup.addMethod(Yup.string, "isCpf", validateCpf);

export default Yup;
