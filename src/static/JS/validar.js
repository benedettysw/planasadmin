function Login() {
  const correo = document.getElementById('documento');
  const pass = document.getElementById('Input');

  // Validar campos vacíos
  if (correo.value.trim() === '' || pass.value.trim() === '') {
      Swal.fire({
          position: 'top-center',
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
var input = document.getElementById('Input');
var img = document.getElementById('Clave');

img.addEventListener("click", function () {
    if (input.type == "password") {
        input.type = "text"
    } else {
        input.type = "password"
    }
})



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

var recuperar = document.querySelector('.modal');
recuperar.addEventListener('click', function (event) {
    if (event.target === recuperar) {
        recuperar.style.display = 'none';
    }
  });

  
function modalclave() { 
    
    recuperar.style.display = 'block';
  }






  function verificarEmail() {
    const gmail = document.getElementById('correo');
  
    axios.post('verificarcorreo', {
      gmails: gmail.value,
    })
      .then(function (response) {
        if (response.data === 'a') {
          document.getElementById('campoAdicional').style.display = 'block';
          console.log(response);
          setTimeout(function () {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: '¡Se Envio Un Codigo A Su  Correo!',
              showConfirmButton: false,
              timer: 3000,
            });
           
          },); // Espera 2000 milisegundos (2 segundos) antes de redirigir
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: '¡Correo no válido!',
            showConfirmButton: false,
            timer: 2000,
          });
          document.getElementById('correo').value = '';
        }
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '¡Error de conexión!',
          showConfirmButton: false,
          timer: 2000,
        });
        document.getElementById('correo').value = '';
      });
  }
  
























//   //-------------ESTE ES PARA VERIFICAR EMAIL-------------//
// function verificarEmail() {
//   const Email = document.getElementById('confirma');
  

//   function mostrarAlerta() {
//     Swal.fire({
//       title: "Correo enviado",
//       text: "Se ha enviado un correo con instrucciones para recuperar la contraseña.",
//       icon: "success",
//       confirmButtonText: "Aceptar",
//       customClass: {
//         popup: 'my-custom-class',
//       }
//     }).then(function(result) {
//       formularioCode.style.display = "block";
//       formularioNuevo.style.display = "none";
//     });
//   }

//   function mostrarErrorDemasiadasSolicitudes(timeToWait) {
//     const hours = Math.floor(timeToWait / 3600);
//     const minutes = Math.floor((timeToWait % 3600) / 60);
//     const seconds = Math.floor(timeToWait % 60);

//     Swal.fire({
//       title: "Demasiadas solicitudes",
//       text: `Se han realizado demasiadas solicitudes en un período corto de tiempo. Inténtalo de nuevo en ${hours} hora(s), ${minutes} minuto(s), y ${seconds} segundo(s).`,
//       icon: "error",
//       confirmButtonText: "Reintentar",
//       showCloseButton: true, // Agrega la opción showCloseButton para mostrar el botón de cerrar
//       customClass: {
//         popup: 'my-custom-class',
//       }
//     }).then(function(result) {
//       if (result.isConfirmed) {
//         verificarEmail(); // Llamada recursiva
//       }
//     });
//   }

//   function mostrarError() {
//     Swal.fire({
//       title: "Error",
//       text: "Se ha producido un error al procesar su solicitud. Inténtalo de nuevo más tarde.",
//       icon: "error",
//       confirmButtonText: "Aceptar",
//       customClass: {
//         popup: 'my-custom-class',
//       }
//     });
//   }

//   axios.post('forgotpassword', {
//     fullcorreo: Email.value,
//   })
//   .then(function(response) {
//     mostrarAlerta();
//   })
//   .catch(function(error) {
//     console.log(error);
//     if (error.response.status === 429) {
//       const timeToWait = error.response.data.time_to_wait;
//       mostrarErrorDemasiadasSolicitudes(timeToWait);
//     } else {
//       mostrarError();
//     }
//   });
// };