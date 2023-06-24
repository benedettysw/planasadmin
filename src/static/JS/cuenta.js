function cuenta() {
    const nombres = document.getElementById('nombre');
    const correo = document.getElementById('correo')
    const clave = document.getElementById('clave');

    axios
      .post(
        'perfil',
        {
          nombre: nombres.value,
          correo: correo.value,
          clave: clave.value   
  
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
            title: 'Este Dato ya existe ya fue registrado ',
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
      })
  }