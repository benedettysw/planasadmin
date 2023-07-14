function guardar() {
  const nombres = document.getElementById('nombre').value;
  const Apellidos = document.getElementById('Apellido').value;
  const cursos = document.getElementById('curso').value;
  const Nfichas = document.getElementById('Nficha').value;
  const documento = document.getElementById('documento').value;
  const imagen = document.getElementById('imagen').files[0];

  const formData = new FormData();
  formData.append('nombre', nombres);
  formData.append('apellido', Apellidos);
  formData.append('curso', cursos);
  formData.append('Nficha', Nfichas);
  formData.append('documento', documento);
  formData.append('imagen', imagen);

  axios
    .post('/guardar', formData)
    .then((res) => {
      console.log(res.data);
      if (res.data === 'Aprendiz existente en la bd') {
        // Mostrar la alerta que el aprendiz existe
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'El aprendiz ya existe y fue registrado',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Mostrar la alerta de éxito
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: '¡Aprendiz registrado exitosamente!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
