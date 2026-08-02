import initSqlJs, { type Database, type QueryExecResult } from "sql.js";

let sqlJsPromise: Promise<Awaited<ReturnType<typeof initSqlJs>>> | null = null;

function loadSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({ locateFile: (file) => `/${file}` });
  }
  return sqlJsPromise;
}

export async function createDatabase(snapshotBase64?: string | null): Promise<Database> {
  const SQL = await loadSqlJs();
  if (snapshotBase64) {
    return new SQL.Database(base64ToBytes(snapshotBase64));
  }
  return new SQL.Database();
}

export function exportDatabaseToBase64(db: Database): string {
  return bytesToBase64(db.export());
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export interface TabelaInfo {
  nome: string;
  colunas: string[];
}

export function listarTabelas(db: Database): TabelaInfo[] {
  const result = db.exec(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  );
  if (result.length === 0) return [];

  return result[0].values.map((row) => {
    const nome = String(row[0]);
    const nomeEscapado = nome.replace(/"/g, '""');
    const info = db.exec(`PRAGMA table_info("${nomeEscapado}");`);
    const colunas = info[0]?.values.map((c) => String(c[1])) ?? [];
    return { nome, colunas };
  });
}

export type { Database, QueryExecResult };
