function cuenta() {
  const nombres = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const clave = document.getElementById('clave');
  const clave2 = document.getElementById('clave2');

  // Validar campos vacíos
  if (nombres.value.trim() === '' || correo.value.trim() === '' || clave.value.trim() === '' || clave2.value.trim() === '') {
      Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '¡Ingrese todos los campos!',
          showConfirmButton: false,
          timer: 2000,
      });
      return; // Detener la ejecución de la función
  }

  // Validar formato del correo electrónico
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo.value)) {
      Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '¡Ingrese un correo electrónico válido!',
          showConfirmButton: false,
          timer: 2000,
      });
      return; // Detener la ejecución de la función
  }

  // Validar que la clave y la clave2 sean iguales
  if (clave.value !== clave2.value) {
      Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: '¡Las contraseñas no coinciden!',
          showConfirmButton: false,
          timer: 2000,
      });
      return; // Detener la ejecución de la función
  }

  axios
  .post(
    'perfil',
    {
      nombre: nombres.value,
      correo: correo.value,
      clave: clave.value,   
      clave2: clave2.value   
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  .then((res) => {
    console.log(res.data)
    if (res.data === 'Aprendiz existente en la bd') {
      // Mostrar la alerta indicando que el correo ya está registrado
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: '¡Este correo ya está registrado!',
        showConfirmButton: false,
        timer: 2000,
      });
      // Restablecer los campos de entrada
      document.getElementById('nombre').value = "";
      document.getElementById('correo').value = "";
      document.getElementById('clave').value = "";
      document.getElementById('clave2').value = "";
    } else {
      // Mostrar la alerta de éxito
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: '¡Registrado Exitosamente!',
        showConfirmButton: false,
        timer: 2000,
      });
      // Restablecer los campos de entrada
      document.getElementById('nombre').value = "";
      document.getElementById('correo').value = "";
      document.getElementById('clave').value = "";
      document.getElementById('clave2').value = "";
      // Redirigir al usuario a la página /fronted/menu
      setTimeout(function () {
        window.location.href = '/fronted/menu';
      }, 2000);
    }
  })
  .catch((error) => {
    console.error(error)
  });
}



var input = document.getElementById('clave');

var img = document.getElementById('Clave');

img.addEventListener("click", function () {
    if (input.type == "password") {
        input.type = "text"
    } else {
        input.type = "password"
    }
})




var input1 = document.getElementById('clave2');

var img2 = document.getElementById('Clave22');

img2.addEventListener("click", function () {
    if (input1.type == "password") {
        input1.type = "text"
    } else {
        input1.type = "password"
    }
})