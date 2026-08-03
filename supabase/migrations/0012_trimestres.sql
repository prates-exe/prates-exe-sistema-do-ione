-- Bitlab — o currículo passa a ser organizado por trimestre, não
-- por mês/semana. O aluno vê "Aula 1, Aula 2, ..." em sequência dentro do
-- trimestre, que é como a professora conduz de fato: cada aula de 50 min do
-- laboratório equivale a duas aulas do site (DAM 6/semana, BD 4/semana).
--
-- Os módulos 2 e 3 passam a ser os trimestres. Os demais (1, 4, 5, 6 e os
-- módulos -1/-2 de revisão) ficam sem aulas publicadas e simplesmente não
-- aparecem para o aluno — nada é apagado, para não quebrar referências.
update modulos
set titulo = '2º Trimestre', descricao = 'Fundamentos construídos do zero, com prática no próprio site.'
where numero = 2 and trilha_id in (select id from trilhas where slug in ('dam', 'bd'));

update modulos
set titulo = '3º Trimestre', descricao = 'Aprofundamento e projeto, continuando a base do 2º trimestre.'
where numero = 3 and trilha_id in (select id from trilhas where slug in ('dam', 'bd'));
