// Tipos escritos à mão para casar com supabase/migrations/000*.sql.
// Quando o projeto Supabase estiver criado, o ideal é substituir este arquivo
// pelo gerado automaticamente com:
//   npx supabase gen types typescript --project-id <id> > src/lib/types/database.types.ts
//
// `Relationships: []` em cada tabela é proposital: sem os metadados de FK que
// o gerador oficial produziria, deixamos vazio e evitamos sintaxe de embed
// (`.select("tabela(coluna)")`) no código — cada consulta busca uma tabela
// por vez e a junção é feita em JS quando precisa.

export type Role = "professor" | "aluno";
export type TrilhaSlug = "dam" | "bd";
export type TipoSandbox = "sql" | "code" | "android" | "none";
export type SandboxContexto = "curso" | "livre";
export type StatusProgresso =
  | "nao_iniciada"
  | "iniciada"
  | "em_andamento"
  | "concluida";

export interface PerguntaQuiz {
  id: string;
  tipo: "multipla_escolha";
  enunciado: string;
  opcoes: { id: string; texto: string }[];
  resposta_correta: string;
  explicacao?: string;
}

export interface ResultadoExecucaoCodigo {
  stdout: string;
  stderr: string;
  exit_code: number | null;
}

// Estado final das views (id -> texto) depois de rodar a Activity do aluno
// no sandbox de Android — é isso que o preview usa para atualizar a tela.
export interface ResultadoExecucaoAndroid {
  estados: Record<string, string>;
  stdout: string;
  stderr: string;
  exit_code: number | null;
}

