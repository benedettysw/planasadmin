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
        // Mostrar la alerta que el aprendiz existente
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Este Dato ya existe ya fue registrado',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Mostrar la alerta de éxito
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: '¡Registrado Exitosamente!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((error) => {
      console.error(error)
    });
}
