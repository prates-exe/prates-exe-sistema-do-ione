-- Sistema do Ione — perfil do aluno (nome de exibição e avatar)
-- O aluno pode personalizar como aparece no site (nome de exibição + avatar
-- escolhido entre opções fixas), mas nunca pode alterar full_name (o nome
-- real cadastrado pela professora) nem role, mesmo que tente forjar a
-- requisição — o gatilho abaixo bloqueia isso no banco, não só na tela.
alter table profiles add column if not exists nome_exibicao text;
alter table profiles add column if not exists avatar_id text;

alter table profiles add constraint profiles_avatar_id_check
  check (avatar_id is null or avatar_id in (
    'foguete', 'robo', 'gato', 'cachorro', 'panda', 'passaro',
    'coelho', 'tartaruga', 'fantasma', 'raio', 'gema', 'joystick'
  ));

create or replace function proteger_campos_profiles()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if not is_professor() then
    if new.full_name is distinct from old.full_name then
      raise exception 'Não é permitido alterar full_name.';
    end if;
    if new.role is distinct from old.role then
      raise exception 'Não é permitido alterar role.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_proteger_campos_profiles on profiles;
create trigger trg_proteger_campos_profiles
before update on profiles
for each row execute function proteger_campos_profiles();

create policy "profiles_update_own_or_professor" on profiles
  for update using (id = auth.uid() or is_professor())
  with check (id = auth.uid() or is_professor());
