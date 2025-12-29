import React, { useEffect, useState } from 'react'
import { Categoria, ListasData, Opcion, Selecciones } from './types'
import { catalogo, listasBase } from './data/catalogo'
import { plantillas, categoriaPlantillas, Plantilla } from './data/plantillas'
import './App.css'

const STORAGE_KEY_LISTAS = 'generador-prompts-listas'
const MAX_PERSONAS = 3
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string

async function mejorarPromptConIA(promptActual: string, instrucciones: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('API Key de OpenAI no configurada. Crea un archivo .env con VITE_OPENAI_API_KEY')
  }

  const systemPrompt = `Eres un experto en crear prompts para generación de imágenes con IA (Midjourney, DALL-E, Stable Diffusion).
Tu tarea es mejorar y expandir el prompt dado, haciéndolo más detallado y efectivo para generar imágenes de alta calidad.
Mantén el idioma en inglés. Agrega detalles sobre iluminación, composición, estilo artístico, y calidad cuando sea apropiado.
Responde SOLO con el prompt mejorado, sin explicaciones adicionales.`

  const userMessage = instrucciones
    ? `Mejora este prompt siguiendo estas instrucciones: "${instrucciones}"

Prompt original:
${promptActual}`
    : `Mejora y expande este prompt para generar una imagen más detallada y profesional:

${promptActual}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Error al conectar con OpenAI')
  }

  const data = await response.json()
  return data.choices[0]?.message?.content?.trim() || promptActual
}

const personaSeccion = catalogo.find((seccion) => seccion.id === 'persona')
const escenarioSeccion = catalogo.find((seccion) => seccion.id === 'escenario')
const categoriasPersona = personaSeccion?.categorias || []
const categoriasEscenario = escenarioSeccion?.categorias || []

const collectCategoryIds = (categorias: Categoria[], ids: string[] = []) => {
  categorias.forEach((categoria) => {
    if (categoria.listaId) ids.push(categoria.id)
    if (categoria.children) collectCategoryIds(categoria.children, ids)
    if (categoria.childrenByOptionId) {
      Object.values(categoria.childrenByOptionId).forEach((children) => {
        collectCategoryIds(children, ids)
      })
    }
  })
  return ids
}

const buildInitialSelectionsFromCategorias = (categorias: Categoria[]): Selecciones => {
  const ids = collectCategoryIds(categorias, [])
  return ids.reduce((acc, id) => {
    acc[id] = null
    return acc
  }, {} as Selecciones)
}

const collectPromptParts = (
  categorias: Categoria[],
  selecciones: Selecciones,
  partes: string[]
) => {
  categorias.forEach((categoria) => {
    const seleccion = selecciones[categoria.id]
    if (seleccion && categoria.incluirEnPrompt !== false) {
      const piezas = [categoria.promptPrefix, seleccion.descripcion, categoria.promptSuffix]
        .filter(Boolean)
        .join(' ')
      partes.push(piezas)
    }
    if (categoria.children) collectPromptParts(categoria.children, selecciones, partes)
    if (seleccion && categoria.childrenByOptionId) {
      const children = categoria.childrenByOptionId[seleccion.id] || []
      collectPromptParts(children, selecciones, partes)
    }
  })
}

const collectCategoryIdsFromTree = (categorias: Categoria[]) => {
  return collectCategoryIds(categorias, [])
}

const crearSeleccionesPersonas = () => {
  return Array.from({ length: MAX_PERSONAS }, () => buildInitialSelectionsFromCategorias(categoriasPersona))
}

const crearSeleccionesEscenario = () => {
  return buildInitialSelectionsFromCategorias(categoriasEscenario)
}

function App() {
  const [listas, setListas] = useState<ListasData>(listasBase)
  const [cantidadPersonas, setCantidadPersonas] = useState(1)
  const [personaActiva, setPersonaActiva] = useState(0)
  const [seleccionesPersonas, setSeleccionesPersonas] = useState<Selecciones[]>(() =>
    crearSeleccionesPersonas()
  )
  const [seleccionesEscenario, setSeleccionesEscenario] = useState<Selecciones>(() =>
    crearSeleccionesEscenario()
  )
  const [prompt, setPrompt] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [vistaAdmin, setVistaAdmin] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState<string | null>(null)
  const [categoriasAbiertas, setCategoriasAbiertas] = useState<Record<string, boolean>>({})
  const [busquedas, setBusquedas] = useState<Record<string, string>>({})
  const [nuevoItem, setNuevoItem] = useState<Record<string, { nombre: string; descripcion: string }>>({})
  const [mostrarPlantillas, setMostrarPlantillas] = useState(false)
  const [instruccionesIA, setInstruccionesIA] = useState('')
  const [promptMejorado, setPromptMejorado] = useState('')
  const [cargandoIA, setCargandoIA] = useState(false)
  const [errorIA, setErrorIA] = useState('')
  const [categoriaPlantillaActiva, setCategoriaPlantillaActiva] = useState<string | null>(null)

  useEffect(() => {
    const listasGuardadas = localStorage.getItem(STORAGE_KEY_LISTAS)
    if (listasGuardadas) {
      try {
        const parsed = JSON.parse(listasGuardadas) as ListasData
        setListas({ ...listasBase, ...parsed })
      } catch {
        setListas(listasBase)
      }
    }
  }, [])

  useEffect(() => {
    if (personaActiva > cantidadPersonas - 1) {
      setPersonaActiva(0)
    }
  }, [cantidadPersonas, personaActiva])

  useEffect(() => {
    const segmentos: string[] = []
    const cantidadTexto =
      cantidadPersonas === 1 ? 'one person' : cantidadPersonas === 2 ? 'two people' : 'three people'

    for (let index = 0; index < cantidadPersonas; index += 1) {
      const partesPersona: string[] = []
      collectPromptParts(categoriasPersona, seleccionesPersonas[index], partesPersona)
      if (partesPersona.length > 0) {
        segmentos.push(`Person ${index + 1}: ${partesPersona.join(', ')}`)
      }
    }

    const partesEscenario: string[] = []
    collectPromptParts(categoriasEscenario, seleccionesEscenario, partesEscenario)
    if (partesEscenario.length > 0) {
      segmentos.push(`Scene: ${partesEscenario.join(', ')}`)
    }

    if (segmentos.length > 0) {
      setPrompt([cantidadTexto, ...segmentos].join(' / ') + ', high quality, professional photography')
    } else {
      setPrompt('')
    }
  }, [cantidadPersonas, seleccionesPersonas, seleccionesEscenario])

  const guardarListas = (nuevasListas: ListasData) => {
    localStorage.setItem(STORAGE_KEY_LISTAS, JSON.stringify(nuevasListas))
  }

  const copiarPrompt = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const actualizarSelecciones = (prev: Selecciones, categoria: Categoria, opcion: Opcion) => {
    const siguiente = { ...prev }
    const seleccionActual = prev[categoria.id]
    const nuevaSeleccion = seleccionActual?.id === opcion.id ? null : opcion
    siguiente[categoria.id] = nuevaSeleccion

    if (categoria.childrenByOptionId) {
      const idsParaLimpiar: string[] = []
      if (seleccionActual && seleccionActual.id !== nuevaSeleccion?.id) {
        const hijosPrevios = categoria.childrenByOptionId[seleccionActual.id] || []
        idsParaLimpiar.push(...collectCategoryIdsFromTree(hijosPrevios))
      }
      if (!nuevaSeleccion) {
        Object.values(categoria.childrenByOptionId).forEach((children) => {
          idsParaLimpiar.push(...collectCategoryIdsFromTree(children))
        })
      }
      idsParaLimpiar.forEach((id) => {
        siguiente[id] = null
      })
    }

    return siguiente
  }

  const seleccionarPersona = (index: number, categoria: Categoria, opcion: Opcion) => {
    setSeleccionesPersonas((prev) => {
      const siguiente = [...prev]
      const actuales = prev[index] || buildInitialSelectionsFromCategorias(categoriasPersona)
      siguiente[index] = actualizarSelecciones(actuales, categoria, opcion)
      return siguiente
    })
  }

  const seleccionarEscenario = (categoria: Categoria, opcion: Opcion) => {
    setSeleccionesEscenario((prev) => actualizarSelecciones(prev, categoria, opcion))
  }

  const actualizarNuevoItem = (listaId: string, campo: 'nombre' | 'descripcion', valor: string) => {
    setNuevoItem((prev) => {
      const actual = prev[listaId] || { nombre: '', descripcion: '' }
      return { ...prev, [listaId]: { ...actual, [campo]: valor } }
    })
  }

  const agregarItem = (listaId: string) => {
    const itemActual = nuevoItem[listaId] || { nombre: '', descripcion: '' }
    if (!itemActual.nombre || !itemActual.descripcion) return

    const newItem: Opcion = { id: Date.now().toString(), ...itemActual }
    const nuevasListas = {
      ...listas,
      [listaId]: [...(listas[listaId] || []), newItem]
    }
    setListas(nuevasListas)
    guardarListas(nuevasListas)
    setNuevoItem((prev) => ({ ...prev, [listaId]: { nombre: '', descripcion: '' } }))
  }

  const eliminarItem = (listaId: string, id: string) => {
    const nuevasListas = {
      ...listas,
      [listaId]: (listas[listaId] || []).filter((item) => item.id !== id)
    }
    setListas(nuevasListas)
    guardarListas(nuevasListas)
  }

  const resetearDatos = () => {
    localStorage.removeItem(STORAGE_KEY_LISTAS)
    setListas(listasBase)
    setCantidadPersonas(1)
    setPersonaActiva(0)
    setSeleccionesPersonas(crearSeleccionesPersonas())
    setSeleccionesEscenario(crearSeleccionesEscenario())
    setCategoriasAbiertas({})
    setBusquedas({})
  }

  const aplicarPlantilla = (plantilla: Plantilla) => {
    const nuevasSeleccionesPersona = { ...buildInitialSelectionsFromCategorias(categoriasPersona) }
    Object.entries(plantilla.persona).forEach(([key, value]) => {
      if (value !== null) {
        nuevasSeleccionesPersona[key] = value
      }
    })

    const nuevasSeleccionesEscenario = { ...buildInitialSelectionsFromCategorias(categoriasEscenario) }
    Object.entries(plantilla.escenario).forEach(([key, value]) => {
      if (value !== null) {
        nuevasSeleccionesEscenario[key] = value
      }
    })

    setSeleccionesPersonas((prev) => {
      const siguiente = [...prev]
      siguiente[personaActiva] = nuevasSeleccionesPersona
      return siguiente
    })
    setSeleccionesEscenario(nuevasSeleccionesEscenario)
    setMostrarPlantillas(false)
  }

  const handleMejorarConIA = async () => {
    if (!prompt) return
    setCargandoIA(true)
    setErrorIA('')
    setPromptMejorado('')
    try {
      const resultado = await mejorarPromptConIA(prompt, instruccionesIA)
      setPromptMejorado(resultado)
    } catch (error) {
      setErrorIA(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setCargandoIA(false)
    }
  }

  const copiarPromptMejorado = async () => {
    if (promptMejorado) {
      await navigator.clipboard.writeText(promptMejorado)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const plantillasFiltradas = categoriaPlantillaActiva
    ? plantillas.filter(p => p.categoria === categoriaPlantillaActiva)
    : plantillas


  const toggleCategoria = (id: string) => {
    setCategoriasAbiertas((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getSeleccionTexto = (selecciones: Selecciones, categoriaId: string) => {
    return selecciones[categoriaId]?.nombre || 'Seleccionar...'
  }

  const getOptionNombre = (listaId: string | undefined, opcionId: string) => {
    if (!listaId) return opcionId
    return listas[listaId]?.find((item) => item.id === opcionId)?.nombre || opcionId
  }

  const renderCategoria = (
    categoria: Categoria,
    contexto: {
      selecciones: Selecciones
      onSelect: (categoria: Categoria, opcion: Opcion) => void
      scope: string
    }
  ) => {
    const opciones = categoria.listaId ? listas[categoria.listaId] || [] : []
    const seleccion = contexto.selecciones[categoria.id]
    const scopeKey = `${contexto.scope}:${categoria.id}`
    const isOpen = !!categoriasAbiertas[scopeKey]
    const busqueda = busquedas[scopeKey] || ''
    const busquedaNormalizada = busqueda.trim().toLowerCase()
    const opcionesFiltradas = busquedaNormalizada
      ? opciones.filter((opcion) => {
          return (
            opcion.nombre.toLowerCase().includes(busquedaNormalizada) ||
            opcion.descripcion.toLowerCase().includes(busquedaNormalizada)
          )
        })
      : opciones

    const children: Categoria[] = []
    if (categoria.children) children.push(...categoria.children)
    if (seleccion && categoria.childrenByOptionId) {
      const childrenByOption = categoria.childrenByOptionId[seleccion.id] || []
      children.push(...childrenByOption)
    }

    return (
      <div className={'categoria-acordeon ' + (isOpen ? 'abierta' : '')} key={scopeKey}>
        <div
          className={'categoria-header ' + (seleccion ? 'con-seleccion' : '')}
          onClick={() => toggleCategoria(scopeKey)}
        >
          <span className="categoria-titulo">{categoria.titulo}</span>
          <span className="categoria-valor">{getSeleccionTexto(contexto.selecciones, categoria.id)}</span>
          <span className="categoria-flecha">▾</span>
        </div>
        {isOpen && (
          <div className="categoria-opciones">
            {opciones.length > 0 && (
              <div className="buscador-opciones">
                <input
                  type="text"
                  placeholder={`Buscar en ${categoria.titulo}...`}
                  value={busqueda}
                  onChange={(event) =>
                    setBusquedas((prev) => ({ ...prev, [scopeKey]: event.target.value }))
                  }
                />
              </div>
            )}
            {opciones.length === 0 && (
              <div className="sin-resultados">Sin opciones disponibles.</div>
            )}
            {opciones.length > 0 && opcionesFiltradas.length === 0 && (
              <div className="sin-resultados">Sin resultados para la busqueda.</div>
            )}
            {opcionesFiltradas.length > 0 && (
              <div className="opciones-grid">
                {opcionesFiltradas.map((opcion) => (
                  <button
                    key={opcion.id}
                    className={
                      'opcion ' + (contexto.selecciones[categoria.id]?.id === opcion.id ? 'seleccionada' : '')
                    }
                    onClick={() => contexto.onSelect(categoria, opcion)}
                    title={opcion.descripcion}
                  >
                    {opcion.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {children.length > 0 && (
          <div className="categoria-hijas">
            {children.map((child) => renderCategoria(child, contexto))}
          </div>
        )}
      </div>
    )
  }

  const contarSelecciones = () => {
    const personasContadas = seleccionesPersonas
      .slice(0, cantidadPersonas)
      .reduce((total, seleccionesPersona) => {
        return total + Object.values(seleccionesPersona).filter((seleccion) => seleccion !== null).length
      }, 0)
    const escenarioContado = Object.values(seleccionesEscenario).filter((seleccion) => seleccion !== null)
      .length
    return personasContadas + escenarioContado
  }

  const renderEditorCategoria = (categoriaId: string, titulo: string, listaId: string) => {
    const opciones = listas[listaId] || []
    const itemNuevo = nuevoItem[listaId] || { nombre: '', descripcion: '' }

    return (
      <div className="editor-categoria" key={categoriaId}>
        <h4 onClick={() => setCategoriaEditando(categoriaEditando === categoriaId ? null : categoriaId)}>
          {titulo} ({opciones.length}) {categoriaEditando === categoriaId ? 'v' : '>'}
        </h4>
        {categoriaEditando === categoriaId && (
          <div className="editor-contenido">
            <div className="lista-items">
              {opciones.map((item) => (
                <div key={item.id} className="item-editable">
                  <span>{item.nombre}</span>
                  <small>{item.descripcion}</small>
                  <button
                    onClick={() => eliminarItem(listaId, item.id)}
                    className="btn-eliminar"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="agregar-item">
              <input
                type="text"
                placeholder="Nombre"
                value={itemNuevo.nombre}
                onChange={(event) => actualizarNuevoItem(listaId, 'nombre', event.target.value)}
              />
              <input
                type="text"
                placeholder="Descripcion (en ingles)"
                value={itemNuevo.descripcion}
                onChange={(event) => actualizarNuevoItem(listaId, 'descripcion', event.target.value)}
              />
              <button onClick={() => agregarItem(listaId)} className="btn-agregar">
                + Agregar
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderAdminCategorias = (categorias: Categoria[], path = ''): React.ReactNode[] => {
    const items: React.ReactNode[] = []
    categorias.forEach((categoria) => {
      const titulo = path ? `${path} / ${categoria.titulo}` : categoria.titulo
      if (categoria.listaId) {
        items.push(renderEditorCategoria(categoria.id, titulo, categoria.listaId))
      }
      if (categoria.children) {
        items.push(...renderAdminCategorias(categoria.children, titulo))
      }
      if (categoria.childrenByOptionId) {
        Object.entries(categoria.childrenByOptionId).forEach(([opcionId, children]) => {
          const nombreOpcion = getOptionNombre(categoria.listaId, opcionId)
          const nuevoPath = `${titulo} / ${nombreOpcion}`
          items.push(...renderAdminCategorias(children, nuevoPath))
        })
      }
    })
    return items
  }

  const adminSections = catalogo.map((seccion) => ({
    id: seccion.id,
    titulo: seccion.titulo,
    items: renderAdminCategorias(seccion.categorias)
  }))

  const personaTieneDatos = (index: number) => {
    return Object.values(seleccionesPersonas[index] || {}).some((seleccion) => seleccion !== null)
  }

  return (
    <div className="app">
      <header>
        <h1>Generador de Prompts</h1>
        <button
          className={'btn-admin ' + (vistaAdmin ? 'activo' : '')}
          onClick={() => setVistaAdmin(!vistaAdmin)}
        >
          {vistaAdmin ? 'Volver' : 'Administrar'}
        </button>
      </header>

      {!vistaAdmin ? (
        <div className="contenedor-principal">
          <div className="panel-selecciones">
            {/* Selector de Plantillas */}
            <div className="plantillas-section">
              <button
                className={'btn-plantillas ' + (mostrarPlantillas ? 'activo' : '')}
                onClick={() => setMostrarPlantillas(!mostrarPlantillas)}
              >
                Usar Plantilla
              </button>

              {mostrarPlantillas && (
                <div className="plantillas-panel">
                  <div className="plantillas-categorias">
                    <button
                      className={'plantilla-cat-btn ' + (categoriaPlantillaActiva === null ? 'activo' : '')}
                      onClick={() => setCategoriaPlantillaActiva(null)}
                    >
                      Todas
                    </button>
                    {categoriaPlantillas.map((cat) => (
                      <button
                        key={cat.id}
                        className={'plantilla-cat-btn ' + (categoriaPlantillaActiva === cat.id ? 'activo' : '')}
                        onClick={() => setCategoriaPlantillaActiva(cat.id)}
                      >
                        <span>{cat.icono}</span> {cat.nombre}
                      </button>
                    ))}
                  </div>
                  <div className="plantillas-grid">
                    {plantillasFiltradas.map((plantilla) => (
                      <button
                        key={plantilla.id}
                        className="plantilla-card"
                        onClick={() => aplicarPlantilla(plantilla)}
                        title={plantilla.descripcion}
                      >
                        <span className="plantilla-icono">{plantilla.icono}</span>
                        <span className="plantilla-nombre">{plantilla.nombre}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {personaSeccion && (
              <div className="grupo-acordeon">
                <h2>{personaSeccion.titulo}</h2>
                <div className="selector-cantidad-label">Cantidad de personas</div>
                <div className="selector-cantidad">
                  {[1, 2, 3].map((cantidad) => (
                    <button
                      key={cantidad}
                      className={'btn-cantidad ' + (cantidadPersonas === cantidad ? 'activo' : '')}
                      onClick={() => setCantidadPersonas(cantidad)}
                    >
                      {cantidad}
                    </button>
                  ))}
                </div>
                <div className="tabs-personas">
                  {Array.from({ length: cantidadPersonas }, (_, index) => (
                    <button
                      key={index}
                      className={
                        'tab-persona ' +
                        (personaActiva === index ? 'activo ' : '') +
                        (personaTieneDatos(index) ? 'tiene-datos' : '')
                      }
                      onClick={() => setPersonaActiva(index)}
                    >
                      Persona {index + 1}
                    </button>
                  ))}
                </div>
                {categoriasPersona.map((categoria) =>
                  renderCategoria(categoria, {
                    selecciones:
                      seleccionesPersonas[personaActiva] ||
                      buildInitialSelectionsFromCategorias(categoriasPersona),
                    onSelect: (cat, opcion) => seleccionarPersona(personaActiva, cat, opcion),
                    scope: `persona-${personaActiva}`
                  })
                )}
              </div>
            )}

            {escenarioSeccion && (
              <div className="grupo-acordeon">
                <h2>{escenarioSeccion.titulo}</h2>
                {categoriasEscenario.map((categoria) =>
                  renderCategoria(categoria, {
                    selecciones: seleccionesEscenario,
                    onSelect: seleccionarEscenario,
                    scope: 'escenario'
                  })
                )}
              </div>
            )}
          </div>

          <div className="panel-resultado">
            <div className="resultado-header">
              <h2>Prompt</h2>
              <span className="contador">{contarSelecciones()} selecciones</span>
            </div>
            <div className="prompt-box">{prompt || 'Selecciona opciones para generar el prompt...'}</div>
            <button
              className={'btn-copiar ' + (copiado ? 'copiado' : '')}
              onClick={copiarPrompt}
              disabled={!prompt}
            >
              {copiado ? 'Copiado!' : 'Copiar Prompt'}
            </button>

            <div className="ia-section">
              <h3>Mejorar con IA</h3>
              <textarea
                className="instrucciones-ia"
                placeholder="Instrucciones adicionales (opcional): ej. 'hazlo más cinematográfico', 'agrega más detalles de iluminación'..."
                value={instruccionesIA}
                onChange={(e) => setInstruccionesIA(e.target.value)}
                rows={3}
              />
              <button
                className={'btn-ia ' + (cargandoIA ? 'cargando' : '')}
                onClick={handleMejorarConIA}
                disabled={!prompt || cargandoIA}
              >
                {cargandoIA ? 'Mejorando...' : 'Mejorar con ChatGPT'}
              </button>

              {errorIA && <div className="error-ia">{errorIA}</div>}

              {promptMejorado && (
                <div className="prompt-mejorado">
                  <div className="prompt-mejorado-header">
                    <h4>Prompt Mejorado</h4>
                  </div>
                  <div className="prompt-box mejorado">{promptMejorado}</div>
                  <button
                    className={'btn-copiar ' + (copiado ? 'copiado' : '')}
                    onClick={copiarPromptMejorado}
                  >
                    {copiado ? 'Copiado!' : 'Copiar Prompt Mejorado'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <section className="admin">
          <h2>Administrar Opciones</h2>
          <p className="admin-info">
            Haz clic en una categoria para expandirla y editar sus opciones.
          </p>

          {adminSections.map((seccion) => (
            <div className="admin-grupo" key={seccion.id}>
              <h3>{seccion.titulo}</h3>
              {seccion.items}
            </div>
          ))}

          <button className="btn-reset" onClick={resetearDatos}>
            Restaurar valores por defecto
          </button>
        </section>
      )}
    </div>
  )
}

export default App
