function Login() {
  const correo = document.getElementById('documento');
  const pass = document.getElementById('Input');
  console.log(documento) 

  // Validar campos vacíos
  if (correo.value.trim() === '' || pass.value.trim() === '') {
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Ingrese correo y contraseña!',
          showConfirmButton: false,
          timer: 2000
      });
      return; // Detener la ejecución de la función
  }

  axios.post('login', {
      Ndocumento: correo.value,
      contraseña: pass.value 
  })
      .then(function (response) {
          if (response.data.status === 'Correcto') {
              logueo();
              console.log(response);
              setTimeout(function() {
                  // Redireccionar a la página de menú después de 2 segundos
                  window.location.href = '/fronted/menu';
              }, 2000);
          } else {
              Swal.fire({
                  position: 'top-center',
                  icon: 'error',
                  title: '¡Datos inválidos!',
                  showConfirmButton: false,
                  timer: 2000
              });
              document.getElementById('documento').value = "";
              document.getElementById('Input').value = "";
          }
      })
      .catch(function (error) {
          console.log(error);
      });
}



// Este es el ojo que sirve para visualizar la contraseña
// var input = document.getElementById('Input');
// var img = document.getElementById('Clave');

// img.addEventListener("click", function () {
//     if (input.type == "password") {
//         input.type = "text"
//     } else {
//         input.type = "password"
//     }
// })



function logueo() {
    axios.get('obtener_datos_sesion')
        .then(function (response) {
            const datos = response.data;
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Bienvenido ' + datos.Nombre,
                showConfirmButton: false,
                timer: 2000,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}






  let correoId; 

  function verificarEmail() {
    const gmail = document.getElementById('correo').value;
    const buscars = document.getElementById('buscar');
  
    axios.post('verificarcorreo', {
      gmails: gmail,
    })
      .then(function (response) {
        if (response.data.message === 'Correo válido') {
          correoId = response.data.id; // Obtener el ID del correo desde la respuesta
          correoValido = gmail;
          enviarcodigo();
          document.getElementById('campoAdicional').style.display = 'block';
          buscars.style.display = 'none';
          document.getElementById('mensaje-error').style.display = 'none';
  
          // Utilizar el correoId como sea necesario
          console.log('ID del correo registrado:', correoId);
          // Llamar a la función confirmacodigo() y pasar el correoId como argumento
        } else {
          // Mostrar el mensaje de error
          document.getElementById('mensaje-error').style.display = 'block';
          document.getElementById('correo').value = '';
        }
      })
      .catch(function (error) {
        console.log(error);
        // Manejar el error de conexión
        document.getElementById('correo').value = '';
      });
  }
  
  
                                               

  function enviarcodigo() {
    const gmail = document.getElementById('correo');
  
    axios.post('codigo', {
      gmails: gmail.value,
    })
      .then(function (response) {
        // Aquí puedes agregar cualquier otra acción que desees realizar después de enviar el código
      })
      .catch(function (error) {
        console.log(error);
      });
  }





  function confirmacodigo() {
    const verificarcodigos = document.getElementById('verificarcodido').value;
  
    axios.post('verificarcode', {
      codigo: verificarcodigos,
    })
      .then(function (response) {
        if (response.data.message === 'Código verificado correctamente') {
          document.getElementById('mensaje-codigo').style.display = 'none';
          document.getElementById("logocontraseña").style.display = 'block';
          document.getElementById("MensajeClave").style.display = 'block';
          document.getElementById("logolibros").style.display = 'none';
          document.getElementById("Mensajeprimero").style.display = 'none';
          document.getElementById("Nuevaclave").style.display = 'block';
          document.getElementById("campoAdicional").style.display = 'none';
          document.getElementById("correo").style.display = 'none';

        } else {
          document.getElementById('mensaje-codigo').style.display = 'block';
          document.getElementById('verificarcodido').value = '';
          document.getElementById("logocontraseña").style.display = 'none';
          document.getElementById("campoAdicional").style.display = 'block';
          document.getElementById("correo").style.display = 'block';
          document.getElementById("buscar").style.display = 'none';

        }
      })
      .catch(function (error) {
        console.log(error);
      });



  }


  
  function restablecerclave() {
    const passwordnueva = document.getElementById("clavenueva");
    const passwordnueva1 = document.getElementById("confrimaclave");
  
    if (typeof correoId !== 'undefined') {
      axios
        .post('actualizarpass', {
          id: correoId,
          passwordnew: passwordnueva.value,
          passwordnew1: passwordnueva1.value
        })
        .then(function (response) {
          // Manejar la respuesta del servidor en caso de éxito
          alert("Contraseña actualizada exitosamente.");
        })
        .catch(function (error) {
          console.log(error);
          alert("Error al actualizar la contraseña. Por favor, intenta nuevamente.");
        });
    } else {
      alert("No se ha proporcionado un ID de correo válido");
    }
  }
  