function Login() {
  const correo = document.getElementById('documento');
  const pass = document.getElementById('Input');

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
    const btnBuscar = document.getElementById('buscar'); // Obtener referencia al botón "Buscar"
  
    axios.post('verificarcorreo', {
      gmails: gmail.value,
    })
      .then(function (response) {
        if (response.data.message === 'Correo válido') {
  
          enviarcodigo();
          setTimeout(function () {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: '¡Se Envio Un Codigo A Su Correo!',
              showConfirmButton: false,
              timer: 3000,
            });
            document.getElementById('campoAdicional').style.display = 'block';
            btnBuscar.style.display = 'none'; // Ocultar el botón "Buscar"
  
            // Llamar a la función restablecerclave() con el ID del usuario
          }, 2000);
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: '¡Correo no registrado!',
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
    const verificarcodigo = document.getElementById('confirma').value;
  
    axios.post('verificarcode', {
      codigo: verificarcodigo,
    })
      .then(function (response) {
        if (response.data.message === 'Código verificado correctamente') {
          setTimeout(function () {
            modalclave1();
            const modalActual = document.getElementById('recuperar');
            modalActual.style.display = 'none';
          });
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: '¡Código no válido!',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  
  
//MODAL DE LA CLAVE

  var clave = document.querySelector('.modal1');
  clave.addEventListener('click', function (event) {
      if (event.target === clave) {
          clave.style.display = 'none';
      }
    });
  
  // Después de mostrar la notificación emergente de éxito en la función verificarEmail()
  
  function modalclave1() { 

      clave.style.display = 'block';
    }


    function restablecerclave() {
      const password = document.getElementById("password").value;
      const password1 = document.getElementById("password1").value;
    
      if (password === "" || password1 === "") {
        alert("Por favor, completa todos los campos.");
        return;
      }
    
      if (password !== password1) {
        alert("Las contraseñas no coinciden. Por favor, verifica nuevamente.");
        return;
      }
    
      axios
        .post('actualizarpass', {
          password: password,
          password1: password1
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
    