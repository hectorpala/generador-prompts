import { Categoria, ListasData, SeccionCatalogo } from '../types'

import sexo from './persona/sexo.json'
import edad from './persona/edad.json'
import origen from './persona/origen.json'
import cuerpo from './persona/cuerpo.json'
import rostro from './persona/rostro.json'
import cabello from './persona/cabello.json'
import ojos from './persona/ojos.json'
import piel from './persona/piel.json'
import vestimenta from './persona/vestimenta.json'
import expresion from './persona/expresion.json'
import pose from './persona/pose.json'
import accion from './persona/accion.json'
import profesion from './persona/profesion.json'
import estiloFotoPersona from './persona/estilo_foto.json'
import rasgosHombre from './persona/hombre/rasgos.json'
import rasgosMujer from './persona/mujer/rasgos.json'

import lugares from './escenario/lugares.json'
import ambientes from './escenario/ambientes.json'
import fondos from './escenario/fondos.json'
import props from './escenario/props.json'
import estilosFotoEscenario from './escenario/estilos_foto.json'
import calidades from './escenario/calidades.json'
import aspectRatios from './escenario/aspect_ratios.json'
import exclusiones from './escenario/exclusiones.json'
import plataformas from './escenario/plataformas.json'
import tiposReferencia from './escenario/tipos_referencia.json'

export const listasBase: ListasData = {
  'persona.sexo': sexo,
  'persona.edad': edad,
  'persona.origen': origen,
  'persona.cuerpo': cuerpo,
  'persona.rostro': rostro,
  'persona.cabello': cabello,
  'persona.ojos': ojos,
  'persona.piel': piel,
  'persona.vestimenta': vestimenta,
  'persona.expresion': expresion,
  'persona.pose': pose,
  'persona.accion': accion,
  'persona.profesion': profesion,
  'persona.estilo_foto': estiloFotoPersona,
  'persona.hombre.rasgos': rasgosHombre,
  'persona.mujer.rasgos': rasgosMujer,
  'escenario.lugares': lugares,
  'escenario.ambientes': ambientes,
  'escenario.fondos': fondos,
  'escenario.props': props,
  'escenario.estilos_foto': estilosFotoEscenario,
  'escenario.calidades': calidades,
  'escenario.aspect_ratios': aspectRatios,
  'escenario.exclusiones': exclusiones,
  'escenario.plataformas': plataformas,
  'escenario.tipos_referencia': tiposReferencia
}

const categoriaSexo: Categoria = {
  id: 'persona.sexo',
  titulo: 'Sexo',
  listaId: 'persona.sexo',
  childrenByOptionId: {
    hombre: [
      {
        id: 'persona.hombre.rasgos',
        titulo: 'Rasgos (Hombre)',
        listaId: 'persona.hombre.rasgos'
      }
    ],
    mujer: [
      {
        id: 'persona.mujer.rasgos',
        titulo: 'Rasgos (Mujer)',
        listaId: 'persona.mujer.rasgos'
      }
    ]
  }
}

export const catalogo: SeccionCatalogo[] = [
  {
    id: 'persona',
    titulo: 'Persona',
    categorias: [
      categoriaSexo,
      { id: 'persona.edad', titulo: 'Edad', listaId: 'persona.edad' },
      { id: 'persona.origen', titulo: 'Origen', listaId: 'persona.origen' },
      { id: 'persona.cuerpo', titulo: 'Cuerpo', listaId: 'persona.cuerpo' },
      { id: 'persona.rostro', titulo: 'Rostro', listaId: 'persona.rostro' },
      { id: 'persona.cabello', titulo: 'Cabello', listaId: 'persona.cabello' },
      { id: 'persona.ojos', titulo: 'Ojos', listaId: 'persona.ojos' },
      { id: 'persona.piel', titulo: 'Piel', listaId: 'persona.piel' },
      { id: 'persona.vestimenta', titulo: 'Vestimenta', listaId: 'persona.vestimenta' },
      { id: 'persona.expresion', titulo: 'Expresion', listaId: 'persona.expresion' },
      { id: 'persona.pose', titulo: 'Pose', listaId: 'persona.pose' },
      { id: 'persona.accion', titulo: 'Accion', listaId: 'persona.accion' },
      { id: 'persona.profesion', titulo: 'Profesion', listaId: 'persona.profesion' },
      { id: 'persona.estilo_foto', titulo: 'Estilo de foto', listaId: 'persona.estilo_foto' }
    ]
  },
  {
    id: 'escenario',
    titulo: 'Escenario',
    categorias: [
      {
        id: 'escenario.lugares',
        titulo: 'Lugar',
        listaId: 'escenario.lugares',
        promptPrefix: 'in a'
      },
      {
        id: 'escenario.ambientes',
        titulo: 'Ambiente',
        listaId: 'escenario.ambientes',
        promptPrefix: 'with'
      },
      { id: 'escenario.fondos', titulo: 'Fondo', listaId: 'escenario.fondos' },
      {
        id: 'escenario.props',
        titulo: 'Props',
        listaId: 'escenario.props',
        promptPrefix: 'with'
      },
      { id: 'escenario.estilos_foto', titulo: 'Estilo de foto', listaId: 'escenario.estilos_foto' },
      { id: 'escenario.calidades', titulo: 'Calidad', listaId: 'escenario.calidades' },
      {
        id: 'escenario.aspect_ratios',
        titulo: 'Aspect ratio',
        listaId: 'escenario.aspect_ratios',
        promptPrefix: 'aspect ratio'
      },
      {
        id: 'escenario.exclusiones',
        titulo: 'Exclusiones',
        listaId: 'escenario.exclusiones',
        promptPrefix: 'without'
      },
      {
        id: 'escenario.plataformas',
        titulo: 'Plataforma',
        listaId: 'escenario.plataformas',
        incluirEnPrompt: false
      },
      {
        id: 'escenario.tipos_referencia',
        titulo: 'Tipo de referencia',
        listaId: 'escenario.tipos_referencia',
        incluirEnPrompt: false
      }
    ]
  }
]