// Critério de validação de uma atividade. Para tipo_sandbox "sql", `sql` é
// uma consulta que deve retornar 1 (verdadeiro) quando o critério é
// atendido. Para tipo_sandbox "code", `contem` é um texto que deve aparecer
// na saída (stdout) do programa do aluno.
export interface CriterioValidacao {
  descricao: string;
  sql?: string;
  contem?: string;
  dica?: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: Role;
          nome_exibicao: string | null;
          avatar_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: Role;
          nome_exibicao?: string | null;
          avatar_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      trilhas: {
        Row: {
          id: string;
          slug: TrilhaSlug;
          nome: string;
          descricao: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: TrilhaSlug;
          nome: string;
          descricao?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["trilhas"]["Insert"]>;
        Relationships: [];
      };
      modulos: {
        Row: {
          id: string;
          trilha_id: string;
          numero: number;
          titulo: string;
          descricao: string | null;
        };
        Insert: {
          id?: string;
          trilha_id: string;
          numero: number;
          titulo: string;
          descricao?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["modulos"]["Insert"]>;
        Relationships: [];
      };
      turmas: {
        Row: {
          id: string;
          trilha_id: string;
          nome: string;
          ativa: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          trilha_id: string;
          nome: string;
          ativa?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["turmas"]["Insert"]>;
        Relationships: [];
      };
      turma_membros: {
        Row: {
          id: string;
          turma_id: string;
          aluno_id: string;
          criado_em: string;
        };
        Insert: {
          id?: string;
          turma_id: string;
          aluno_id: string;
          criado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["turma_membros"]["Insert"]>;
        Relationships: [];
      };
      aulas: {
        Row: {
          id: string;
          trilha_id: string;
          modulo_id: string;
          mes_numero: number;
          semana_numero: number;
          numero_sequencial: number;
          titulo: string;
          duracao_minutos: number;
          tipo_sandbox: TipoSandbox;
          conteudo_md: string;
          exercicio_inicial: string | null;
          layout_inicial: string | null;
          solucao_referencia: string | null;
          publicado: boolean;
          criterios_validacao: CriterioValidacao[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trilha_id: string;
          modulo_id: string;
          mes_numero: number;
          semana_numero: number;
          numero_sequencial: number;
          titulo: string;
          duracao_minutos?: number;
          tipo_sandbox: TipoSandbox;
          conteudo_md?: string;
          exercicio_inicial?: string | null;
          layout_inicial?: string | null;
          solucao_referencia?: string | null;
          publicado?: boolean;
          criterios_validacao?: CriterioValidacao[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["aulas"]["Insert"]>;
        Relationships: [];
      };
      quizzes: {
        Row: {
          id: string;
          aula_id: string;
          titulo: string;
          perguntas: PerguntaQuiz[];
          nota_minima_aprovacao: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          aula_id: string;
          titulo: string;
          perguntas: PerguntaQuiz[];
          nota_minima_aprovacao?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["quizzes"]["Insert"]>;
        Relationships: [];
      };
      quiz_tentativas: {
        Row: {
          id: string;
          quiz_id: string;
          aluno_id: string;
          respostas: Record<string, string>;
          nota: number;
          acertos: number;
          total: number;
          tentativa_numero: number;
          concluida_em: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          aluno_id: string;
          respostas: Record<string, string>;
          nota: number;
          acertos: number;
          total: number;
          tentativa_numero: number;
          concluida_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["quiz_tentativas"]["Insert"]>;
        Relationships: [];
      };
      sql_sandbox_state: {
        Row: {
          id: string;
          aluno_id: string;
          trilha_id: string;
          contexto: SandboxContexto;
          db_snapshot: string | null;
          rascunho: string | null;
          tamanho_bytes: number | null;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          trilha_id: string;
          contexto?: SandboxContexto;
          db_snapshot?: string | null;
          rascunho?: string | null;
          tamanho_bytes?: number | null;
          atualizado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sql_sandbox_state"]["Insert"]>;
        Relationships: [];
      };
      sql_query_history: {
        Row: {
          id: string;
          aluno_id: string;
          aula_id: string | null;
          query_sql: string;
          sucesso: boolean;
          mensagem_erro: string | null;
          executado_em: string;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          aula_id?: string | null;
          query_sql: string;
          sucesso: boolean;
          mensagem_erro?: string | null;
          executado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sql_query_history"]["Insert"]>;
        Relationships: [];
      };
      code_sandbox_state: {
        Row: {
          id: string;
          aluno_id: string;
          aula_id: string;
          codigo: string;
          resultado_execucao: ResultadoExecucaoCodigo | null;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          aula_id: string;
          codigo?: string;
          resultado_execucao?: ResultadoExecucaoCodigo | null;
          atualizado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["code_sandbox_state"]["Insert"]>;
        Relationships: [];
      };
      code_playground_state: {
        Row: {
          id: string;
          aluno_id: string;
          codigo: string;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          codigo?: string;
          atualizado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["code_playground_state"]["Insert"]>;
        Relationships: [];
      };
      android_sandbox_state: {
        Row: {
          id: string;
          aluno_id: string;
          aula_id: string;
          layout_xml: string;
          activity_java: string;
          resultado_execucao: ResultadoExecucaoAndroid | null;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          aula_id: string;
          layout_xml?: string;
          activity_java?: string;
          resultado_execucao?: ResultadoExecucaoAndroid | null;
          atualizado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["android_sandbox_state"]["Insert"]>;
        Relationships: [];
      };
      android_playground_state: {
        Row: {
          id: string;
          aluno_id: string;
          layout_xml: string;
          activity_java: string;
          resultado_execucao: ResultadoExecucaoAndroid | null;
          atualizado_em: string;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          layout_xml?: string;
          activity_java?: string;
          resultado_execucao?: ResultadoExecucaoAndroid | null;
          atualizado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["android_playground_state"]["Insert"]>;
        Relationships: [];
      };
      progresso_aulas: {
        Row: {
          id: string;
          aluno_id: string;
          aula_id: string;
          status: StatusProgresso;
          material_visualizado: boolean;
          exercicio_completo: boolean;
          quiz_completo: boolean;
          primeira_visita_em: string | null;
          concluida_em: string | null;
        };
        Insert: {
          id?: string;
          aluno_id: string;
          aula_id: string;
          status?: StatusProgresso;
          material_visualizado?: boolean;
          exercicio_completo?: boolean;
          quiz_completo?: boolean;
          primeira_visita_em?: string | null;
          concluida_em?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["progresso_aulas"]["Insert"]>;
        Relationships: [];
      };
      eventos_admin: {
        Row: {
          id: string;
          professor_id: string;
          acao: string;
          detalhes: Record<string, unknown> | null;
          criado_em: string;
        };
        Insert: {
          id?: string;
          professor_id: string;
          acao: string;
          detalhes?: Record<string, unknown> | null;
          criado_em?: string;
        };
        Update: Partial<Database["public"]["Tables"]["eventos_admin"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      aluno_dashboard: {
        Args: { p_aluno_id: string };
        Returns: {
          turma_id: string;
          turma_nome: string;
          trilha_id: string;
          trilha_slug: TrilhaSlug;
          aula_id: string | null;
          aula_titulo: string | null;
          mes_numero: number | null;
          semana_numero: number | null;
          numero_sequencial: number | null;
          modulo_titulo: string | null;
          status: StatusProgresso;
        }[];
      };
      aluno_trilhas: {
        Args: { p_aluno_id: string };
        Returns: { slug: TrilhaSlug }[];
      };
      trilha_do_aluno: {
        Args: { p_aluno_id: string; p_slug: TrilhaSlug };
        Returns: string | null;
      };
    };
  };
}
