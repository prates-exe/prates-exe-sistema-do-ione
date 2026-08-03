-- Bitlab — regra única de status da aula.
--
-- PROBLEMA 1: o status era calculado em três lugares do código, com regras
-- diferentes. O resultado é que a aula ficava "concluída" só com o quiz —
-- bastava rolar a página, que já marca material_visualizado.
--
-- PROBLEMA 2: só existiam três estados, e "abriu a aula" caía no mesmo balde
-- de "já fez metade do trabalho". Na lista, aula recém-aberta e aula com o
-- quiz feito ficavam idênticas.
--
-- OS QUATRO ESTADOS:
--   nao_iniciada — nunca abriu
--   iniciada     — abriu e leu o material, mas não entregou nada ainda
--   em_andamento — fez o quiz OU o desafio (falta o outro)
--   concluida    — fez o quiz E o desafio
--
-- Aula sem desafio (tipo_sandbox = 'none') fecha só com o quiz, porque não
-- há exercício a entregar.
--
-- A regra passa a viver no banco, em um gatilho. Assim vale para qualquer
-- caminho que grave progresso, hoje e no futuro.
--
-- IMPORTANTE: nada do que os alunos já fizeram é perdido. As marcações de
-- quiz_completo, exercicio_completo e material_visualizado NÃO são tocadas —
-- apenas o campo status, que é derivado delas, é recalculado.

-- 1. O check antigo não conhece 'iniciada' e barraria o gatilho.
alter table progresso_aulas drop constraint if exists progresso_aulas_status_check;
alter table progresso_aulas add constraint progresso_aulas_status_check
  check (status in ('nao_iniciada', 'iniciada', 'em_andamento', 'concluida'));

-- 2. O gatilho que calcula o status.
create or replace function calcular_status_progresso()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_tipo_sandbox text;
  v_tem_quiz boolean;
  v_exige_exercicio boolean;
  v_entregou_algo boolean;
begin
  select tipo_sandbox into v_tipo_sandbox from aulas where id = new.aula_id;
  select exists(select 1 from quizzes where aula_id = new.aula_id) into v_tem_quiz;

  -- Aula sem sandbox não tem desafio para entregar.
  v_exige_exercicio := coalesce(v_tipo_sandbox, 'none') <> 'none';
  v_entregou_algo := coalesce(new.quiz_completo, false)
                  or coalesce(new.exercicio_completo, false);

  if coalesce(new.quiz_completo, false)
     and (not v_exige_exercicio or coalesce(new.exercicio_completo, false))
     -- Guarda para aula sem quiz cadastrado: nesse caso o desafio é o que fecha.
     and (v_tem_quiz or coalesce(new.exercicio_completo, false))
  then
    new.status := 'concluida';
    new.concluida_em := coalesce(new.concluida_em, now());

  elsif v_entregou_algo then
    new.status := 'em_andamento';
    new.concluida_em := null;

  elsif coalesce(new.material_visualizado, false)
     or new.primeira_visita_em is not null
  then
    new.status := 'iniciada';
    new.concluida_em := null;

  else
    new.status := 'nao_iniciada';
    new.concluida_em := null;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_calcular_status_progresso on progresso_aulas;
create trigger trg_calcular_status_progresso
before insert or update on progresso_aulas
for each row execute function calcular_status_progresso();

-- 3. Recalcula o que já existe, aplicando a regra nova sem alterar nenhuma
-- marcação feita pelos alunos. Quem fez quiz E desafio continua concluído;
-- quem fez só um dos dois volta para "em andamento", que é o correto.
update progresso_aulas set aluno_id = aluno_id;
