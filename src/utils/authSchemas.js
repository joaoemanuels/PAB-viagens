import { z } from "zod";

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const fullNameField = z
  .string()
  .min(1, "Informe seu nome completo")
  .refine((val) => !/\d/.test(val), "Nome não pode conter números")
  .refine(
    (val) => val.trim().split(/\s+/).length >= 2,
    "Informe nome e sobrenome",
  )
  .refine(
    (val) =>
      val
        .trim()
        .split(/\s+/)
        .every((w) => w.length >= 2),
    "Cada parte deve ter ao menos 2 letras",
  );

const emailField = z
  .string()
  .min(1, "Informe seu e-mail")
  .email("Digite um e-mail válido, ex: joao@gmail.com");

const phoneField = z
  .string()
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length >= 10 && val.length <= 11, "Telefone inválido")
  .refine((val) => {
    const ddd = parseInt(val.substring(0, 2));
    return ddd >= 11 && ddd <= 99;
  }, "DDD inválido")
  .refine(
    (val) => (val.length === 11 ? val[2] === "9" : true),
    "Celular deve começar com 9",
  );

const passwordField = z.string().min(6, "Senha muito curta");

const termsField = z.boolean().refine((val) => val === true, {
  message: "Você precisa aceitar os termos",
});

export const baseRegisterSchema = z.object({
  fullName: fullNameField,
  email: emailField,
  phone: phoneField,
  password: passwordField,
  terms: termsField,
});

export const restrictedRegisterSchema = baseRegisterSchema.extend({
  securityToken: z
    .string()
    .min(1, "Código de segurança obrigatório para esta conta"),
});

export { formatPhone };
