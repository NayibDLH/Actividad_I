import { useEffect, useState } from 'react'
import './App.css'
import {firebase} from './firebase'

function App() {
  const [Lista, setLista] = useState([])
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')  
  const [id, setId] = useState('')
  const [error, setError] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  useEffect(() => {
    const obtenerDatos=async() => {
      try{
        const db = firebase.firestore()
        const data = await db.collection("Usuarios").get()
        const arrayData = data.docs.map(doc => ({id:doc.id,...doc.data()}))
        setLista(arrayData)
       } catch (error) {
        console.log(error);
        
      }
    }
  obtenerDatos()
  },[])
/* Guardar */
  const guardarDatos=async(e)=>{
    e.preventDefault()
    if(!nombre.trim()) return alert("Falta el Nombre")
    if(!apellido.trim()) return alert("Falta el Apellido")
      try{
        const db = firebase.firestore()
        const nuevoUsuario = {nombre, apellido}
        const dato = await db.collection("Usuarios").add(nuevoUsuario)
        setLista([
          ...Lista,
          {id:dato.id,...nuevoUsuario}
        ])
      }catch(error){
        console.log(error);
        
      }
      
    }
    /* Eliminar */
    const eliminarDato =async(id)=>{
      try{
      const db = firebase.firestore()
      await db.collection("Usuarios").doc(id).delete()
      const listaFiltrada = Lista.filter((item) => item.id !== id )
      setLista(listaFiltrada)
      
    }catch(error){
      console.log(error )
      
    }
    setNombre("")
    setApellido("")
    setId("")
  }  
  
  /* Editar */
  
  const editar = (user) => {
    setModoEdicion(true)
  setNombre(user.nombre)
  setApellido(user.apellido)
  setId(user.id)
}
const editarDatos = async(e) => {
  e.preventDefault()
  if(!nombre.trim()) return alert("Falta el Nombre")
  if(!apellido.trim()) return alert("Falta el Apellido")
      try{
      const db = firebase.firestore()
      await db.collection("Usuarios").doc(id).update({nombre, apellido})
      const listaEditada = Lista.map(user => user.id===id ? {id, nombre, apellido} : user)
      setLista(listaEditada)
      setModoEdicion(false)
      setNombre("")
      setApellido("")
      setId("")
  }catch(error){
    console.log(error)
  }
}
  return (
    <div className= "container">
      <div className ="row">
        <div className="col-12">
           <h1 className="text-center">{modoEdicion ? 'Editando Usuario' : 'Registro de Usuario'}</h1>
        </div>
        <div className="col-12"></div>
           <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
              <input type="text" placeholder='Ingrese su nombre' className="form-control mb-2" onChange={(e)=>setNombre(e.target.value)} value={nombre}/>

              <input type="text" placeholder='Ingrese su apellido' className="form-control mb-2" onChange={(e)=>setApellido(e.target.value)} value={apellido}/>
              <div className="d-grid gap-2">
              {
                modoEdicion ? <button type='submit' className="btn btn-success"> Editar</button> :                 
                              <button type='submit' className="btn btn-primary"> Registrar</button>
              }
              </div>
           </form>
           <div className="col-12">
             <h1 className="text-center"> Usuarios registrados</h1>
           </div>
           <ul className="list-group">
            {
              
              Lista.map(user =>(<li className="list-group-item" key={user.id}>{user.nombre} {user.apellido}
              <button onClick={()=>eliminarDato(user.id)} className="btn btn-outline-danger float-end ">Eliminar</button>
              <button onClick={()=>editar(user)} className="btn btn-outline-warning float-end me-2">Editar</button>
              </li>))
            }
           </ul>
      </div> 
    </div>
  )
}

export default App