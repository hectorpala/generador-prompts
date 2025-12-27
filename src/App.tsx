import { useState, useEffect } from 'react'
import { Opcion, PersonasData, EscenariosData, Selecciones } from './types'
import personasDefault from './data/personas.json'
import escenariosDefault from './data/escenarios.json'
import './App.css'

const STORAGE_KEY_PERSONAS = 'generador-prompts-personas'
const STORAGE_KEY_ESCENARIOS = 'generador-prompts-escenarios'

function App() {
  const [personas, setPersonas] = useState<PersonasData>(personasDefault)
  const [escenarios, setEscenarios] = useState<EscenariosData>(escenariosDefault)
  const [selecciones, setSelecciones] = useState<Selecciones>({
    cantidad: null,
    tipo: null,
    estilo: null,
    expresion: null,
    pose: null,
    lugar: null,
    ambiente: null,
    fondo: null,
  })
  const [prompt, setPrompt] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [vistaAdmin, setVistaAdmin] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState<string | null>(null)
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null)
  const [nuevoItem, setNuevoItem] = useState({ nombre: '', descripcion: '' })

  useEffect(() => {
    const personasGuardadas = localStorage.getItem(STORAGE_KEY_PERSONAS)
    const escenariosGuardados = localStorage.getItem(STORAGE_KEY_ESCENARIOS)
    if (personasGuardadas) setPersonas(JSON.parse(personasGuardadas))
    if (escenariosGuardados) setEscenarios(JSON.parse(escenariosGuardados))
  }, [])

  useEffect(() => {
    generarPrompt()
  }, [selecciones])

  const guardarDatos = (newPersonas: PersonasData, newEscenarios: EscenariosData) => {
    localStorage.setItem(STORAGE_KEY_PERSONAS, JSON.stringify(newPersonas))
    localStorage.setItem(STORAGE_KEY_ESCENARIOS, JSON.stringify(newEscenarios))
  }

  const generarPrompt = () => {
    const partes: string[] = []
    
    if (selecciones.cantidad) partes.push(selecciones.cantidad.descripcion)
    if (selecciones.tipo) partes.push(selecciones.tipo.descripcion)
    if (selecciones.estilo) partes.push(selecciones.estilo.descripcion)
    if (selecciones.expresion) partes.push(selecciones.expresion.descripcion)
    if (selecciones.pose) partes.push(selecciones.pose.descripcion)
    if (selecciones.lugar) partes.push('in a ' + selecciones.lugar.descripcion)
    if (selecciones.ambiente) partes.push('with ' + selecciones.ambiente.descripcion)
    if (selecciones.fondo) partes.push(selecciones.fondo.descripcion)

    if (partes.length > 0) {
      setPrompt(partes.join(', ') + ', high quality, professional photography')
    } else {
      setPrompt('')
    }
  }

  const copiarPrompt = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const seleccionar = (cat: keyof Selecciones, opcion: Opcion) => {
    setSelecciones(prev => ({
      ...prev,
      [cat]: prev[cat]?.id === opcion.id ? null : opcion
    }))
  }

  const agregarItem = (categoria: string) => {
    if (!nuevoItem.nombre || !nuevoItem.descripcion) return

    const newId = Date.now().toString()
    const item: Opcion = { id: newId, ...nuevoItem }

    if (['cantidad', 'tipos', 'estilos', 'expresiones', 'poses'].includes(categoria)) {
      const newPersonas = {
        ...personas,
        [categoria]: [...personas[categoria as keyof PersonasData], item]
      }
      setPersonas(newPersonas)
      guardarDatos(newPersonas, escenarios)
    } else {
      const newEscenarios = {
        ...escenarios,
        [categoria]: [...escenarios[categoria as keyof EscenariosData], item]
      }
      setEscenarios(newEscenarios)
      guardarDatos(personas, newEscenarios)
    }

    setNuevoItem({ nombre: '', descripcion: '' })
  }

  const eliminarItem = (categoria: string, id: string) => {
    if (['cantidad', 'tipos', 'estilos', 'expresiones', 'poses'].includes(categoria)) {
      const newPersonas = {
        ...personas,
        [categoria]: personas[categoria as keyof PersonasData].filter(i => i.id !== id)
      }
      setPersonas(newPersonas)
      guardarDatos(newPersonas, escenarios)
    } else {
      const newEscenarios = {
        ...escenarios,
        [categoria]: escenarios[categoria as keyof EscenariosData].filter(i => i.id !== id)
      }
      setEscenarios(newEscenarios)
      guardarDatos(personas, newEscenarios)
    }
  }

  const resetearDatos = () => {
    localStorage.removeItem(STORAGE_KEY_PERSONAS)
    localStorage.removeItem(STORAGE_KEY_ESCENARIOS)
    setPersonas(personasDefault)
    setEscenarios(escenariosDefault)
  }

  const toggleCategoria = (key: string) => {
    setCategoriaAbierta(categoriaAbierta === key ? null : key)
  }

  const getSeleccionTexto = (key: keyof Selecciones) => {
    return selecciones[key]?.nombre || 'Seleccionar...'
  }

  const renderCategoria = (titulo: string, opciones: Opcion[], seleccionKey: keyof Selecciones) => {
    const isOpen = categoriaAbierta === seleccionKey
    const tieneSeleccion = selecciones[seleccionKey] !== null
    
    return (
      <div className={'categoria-acordeon ' + (isOpen ? 'abierta' : '')}>
        <div 
          className={'categoria-header ' + (tieneSeleccion ? 'con-seleccion' : '')}
          onClick={() => toggleCategoria(seleccionKey)}
        >
          <span className="categoria-titulo">{titulo}</span>
          <span className="categoria-valor">{getSeleccionTexto(seleccionKey)}</span>
          <span className="categoria-flecha">▾</span>
        </div>
        {isOpen && (
          <div className="categoria-opciones">
            {opciones.map(opcion => (
              <button
                key={opcion.id}
                className={'opcion ' + (selecciones[seleccionKey]?.id === opcion.id ? 'seleccionada' : '')}
                onClick={() => {
                  seleccionar(seleccionKey, opcion)
                  setCategoriaAbierta(null)
                }}
                title={opcion.descripcion}
              >
                {opcion.nombre}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderEditorCategoria = (titulo: string, categoria: string, opciones: Opcion[]) => (
    <div className="editor-categoria">
      <h4 onClick={() => setCategoriaEditando(categoriaEditando === categoria ? null : categoria)}>
        {titulo} ({opciones.length}) {categoriaEditando === categoria ? 'v' : '>'}
      </h4>
      {categoriaEditando === categoria && (
        <div className="editor-contenido">
          <div className="lista-items">
            {opciones.map(item => (
              <div key={item.id} className="item-editable">
                <span>{item.nombre}</span>
                <small>{item.descripcion}</small>
                <button onClick={() => eliminarItem(categoria, item.id)} className="btn-eliminar">x</button>
              </div>
            ))}
          </div>
          <div className="agregar-item">
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoItem.nombre}
              onChange={e => setNuevoItem(prev => ({ ...prev, nombre: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Descripcion (en ingles)"
              value={nuevoItem.descripcion}
              onChange={e => setNuevoItem(prev => ({ ...prev, descripcion: e.target.value }))}
            />
            <button onClick={() => agregarItem(categoria)} className="btn-agregar">+ Agregar</button>
          </div>
        </div>
      )}
    </div>
  )

  const contarSelecciones = () => {
    return Object.values(selecciones).filter(s => s !== null).length
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
            <div className="grupo-acordeon">
              <h2>Persona</h2>
              {renderCategoria('Cantidad', personas.cantidad, 'cantidad')}
              {renderCategoria('Tipo', personas.tipos, 'tipo')}
              {renderCategoria('Estilo', personas.estilos, 'estilo')}
              {renderCategoria('Expresion', personas.expresiones, 'expresion')}
              {renderCategoria('Pose', personas.poses, 'pose')}
            </div>

            <div className="grupo-acordeon">
              <h2>Escenario</h2>
              {renderCategoria('Lugar', escenarios.lugares, 'lugar')}
              {renderCategoria('Ambiente', escenarios.ambientes, 'ambiente')}
              {renderCategoria('Fondo', escenarios.fondos, 'fondo')}
            </div>
          </div>

          <div className="panel-resultado">
            <div className="resultado-header">
              <h2>Prompt</h2>
              <span className="contador">{contarSelecciones()} selecciones</span>
            </div>
            <div className="prompt-box">
              {prompt || 'Selecciona opciones para generar el prompt...'}
            </div>
            <button 
              className={'btn-copiar ' + (copiado ? 'copiado' : '')}
              onClick={copiarPrompt}
              disabled={!prompt}
            >
              {copiado ? 'Copiado!' : 'Copiar Prompt'}
            </button>
          </div>
        </div>
      ) : (
        <section className="admin">
          <h2>Administrar Opciones</h2>
          <p className="admin-info">Haz clic en una categoria para expandirla y editar sus opciones.</p>
          
          <div className="admin-grupo">
            <h3>Personas</h3>
            {renderEditorCategoria('Cantidad', 'cantidad', personas.cantidad)}
            {renderEditorCategoria('Tipos de persona', 'tipos', personas.tipos)}
            {renderEditorCategoria('Estilos', 'estilos', personas.estilos)}
            {renderEditorCategoria('Expresiones', 'expresiones', personas.expresiones)}
            {renderEditorCategoria('Poses', 'poses', personas.poses)}
          </div>

          <div className="admin-grupo">
            <h3>Escenarios</h3>
            {renderEditorCategoria('Lugares', 'lugares', escenarios.lugares)}
            {renderEditorCategoria('Ambientes', 'ambientes', escenarios.ambientes)}
            {renderEditorCategoria('Fondos', 'fondos', escenarios.fondos)}
          </div>

          <button className="btn-reset" onClick={resetearDatos}>
            Restaurar valores por defecto
          </button>
        </section>
      )}
    </div>
  )
}

export default App
