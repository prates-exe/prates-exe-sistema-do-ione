// Alunos não têm e-mail real: o professor cadastra um nome de usuário e o
// sistema usa um domínio fictício (RFC 2606 .invalid, nunca resolve de
// verdade) só para satisfazer o formato exigido pelo Supabase Auth.
//
// NÃO MUDE ESTE VALOR. Ele não é um rótulo: faz parte do e-mail com que cada
// conta foi criada no Supabase Auth ("joao.silva@aluno.sistema-ione.invalid").
// Trocar o domínio aqui faz o login procurar um e-mail que não existe, e todas
// as contas já cadastradas param de entrar. O nome antigo do projeto ficou
// preservado neste único lugar de propósito.
export const STUDENT_EMAIL_DOMAIN = "aluno.sistema-ione.invalid";
