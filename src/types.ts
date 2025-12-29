export interface Opcion {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface Categoria {
  id: string;
  titulo: string;
  listaId?: string;
  promptPrefix?: string;
  promptSuffix?: string;
  incluirEnPrompt?: boolean;
  children?: Categoria[];
  childrenByOptionId?: Record<string, Categoria[]>;
}

export interface SeccionCatalogo {
  id: string;
  titulo: string;
  categorias: Categoria[];
}

export type ListasData = Record<string, Opcion[]>;
export type Selecciones = Record<string, Opcion | null>;
