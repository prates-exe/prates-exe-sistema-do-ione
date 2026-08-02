// Gera, em texto, um único arquivo Java que compila e roda de verdade
// (via Wandbox, o mesmo serviço já usado no terminal de código): contém uma
// API mínima de Android (View, TextView, EditText, Button, Activity, R,
// findViewById) e, no fim, a classe MainActivity que o aluno escreveu.
// Como o Wandbox sempre salva o arquivo como "prog.java", nenhuma classe
// aqui pode ser `public` — mesma regra já usada no terminal de código.
export interface ViewDescriptor {
  id: string;
  tipo: "TextView" | "EditText" | "Button";
  texto: string;
}

export interface EventoClique {
  viewId: string;
  metodo: string;
}

const IDENTIFICADOR_VALIDO = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function escaparStringJava(valor: string): string {
  return valor
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n");
}

export function montarCodigoAndroid({
  views,
  activityJava,
  evento,
}: {
  views: ViewDescriptor[];
  activityJava: string;
  evento?: EventoClique | null;
}): string {
  const viewsValidas = views.filter((v) => IDENTIFICADOR_VALIDO.test(v.id));

  const constantesId = viewsValidas
    .map((v, i) => `    static final int ${v.id} = ${i + 1};`)
    .join("\n");

  const registros = viewsValidas
    .map(
      (v, i) =>
        `    registrar(${i + 1}, "${v.id}", new ${v.tipo}(${i + 1}, "${escaparStringJava(v.texto)}"));`
    )
    .join("\n");

  let dispatchEvento = "";
  if (evento && IDENTIFICADOR_VALIDO.test(evento.metodo)) {
    const alvo = viewsValidas.find((v) => v.id === evento.viewId);
    if (alvo) {
      const indice = viewsValidas.indexOf(alvo) + 1;
      dispatchEvento = `
      try {
        java.lang.reflect.Method metodo = a.getClass().getMethod("${evento.metodo}", View.class);
        metodo.invoke(a, ViewRegistry.obter(${indice}));
      } catch (java.lang.reflect.InvocationTargetException e) {
        if (e.getCause() instanceof RuntimeException) throw (RuntimeException) e.getCause();
        throw new RuntimeException(e.getCause());
      } catch (NoSuchMethodException e) {
        System.out.println("Erro: o metodo \\"${evento.metodo}\\" nao existe na MainActivity (confira o android:onClick do XML).");
      } catch (ReflectiveOperationException e) {
        System.out.println("Erro ao chamar \\"${evento.metodo}\\": " + e);
      }`;
    }
  }

  return `
class Bundle {
}

class View {
  protected int id;
  protected String texto;
  View(int id, String texto) { this.id = id; this.texto = texto; }
  public int getId() { return id; }
  public void setText(String t) { texto = t; ViewRegistry.atualizarTexto(id, t); }
  public String getText() { return texto; }
}

class TextView extends View {
  TextView(int id, String texto) { super(id, texto); }
}

class EditText extends TextView {
  EditText(int id, String texto) { super(id, texto); }
}

class Button extends TextView {
  Button(int id, String texto) { super(id, texto); }
}

class R {
  static class id {
${constantesId}
  }
  static class layout {
    static final int activity_main = 0;
  }
}

class ViewRegistry {
  static java.util.Map<Integer, View> views = new java.util.LinkedHashMap<>();
  static java.util.Map<Integer, String> nomes = new java.util.LinkedHashMap<>();

  static void registrar(int id, String nome, View v) {
    views.put(id, v);
    nomes.put(id, nome);
  }

  static void atualizarTexto(int id, String texto) {
    View v = views.get(id);
    if (v != null) v.texto = texto;
  }

  @SuppressWarnings("unchecked")
  static <T extends View> T obter(int id) {
    return (T) views.get(id);
  }

  static String escapar(String s) {
    if (s == null) return "";
    StringBuilder out = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      if (c == '"' || c == '\\\\') out.append('\\\\').append(c);
      else if (c == '\\n') out.append("\\\\n");
      else out.append(c);
    }
    return out.toString();
  }

  static String paraJson() {
    StringBuilder sb = new StringBuilder("{");
    boolean primeiro = true;
    for (java.util.Map.Entry<Integer, String> e : nomes.entrySet()) {
      if (!primeiro) sb.append(",");
      primeiro = false;
      View v = views.get(e.getKey());
      sb.append("\\"").append(e.getValue()).append("\\":\\"").append(escapar(v.getText())).append("\\"");
    }
    sb.append("}");
    return sb.toString();
  }

  static {
${registros}
  }
}

class Activity {
  protected void onCreate(Bundle savedInstanceState) {}
  public void setContentView(int layoutId) {}
  @SuppressWarnings("unchecked")
  public <T extends View> T findViewById(int id) {
    return (T) ViewRegistry.obter(id);
  }
}

${activityJava}

class Main {
  public static void main(String[] args) {
    // Força a saída em UTF-8. Sem isso, dependendo do serviço que executa o
    // código, acentos viram "?" — e o texto das telas é em português.
    try {
      System.setOut(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, "UTF-8"));
    } catch (java.io.UnsupportedEncodingException e) {
      // segue com a saída padrão
    }

    try {
      MainActivity a = new MainActivity();
      a.onCreate(new Bundle());
${dispatchEvento}
    } finally {
      System.out.println("__ESTADO__" + ViewRegistry.paraJson());
    }
  }
}
`;
}
