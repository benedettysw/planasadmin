let divcate = document.getElementById('tabla');
function mostrar() {
  axios.get('mostrar', {
    responseType: 'json'
  })
    .then(function (response) {
      let datos = response.data
      var length = (Object.keys(datos).length) + 1;
      let mostrar = '';
     
      for (let index = 1; index < length; index++) {
        mostrar += ` <tr>   
                <td >${datos[index].id} </td>
                <td>${datos[index].nombre}  </td>
                <td>${datos[index].apellido}  </td> 
                <td>${datos[index].Planas}  </td> 
                <td>${datos[index].Motivo}  </td> 
                <td>${datos[index].Estado}  </td> 
                <td>${datos[index].FechaInicio}  </td> 
                <td> <button class="btn-ps" onclick="castigo(${datos[index].id})">Listo</button></td> 
              </tr> `;

      }
      divcate.innerHTML = mostrar
    })
    .catch(function (error) {
      // Maneja los errores aquí
      console.log(error);
    });
}
window.addEventListener('load', function () {
  mostrar();
})




// ELIMINAR EL CASTIGO DE LOS APRENDICES OSEA EL BOTON LISTO
function castigo(id) {
  Swal.fire({
    title: '¿Desea levantar el castigo ha este aprendiz?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'red',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '¡Castigo levantado con exito!',
        icon: 'success'
    })
      axios.post('eliminar', {
        id_a: id
      })
        .then(function (response) {
          console.log(response);
          mostrar();
        })
    } else {
      Swal.fire({
        title: '¡Proceso cancelado!',
        icon: 'error'
      })
    }
  })
    .catch(function (error) {
      console.log(error);
    });
}




///buscardorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
function searchTable() {
  var input = document.getElementById("buscar").value.toUpperCase();

  var table = document.getElementById("tabla");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var match = false;
    for (var j = 0; j < cells.length; j++) {
      if (cells[j].innerHTML.toUpperCase().indexOf(input) > -1) {
        match = true;
        break;
      }
    }
    if (match) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}
