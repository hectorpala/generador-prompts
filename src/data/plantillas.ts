import { Selecciones } from '../types'

export interface Plantilla {
  id: string
  nombre: string
  categoria: 'negocios' | 'lifestyle' | 'creativos' | 'fitness' | 'gastronomia' | 'cotidiano'
  icono: string
  descripcion: string
  persona: Selecciones
  escenario: Selecciones
}

export const categoriaPlantillas = [
  { id: 'negocios', nombre: 'Negocios', icono: '💼' },
  { id: 'lifestyle', nombre: 'Lifestyle', icono: '✨' },
  { id: 'creativos', nombre: 'Creativos', icono: '🎨' },
  { id: 'fitness', nombre: 'Fitness', icono: '💪' },
  { id: 'gastronomia', nombre: 'Gastronomía', icono: '🍳' },
  { id: 'cotidiano', nombre: 'Cotidiano', icono: '🏠' }
]

export const plantillas: Plantilla[] = [
  // NEGOCIOS
  {
    id: 'ejecutivo_oficina',
    nombre: 'Ejecutivo en oficina',
    categoria: 'negocios',
    icono: '👔',
    descripcion: 'Profesional en ambiente corporativo',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'traje', nombre: 'Traje', descripcion: 'suit, business suit' },
      'persona.expresion': { id: 'confiado', nombre: 'Confiado/a', descripcion: 'confident expression' },
      'persona.pose': { id: 'de_pie_elegante', nombre: 'De pie elegante', descripcion: 'standing elegantly, poised stance' },
      'persona.profesion': { id: 'ceo', nombre: 'CEO / Director ejecutivo', descripcion: 'CEO, executive' },
      'persona.hombre.rasgos': { id: 'sin_vello_facial', nombre: 'Sin vello facial', descripcion: 'clean shaven, no facial hair' }
    },
    escenario: {
      'escenario.lugares': { id: 'oficina_ejecutiva', nombre: 'Oficina ejecutiva', descripcion: 'executive office, CEO office' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'empresaria_moderna',
    nombre: 'Empresaria moderna',
    categoria: 'negocios',
    icono: '👩‍💼',
    descripcion: 'Mujer profesional en ambiente de trabajo',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'business', nombre: 'Business', descripcion: 'business attire, professional clothing' },
      'persona.expresion': { id: 'sonriente', nombre: 'Sonriente', descripcion: 'smiling, pleasant smile' },
      'persona.pose': { id: 'sentado_elegante', nombre: 'Sentado elegante', descripcion: 'sitting elegantly, refined seated pose' },
      'persona.profesion': { id: 'empresario', nombre: 'Empresario/a', descripcion: 'business person, entrepreneur' },
      'persona.mujer.rasgos': { id: 'maquillaje_natural', nombre: 'Maquillaje natural', descripcion: 'natural makeup look' }
    },
    escenario: {
      'escenario.lugares': { id: 'oficina', nombre: 'Oficina moderna', descripcion: 'modern office interior, corporate office' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'medico_consultorio',
    nombre: 'Médico en consultorio',
    categoria: 'negocios',
    icono: '👨‍⚕️',
    descripcion: 'Doctor profesional en ambiente médico',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'uniforme_medico', nombre: 'Uniforme medico', descripcion: 'medical scrubs, doctor uniform' },
      'persona.expresion': { id: 'amable', nombre: 'Amable', descripcion: 'kind expression, gentle' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': { id: 'medico', nombre: 'Medico/a', descripcion: 'doctor, physician' },
      'persona.hombre.rasgos': { id: 'lentes', nombre: 'Lentes/Gafas', descripcion: 'wearing glasses' }
    },
    escenario: {
      'escenario.lugares': { id: 'consultorio', nombre: 'Consultorio', descripcion: "doctor's office" },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'abogada_profesional',
    nombre: 'Abogada profesional',
    categoria: 'negocios',
    icono: '⚖️',
    descripcion: 'Abogada en ambiente legal',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'formal', nombre: 'Formal', descripcion: 'formal attire, business formal' },
      'persona.expresion': { id: 'serio', nombre: 'Serio/a', descripcion: 'serious expression, stern look' },
      'persona.pose': { id: 'de_pie_brazos_cruzados', nombre: 'Brazos cruzados', descripcion: 'arms crossed, crossed arms' },
      'persona.profesion': { id: 'abogado', nombre: 'Abogado/a', descripcion: 'lawyer, attorney' },
      'persona.mujer.rasgos': { id: 'cabello_recogido', nombre: 'Cabello recogido', descripcion: 'hair up, updo hairstyle' }
    },
    escenario: {
      'escenario.lugares': { id: 'sala_juntas', nombre: 'Sala de juntas', descripcion: 'conference room, meeting room' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },

  // LIFESTYLE
  {
    id: 'influencer_cafe',
    nombre: 'Influencer en café',
    categoria: 'lifestyle',
    icono: '☕',
    descripcion: 'Creador de contenido en cafetería',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'casual', nombre: 'Casual', descripcion: 'casual clothing, relaxed outfit' },
      'persona.expresion': { id: 'sonrisa_amplia', nombre: 'Sonrisa amplia', descripcion: 'wide smile, big smile, grinning' },
      'persona.pose': { id: 'sentado_silla', nombre: 'Sentado en silla', descripcion: 'sitting on chair' },
      'persona.profesion': { id: 'influencer', nombre: 'Influencer', descripcion: 'social media influencer, content creator' },
      'persona.mujer.rasgos': { id: 'cabello_ondulado', nombre: 'Cabello ondulado', descripcion: 'wavy hair' }
    },
    escenario: {
      'escenario.lugares': { id: 'cafeteria', nombre: 'Cafeteria', descripcion: 'cozy coffee shop, cafe' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'viajero_playa',
    nombre: 'Viajero en playa',
    categoria: 'lifestyle',
    icono: '🏖️',
    descripcion: 'Persona disfrutando en la playa',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'traje_bano_hombre', nombre: 'Traje de bano hombre', descripcion: 'mens swimwear, swim trunks' },
      'persona.expresion': { id: 'relajado', nombre: 'Relajado/a', descripcion: 'relaxed, calm expression' },
      'persona.pose': { id: 'caminando', nombre: 'Caminando', descripcion: 'walking' },
      'persona.profesion': null,
      'persona.hombre.rasgos': { id: 'musculoso', nombre: 'Musculoso', descripcion: 'muscular build, defined muscles' }
    },
    escenario: {
      'escenario.lugares': { id: 'playa_tropical', nombre: 'Playa tropical', descripcion: 'tropical beach, paradise beach' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'pareja_romantica',
    nombre: 'Pareja romántica',
    categoria: 'lifestyle',
    icono: '💑',
    descripcion: 'Pareja en momento romántico',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'vestido_verano', nombre: 'Vestido de verano', descripcion: 'sundress, summer dress' },
      'persona.expresion': { id: 'feliz', nombre: 'Feliz', descripcion: 'happy, joyful expression' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': null,
      'persona.mujer.rasgos': { id: 'cabello_largo', nombre: 'Cabello largo', descripcion: 'long hair' }
    },
    escenario: {
      'escenario.lugares': { id: 'playa_atardecer', nombre: 'Playa al atardecer', descripcion: 'beach at sunset' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'nomada_digital',
    nombre: 'Nómada digital',
    categoria: 'lifestyle',
    icono: '🌍',
    descripcion: 'Trabajador remoto en ambiente relajado',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'smart_casual', nombre: 'Smart casual', descripcion: 'smart casual attire' },
      'persona.expresion': { id: 'concentrado', nombre: 'Concentrado/a', descripcion: 'focused, concentrated' },
      'persona.pose': { id: 'con_laptop', nombre: 'Con laptop', descripcion: 'with laptop, using computer' },
      'persona.profesion': { id: 'nomada_digital', nombre: 'Nomada digital', descripcion: 'digital nomad' },
      'persona.hombre.rasgos': { id: 'barba_tres_dias', nombre: 'Barba de 3 días', descripcion: 'stubble, 3-day beard' }
    },
    escenario: {
      'escenario.lugares': { id: 'cafeteria', nombre: 'Cafeteria', descripcion: 'cozy coffee shop, cafe' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },

  // CREATIVOS
  {
    id: 'fotografo_estudio',
    nombre: 'Fotógrafo en estudio',
    categoria: 'creativos',
    icono: '📸',
    descripcion: 'Fotógrafo profesional trabajando',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'casual', nombre: 'Casual', descripcion: 'casual clothing, relaxed outfit' },
      'persona.expresion': { id: 'concentrado', nombre: 'Concentrado/a', descripcion: 'focused, concentrated' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': { id: 'fotografo', nombre: 'Fotografo/a', descripcion: 'photographer' },
      'persona.hombre.rasgos': { id: 'barba_corta', nombre: 'Barba corta', descripcion: 'short beard' }
    },
    escenario: {
      'escenario.lugares': { id: 'estudio', nombre: 'Estudio fotografico', descripcion: 'professional photo studio' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'artista_taller',
    nombre: 'Artista en taller',
    categoria: 'creativos',
    icono: '🎨',
    descripcion: 'Artista pintando en su estudio',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'bohemio', nombre: 'Bohemio', descripcion: 'bohemian boho style' },
      'persona.expresion': { id: 'absorto', nombre: 'Absorto/a', descripcion: 'absorbed, engrossed' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': { id: 'pintor', nombre: 'Pintor/a', descripcion: 'painter, artist' },
      'persona.mujer.rasgos': { id: 'cabello_rizado', nombre: 'Cabello rizado', descripcion: 'curly hair' }
    },
    escenario: {
      'escenario.lugares': { id: 'galeria_arte', nombre: 'Galeria de arte', descripcion: 'art gallery' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'musico_escenario',
    nombre: 'Músico en escenario',
    categoria: 'creativos',
    icono: '🎸',
    descripcion: 'Músico tocando en vivo',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'rock', nombre: 'Rock', descripcion: 'rock style, band tees, leather' },
      'persona.expresion': { id: 'apasionado', nombre: 'Apasionado/a', descripcion: 'passionate expression' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': { id: 'musico', nombre: 'Musico/a', descripcion: 'musician' },
      'persona.hombre.rasgos': { id: 'tatuajes_brazos', nombre: 'Tatuajes en brazos', descripcion: 'arm tattoos, sleeve tattoos' }
    },
    escenario: {
      'escenario.lugares': { id: 'escenario', nombre: 'Escenario', descripcion: 'stage, performance stage' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'modelo_editorial',
    nombre: 'Modelo editorial',
    categoria: 'creativos',
    icono: '👗',
    descripcion: 'Modelo en sesión de moda',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'alta_costura', nombre: 'Alta costura', descripcion: 'haute couture, designer fashion' },
      'persona.expresion': { id: 'misterioso', nombre: 'Misterioso/a', descripcion: 'mysterious expression, enigmatic' },
      'persona.pose': { id: 'pose_editorial', nombre: 'Pose editorial', descripcion: 'editorial pose, magazine pose' },
      'persona.profesion': { id: 'modelo', nombre: 'Modelo', descripcion: 'fashion model' },
      'persona.mujer.rasgos': { id: 'pomulos_altos', nombre: 'Pómulos altos', descripcion: 'high cheekbones' }
    },
    escenario: {
      'escenario.lugares': { id: 'estudio_blanco', nombre: 'Estudio fondo blanco', descripcion: 'white backdrop studio, white seamless background' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },

  // FITNESS
  {
    id: 'entrenador_gym',
    nombre: 'Entrenador en gimnasio',
    categoria: 'fitness',
    icono: '🏋️',
    descripcion: 'Personal trainer en acción',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'gym', nombre: 'Ropa de gym', descripcion: 'gym clothes, workout attire' },
      'persona.expresion': { id: 'determinado', nombre: 'Determinado/a', descripcion: 'determined expression' },
      'persona.pose': { id: 'pose_pesas', nombre: 'Levantando pesas', descripcion: 'lifting weights' },
      'persona.profesion': { id: 'instructor_fitness', nombre: 'Instructor/a de fitness', descripcion: 'fitness instructor' },
      'persona.hombre.rasgos': { id: 'musculoso', nombre: 'Musculoso', descripcion: 'muscular build, defined muscles' }
    },
    escenario: {
      'escenario.lugares': { id: 'gimnasio_moderno', nombre: 'Gimnasio moderno', descripcion: 'modern gym, luxury gym' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'yogui_estudio',
    nombre: 'Instructora de yoga',
    categoria: 'fitness',
    icono: '🧘',
    descripcion: 'Instructora de yoga en sesión',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'yoga', nombre: 'Ropa de yoga', descripcion: 'yoga clothes, yoga pants' },
      'persona.expresion': { id: 'sereno', nombre: 'Sereno/a', descripcion: 'serene, tranquil' },
      'persona.pose': { id: 'pose_yoga', nombre: 'Pose de yoga', descripcion: 'yoga pose' },
      'persona.profesion': { id: 'instructor_yoga', nombre: 'Instructor/a de yoga', descripcion: 'yoga instructor' },
      'persona.mujer.rasgos': { id: 'aspecto_natural', nombre: 'Aspecto natural', descripcion: 'natural effortless look' }
    },
    escenario: {
      'escenario.lugares': { id: 'estudio_yoga', nombre: 'Estudio de yoga', descripcion: 'yoga studio' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'runner_exterior',
    nombre: 'Runner al aire libre',
    categoria: 'fitness',
    icono: '🏃',
    descripcion: 'Corredor en ambiente natural',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'running', nombre: 'Ropa de running', descripcion: 'running clothes, jogging outfit' },
      'persona.expresion': { id: 'determinado', nombre: 'Determinado/a', descripcion: 'determined expression' },
      'persona.pose': { id: 'corriendo', nombre: 'Corriendo', descripcion: 'running' },
      'persona.profesion': { id: 'corredor', nombre: 'Corredor/a', descripcion: 'runner, athlete' },
      'persona.mujer.rasgos': { id: 'cola_caballo', nombre: 'Cola de caballo', descripcion: 'ponytail' }
    },
    escenario: {
      'escenario.lugares': { id: 'parque_urbano', nombre: 'Parque urbano', descripcion: 'urban park, city park' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'modelo_fitness',
    nombre: 'Modelo fitness',
    categoria: 'fitness',
    icono: '💪',
    descripcion: 'Modelo fitness posando',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'athleisure', nombre: 'Athleisure', descripcion: 'athleisure, casual athletic' },
      'persona.expresion': { id: 'confiado', nombre: 'Confiado/a', descripcion: 'confident expression' },
      'persona.pose': { id: 'pose_confiada', nombre: 'Pose confiada', descripcion: 'confident pose, assertive stance' },
      'persona.profesion': { id: 'modelo_fitness', nombre: 'Modelo fitness', descripcion: 'fitness model' },
      'persona.hombre.rasgos': { id: 'venas_marcadas', nombre: 'Venas marcadas', descripcion: 'visible veins' }
    },
    escenario: {
      'escenario.lugares': { id: 'estudio_negro', nombre: 'Estudio fondo negro', descripcion: 'black backdrop studio, dark studio' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },

  // GASTRONOMÍA
  {
    id: 'chef_cocina',
    nombre: 'Chef en cocina',
    categoria: 'gastronomia',
    icono: '👨‍🍳',
    descripcion: 'Chef profesional cocinando',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'uniforme_chef', nombre: 'Uniforme de chef', descripcion: 'chef uniform, chef whites' },
      'persona.expresion': { id: 'concentrado', nombre: 'Concentrado/a', descripcion: 'focused, concentrated' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': { id: 'chef', nombre: 'Chef', descripcion: 'chef, professional cook' },
      'persona.hombre.rasgos': { id: 'barba_corta', nombre: 'Barba corta', descripcion: 'short beard' }
    },
    escenario: {
      'escenario.lugares': { id: 'cocina_moderna', nombre: 'Cocina moderna', descripcion: 'modern kitchen, contemporary kitchen' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'barista_cafeteria',
    nombre: 'Barista preparando café',
    categoria: 'gastronomia',
    icono: '☕',
    descripcion: 'Barista profesional trabajando',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'casual', nombre: 'Casual', descripcion: 'casual clothing, relaxed outfit' },
      'persona.expresion': { id: 'sonriente', nombre: 'Sonriente', descripcion: 'smiling, pleasant smile' },
      'persona.pose': { id: 'de_pie_relajado', nombre: 'De pie relajado', descripcion: 'standing relaxed, casual stance' },
      'persona.profesion': { id: 'barista', nombre: 'Barista', descripcion: 'barista' },
      'persona.mujer.rasgos': { id: 'tatuajes_delicados', nombre: 'Tatuajes delicados', descripcion: 'delicate small tattoos' }
    },
    escenario: {
      'escenario.lugares': { id: 'cafeteria', nombre: 'Cafeteria', descripcion: 'cozy coffee shop, cafe' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'sommelier_bar',
    nombre: 'Sommelier en bar',
    categoria: 'gastronomia',
    icono: '🍷',
    descripcion: 'Sommelier catando vino',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'elegante', nombre: 'Elegante', descripcion: 'elegant outfit, sophisticated' },
      'persona.expresion': { id: 'sofisticado', nombre: 'Sofisticado/a', descripcion: 'sophisticated expression' },
      'persona.pose': { id: 'sosteniendo_bebida', nombre: 'Sosteniendo bebida', descripcion: 'holding drink, with beverage' },
      'persona.profesion': { id: 'sommelier', nombre: 'Sommelier', descripcion: 'sommelier, wine expert' },
      'persona.hombre.rasgos': { id: 'aspecto_sofisticado', nombre: 'Aspecto sofisticado', descripcion: 'sophisticated refined appearance' }
    },
    escenario: {
      'escenario.lugares': { id: 'bar', nombre: 'Bar', descripcion: 'bar, lounge bar' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },

  // COTIDIANO
  {
    id: 'estudiante_biblioteca',
    nombre: 'Estudiante en biblioteca',
    categoria: 'cotidiano',
    icono: '📚',
    descripcion: 'Estudiante universitario estudiando',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'joven', nombre: 'Joven', descripcion: 'young adult' },
      'persona.vestimenta': { id: 'casual', nombre: 'Casual', descripcion: 'casual clothing, relaxed outfit' },
      'persona.expresion': { id: 'concentrado', nombre: 'Concentrado/a', descripcion: 'focused, concentrated' },
      'persona.pose': { id: 'leyendo', nombre: 'Leyendo', descripcion: 'reading, with book' },
      'persona.profesion': { id: 'estudiante_universitario', nombre: 'Estudiante universitario', descripcion: 'college student, university student' },
      'persona.mujer.rasgos': { id: 'lentes', nombre: 'Lentes/Gafas', descripcion: 'wearing glasses' }
    },
    escenario: {
      'escenario.lugares': { id: 'biblioteca', nombre: 'Biblioteca', descripcion: 'library' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'familia_parque',
    nombre: 'Familia en parque',
    categoria: 'cotidiano',
    icono: '👨‍👩‍👧',
    descripcion: 'Familia disfrutando al aire libre',
    persona: {
      'persona.sexo': { id: 'mujer', nombre: 'Mujer', descripcion: 'woman' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'casual', nombre: 'Casual', descripcion: 'casual clothing, relaxed outfit' },
      'persona.expresion': { id: 'feliz', nombre: 'Feliz', descripcion: 'happy, joyful expression' },
      'persona.pose': { id: 'caminando', nombre: 'Caminando', descripcion: 'walking' },
      'persona.profesion': null,
      'persona.mujer.rasgos': { id: 'cabello_ondulado', nombre: 'Cabello ondulado', descripcion: 'wavy hair' }
    },
    escenario: {
      'escenario.lugares': { id: 'parque', nombre: 'Parque', descripcion: 'outdoor park with trees' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'profesional_home_office',
    nombre: 'Home office',
    categoria: 'cotidiano',
    icono: '🏠',
    descripcion: 'Trabajando desde casa',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'adulto', nombre: 'Adulto/a', descripcion: 'adult' },
      'persona.vestimenta': { id: 'smart_casual', nombre: 'Smart casual', descripcion: 'smart casual attire' },
      'persona.expresion': { id: 'concentrado', nombre: 'Concentrado/a', descripcion: 'focused, concentrated' },
      'persona.pose': { id: 'con_laptop', nombre: 'Con laptop', descripcion: 'with laptop, using computer' },
      'persona.profesion': { id: 'freelancer', nombre: 'Freelancer', descripcion: 'freelancer, independent worker' },
      'persona.hombre.rasgos': { id: 'lentes', nombre: 'Lentes/Gafas', descripcion: 'wearing glasses' }
    },
    escenario: {
      'escenario.lugares': { id: 'estudio_casa', nombre: 'Estudio/Oficina en casa', descripcion: 'home office, study room' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  },
  {
    id: 'jubilado_jardin',
    nombre: 'Jubilado en jardín',
    categoria: 'cotidiano',
    icono: '👴',
    descripcion: 'Persona mayor disfrutando su jardín',
    persona: {
      'persona.sexo': { id: 'hombre', nombre: 'Hombre', descripcion: 'man' },
      'persona.edad': { id: 'mayor', nombre: 'Mayor', descripcion: 'elderly' },
      'persona.vestimenta': { id: 'casual', nombre: 'Casual', descripcion: 'casual clothing, relaxed outfit' },
      'persona.expresion': { id: 'tranquilo', nombre: 'Tranquilo/a', descripcion: 'calm, peaceful expression' },
      'persona.pose': { id: 'sentado_relajado', nombre: 'Sentado casual', descripcion: 'sitting casually, relaxed seated' },
      'persona.profesion': { id: 'jubilado', nombre: 'Jubilado/a', descripcion: 'retired person' },
      'persona.hombre.rasgos': { id: 'cabello_canoso', nombre: 'Cabello completamente canoso', descripcion: 'fully gray/silver hair' }
    },
    escenario: {
      'escenario.lugares': { id: 'jardin_casa', nombre: 'Jardin de casa', descripcion: 'home garden, backyard' },
      'escenario.ambientes': null,
      'escenario.fondos': null,
      'escenario.props': null,
      'escenario.estilos_foto': null,
      'escenario.calidades': null,
      'escenario.aspect_ratios': null,
      'escenario.exclusiones': null,
      'escenario.plataformas': null,
      'escenario.tipos_referencia': null
    }
  }
]
