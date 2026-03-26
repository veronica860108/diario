import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { registro } from "./service/backendServices";

export const Registro = () => {


	const navigate = useNavigate()
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
	const [error, setError] = useState("")
	const [user, setUser] = useState({
		nombre: "",
		password: "",
        confirmpassword: ""
	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError("");
		if (!user.nombre.trim() || !user.password.trim() || !user.confirmpassword.trim()) {
			setError("todos los campos son requeridos");
			return;
		}
        if (password !== confirmpassword) {
        setError('Las contraseñas no coinciden');
        return;
        }
		
		const response = await registro(user)
		console.log("este es el response--->",response);
		
		
		if (response.error) {
			setError(response.error)

			return
		}

		navigate("/")

	}



 return (
    <div className="size-full flex items-center justify-center bg-pink-100" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
      <div className="w-full max-w-md p-8 bg-purple-500/30 backdrop-blur-lg rounded-lg shadow-lg border border-purple-300/50">
        <h2 className="mb-6 text-center text-white flex items-center justify-center gap-3">
          Registro
          <button
            type="button"
            // onClick={() => alert('¡Llaves clickeadas!')}
            className="text-3xl hover:scale-110 transition-transform cursor-pointer"
          >
            🔑
          </button>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm text-white">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="contraseña" className="block mb-2 text-sm text-white">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={mostrarContraseña ? 'text' : 'password'}
                id="contraseña"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-12 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800"
              >
                {mostrarContraseña ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmar" className="block mb-2 text-sm text-white">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={mostrarConfirmar ? 'text' : 'password'}
                id="confirmar"
                value={confirmpassword}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-12 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800"
              >
                {mostrarConfirmar ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Registrate
          </button>
        </form>
      </div>
    </div>
  );
}




