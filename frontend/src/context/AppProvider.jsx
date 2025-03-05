import { createContext, useState, useEffect } from "react"; 
import Swal from "sweetalert2";
import axios from "axios";

export const kfeContext = createContext();

const AppProvider = ({ children }) => {
  // Estados de autenticación
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [errorRegister, setErrorRegister] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  // Estado del formulario de registro
  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contraseña: "",
    aceptoTerminos: false,
  });

  // Estados de productos y carrito
  const [producto, setProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [actualizarTotal, setActualizarTotal] = useState(false);

  // Cargar el usuario desde localStorage si hay token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Función para actualizar datos del formulario de registro
  const actualizarUserData = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Función de registro de usuario
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth/register", { name, email, password });
      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire("¡Registro exitoso!", "Tu cuenta ha sido creada.", "success");
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorRegister(error.response?.data?.message || "Error en el registro");
      Swal.fire("Error", "No se pudo completar el registro.", "error");
    }
  };

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire("¡Bienvenido!", "Has iniciado sesión correctamente.", "success");
    } catch (error) {
      setErrorLogin(error.response?.data?.message || "Error al iniciar sesión");
      Swal.fire("Error", "No se pudo iniciar sesión.", "error");
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "info");
  };

  // Función para manejar el envío del formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", userData);
    Swal.fire("¡Cuenta creada!", "Tu cuenta fue creada con éxito.", "success");
  };

 // Lógica para cargar productos
 useEffect(() => {
  getProductos();
}, []);

const getProductos = async () => {
  try {
    const res = await fetch("/bazarKFe_Productos.json");
    if (!res.ok) throw new Error("No se pudo obtener los productos");
    const productos = await res.json();
    setProducto(productos);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};

// Lógica para agregar al carrito
const agregarCarrito = (producto, cantidad) => {
  const productoExistente = carrito.find(
    (prod) => prod.id_producto === producto.id_producto
  );

  if (productoExistente) {
    const updatedCarrito = carrito.map((prod) =>
      prod.id_producto === producto.id_producto
        ? { ...prod, count: prod.count + cantidad }
        : prod
    );
    setCarrito(updatedCarrito);
  } else {
    const nuevoProducto = { ...producto, count: cantidad };
    setCarrito([...carrito, nuevoProducto]);
  }

  setActualizarTotal(true);
};

// Lógica para eliminar del carrito
const eliminarCarrito = (producto) => {
  const productoExistenteIndex = carrito.findIndex(
    (prod) => prod.id_producto === producto.id_producto
  );

  if (productoExistenteIndex >= 0) {
    if (carrito[productoExistenteIndex].count > 1) {
      const updatedCarrito = carrito.map((prod) =>
        prod.id_producto === producto.id_producto
          ? { ...prod, count: prod.count - 1 }
          : prod
      );
      setCarrito(updatedCarrito);
    } else {
      Swal.fire({
        title: "¿Estás seguro de eliminar tu producto?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedCarrito = [...carrito];
          updatedCarrito.splice(productoExistenteIndex, 1);
          setCarrito(updatedCarrito);
          Swal.fire({
            title: "¡Eliminada!",
            text: "Tu producto fue eliminada.",
            icon: "success",
          });
          setActualizarTotal(true);
        }
      });
    }
  }
};

// Cálculo del total a pagar
useEffect(() => {
  if (actualizarTotal) {
    const total = carrito.reduce((acc, producto) => {
      return (
        acc +
        parseFloat(producto.precio.replace("$", "").replace(".", "")) *
          producto.count
      );
    }, 0);
    setTotalAPagar(total);
    setActualizarTotal(false);
  }
}, [actualizarTotal, carrito]);
  

  return (
    <kfeContext.Provider
      value={{
        producto,
        carrito,
        totalAPagar,
        user,
       setUser,
        token,
        register,
        login,
        logout,
        errorRegister,
        errorLogin,
        userData,
        actualizarUserData,
        handleSubmit,
        agregarCarrito,
        eliminarCarrito
      }}
    >
      {children}
    </kfeContext.Provider>
  );
};

export default AppProvider;
