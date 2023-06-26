function guardar() {
  const nombres = document.getElementById('nombre');
  const Apellidos = document.getElementById('Apellido')
  const cursos = document.getElementById('curso');
  const Nfichas = document.getElementById('Nficha');
  const documento = document.getElementById('documento');







  axios
    .post(
      'guardar',
      {
        nombre: nombres.value,
        apellido: Apellidos.value,
        curso: cursos.value,
        Nficha: Nfichas.value,
        documento: documento.value,
     



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
          title: 'El aprendiz ya existe ya fue registrado ',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Mostrar la alerta de éxito
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: '¡Paciente Registrado Exitosamente!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

