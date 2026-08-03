-- Bitlab — critérios de validação por aula
-- Cada critério é uma pergunta de sim/não sobre o estado do banco (ou sobre
-- a saída do código, no caso de Java), com uma descrição em português e uma
-- dica do que fazer quando ainda não foi atendido. Isso permite dizer ao
-- aluno exatamente o que falta — inclusive quando o próximo passo é apagar
-- ou alterar algo já feito, não só criar coisas novas.
alter table aulas add column if not exists criterios_validacao jsonb not null default '[]'::jsonb;
