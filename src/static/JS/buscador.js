
function buscador() {
  const divcate = document.getElementById('tabla');
  const ids = document.getElementById('buscar');
  axios.post('buscador', {
    buscar: ids.value


  })
    .then(function (response) {
      let datos = response.data
      if (!datos || Object.keys(datos).length === 0) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: '¡Usted No Debe Planas!',
          showConfirmButton: false,
          timer: 2000,          
      })
      document.getElementById('buscar').value = '';
       
      }
      var length = (Object.keys(datos).length) + 1;
      let mostrar = '';
      i = 0
      for (let index = 1; index < length; index++) {
        mostrar += `<tr>
        <td>${datos[index].nombre}</td>
        <td>${datos[index].apellido}</td>
        <td>${datos[index].Planas}</td>
        <td>${datos[index].Motivo}</td>
        <td>${datos[index].FechaInicio}</td>

      </tr>`;

      }
      divcate.innerHTML = mostrar
    })

    .catch(function (error) {
      console.log(error);
         
    });
}
