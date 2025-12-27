export interface Opcion {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface PersonasData {
  cantidad: Opcion[];
  tipos: Opcion[];
  estilos: Opcion[];
  expresiones: Opcion[];
  poses: Opcion[];
}

export interface EscenariosData {
  lugares: Opcion[];
  ambientes: Opcion[];
  fondos: Opcion[];
}

export interface Selecciones {
  cantidad: Opcion | null;
  tipo: Opcion | null;
  estilo: Opcion | null;
  expresion: Opcion | null;
  pose: Opcion | null;
  lugar: Opcion | null;
  ambiente: Opcion | null;
  fondo: Opcion | null;
}
