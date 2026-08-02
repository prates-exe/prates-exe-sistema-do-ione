-- Sistema do Ione — guarda o comando SQL ainda não executado
-- Antes disso, o texto que o aluno estava digitando (mas não tinha rodado
-- ainda) só ficava no localStorage do navegador: se a página recarregasse
-- num computador de laboratório que limpa dados entre sessões, ou o aluno
-- trocasse de máquina, esse rascunho se perdia. Agora ele é salvo no banco,
-- junto com o restante do progresso.
alter table sql_sandbox_state add column if not exists rascunho text;
