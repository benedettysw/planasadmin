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




// //LO NUEVO OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

// var recuperar = document.querySelector('.modal');
// recuperar.addEventListener('click', function (event) {
//     if (event.target === recuperar) {
//         recuperar.style.display = 'none';
//     }
//   });

  
function modalclave() { 
    recuperar.style.display = 'block';
  }




  function verificarEmail() {
    const gmail = document.getElementById('correo').value;
    const buscars = document.getElementById('buscar');
  
    axios.post('verificarcorreo', {
      gmails: gmail,
    })
      .then(function (response) {
        if (response.data.message === 'Correo válido') {
          correoValido = gmail;
          enviarcodigo();
          document.getElementById('campoAdicional').style.display = 'block';
          buscars.style.display = 'none';
          document.getElementById('mensaje-error').style.display = 'none';


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
  

  
  
// MODAL DE LA CLAVE



    // function restablecerclave() {
    //   const passwordnueva = document.getElementById("clavenueva").value;
    //   const passwordnueva1 = document.getElementById("confrimaclave").value;
    
    //   if (passwordnueva === "" || passwordnueva1 === "") {
    //     alert("Por favor, completa todos los campos.");
    //     return;
    //   }
    
    //   if (passwordnueva !== passwordnueva1) {
    //     alert("Las contraseñas no coinciden. Por favor, verifica nuevamente.");
    //     return;
    //   }
    
    //   axios
    //     .post('actualizarpass', {
    //       correo: correoValido,
    //       passwordnew: passwordnueva,
    //       passwordnew1: passwordnueva1
    //     })
    //     .then(function (response) {
    //       // Manejar la respuesta del servidor en caso de éxito
    //       alert("Contraseña actualizada exitosamente.");
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       alert("Error al actualizar la contraseña. Por favor, intenta nuevamente.");
    //     });
    // }
    

    function restablecerclave() {
      const passwordnueva = document.getElementById("clavenueva");
      const passwordnueva1 = document.getElementById("confrimaclave");
      // console.log(passwordnueva)
      // console.log(passwordnueva1)
    
    
      axios
        .post('actualizarpass', {
          correo: correoValido.value,
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
    }
    