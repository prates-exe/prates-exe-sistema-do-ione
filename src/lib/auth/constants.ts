// Alunos não têm e-mail real: o professor cadastra um nome de usuário e o
// sistema usa um domínio fictício (RFC 2606 .invalid, nunca resolve de
// verdade) só para satisfazer o formato exigido pelo Supabase Auth.
export const STUDENT_EMAIL_DOMAIN = "aluno.sistema-ione.invalid";
