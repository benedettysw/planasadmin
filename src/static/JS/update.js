function mostrar() {
  const divcate = document.getElementById('tabla');
  axios.get('mostrars', {
    responseType: 'json'


  })
     
    .then(function (response) {
      let datos = response.data
      var length = (Object.keys(datos).length) + 1;
      let mostrar = '';
      for (let index = 1; index < length; index++) {
        
        mostrar += ` <tr">
                <td>${datos[index].id}  </td>  
                <td>${datos[index].nombre}  </td>
                <td>${datos[index].apellido}  </td>
                <td>${datos[index].curso} </td>  
                <td>${datos[index].Nficha}  </td>   
                <td>${datos[index].Ndocumento}  </td>   
                <td> <button class="btxn" onclick="openModal(${datos[index].id})">Castigo</button> 
                 <button class="btxn1" onclick="openModal2(${datos[index].id}, '${datos[index].nombre}', '${datos[index].apellido}', '${datos[index].curso}', '${datos[index].Nficha}','${datos[index].Ndocumento}')">Actualizar</button> 
                 <img title="Eliminara al aprendiz asignado" style="cursor:pointer;" onclick="eliminar(${datos[index].id})" src="https://cdn.icon-icons.com/icons2/1993/PNG/512/bin_delete_file_garbage_recycle_remove_trash_icon_123192.png" >
                 </td>
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







//modals castigo 1111111111111
// Obtén el modal y el botón de cerrar
var modal = document.querySelector('.modal1');
var closeBtn = document.querySelector('.close1');

// Añade un evento click a cualquier parte del modal para cerrarlo también
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});



//Función para abrir el modal CASTIGO 
function openModal(id) {
  const ontide = document.getElementById('id-e')
  ontide.value = id
  modal.style.display = 'block';
}

//////////////(/77777777777777777777777777777777777777777777777777)


var modal12 = document.querySelector('.modal');
var closeBtn = document.querySelector('.close');

// Añade un evento click a cualquier parte del modal12 para cerrarlo también
modal12.addEventListener('click', function (event) {
  if (event.target === modal12) {
    modal12.style.display = 'none';
  }
});








// Función para abrir el modal12
function openModal2(id , nombre, apellido, curso, nficha, ndocumento) {
  const ontide = document.getElementById('id-e1')
  ontide.value = id
  const name = document.getElementById('nombre')
  name.value = nombre
  const ape = document.getElementById('Apellido')
  ape.value = apellido 
  const cur = document.getElementById('curso')
  cur.value = curso 
  const nfi = document.getElementById('Nficha')
  nfi.value = nficha
  const ndo = document.getElementById('documento')
  ndo.value = ndocumento
  modal12.style.display = 'block';
}


//FUNCIÓN PARA ACTUALIZAR LOS DATOS DE LOS APRENDICES

function update() {
  const ontide = document.getElementById('id-e1')
  const name = document.getElementById('nombre');
  const Apellidos = document.getElementById('Apellido')
  const cursos = document.getElementById('curso');
  const Nfichas = document.getElementById('Nficha');
  const documento = document.getElementById('documento');


  axios
    .post(
      'actualizar',
      {
        id: ontide.value,
        nombre: name.value,
        apellido: Apellidos.value,
        curso: cursos.value,
        Nficha: Nfichas.value,
        documento: documento.value


      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((res) => {
      console.log(res.data)
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: '¡Datos Actualizados Exitosamente!',
        showConfirmButton: false,
        timer: 2000,
        
      })
      document.getElementById("nombre").value = "";
      document.getElementById("Apellido").value = "";
      document.getElementById("curso").value = "";
      document.getElementById("Nficha").value = "";
      document.getElementById("documento").value = "";
      mostrar()

    })
    .catch((error) => {
      console.error(error)
      
    })
}















//FUNCIÓN PARA IMPONER LOS DATOS DE LOS APRENDICES

function castigo() {
  const plana = document.getElementById("plana")
  
  const motivo = document.getElementById("motivo")
  const estado = document.getElementById("estado")
  const finicio = document.getElementById("finicio")
  const ontide = document.getElementById('id-e')
  

  axios.post(
    'castigoss',
    {
      plana: plana.value,
      motivo: motivo.value,
      estado: estado.value,
      finicio: finicio.value,
      ide: ontide.value


    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
    .then((res) => {
      console.log(res.data)
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: '¡Castigo impuesto exitosamente!',
        showConfirmButton: false,
        timer: 2000,
      })

      document.getElementById("plana").value = "";
      document.getElementById("motivo").value = "";
      document.getElementById("selector").selectedIndex = -1;
      document.getElementById("finicio").value = "";
    })
    .catch((error) => {
      console.log(error)
    })
}




//FUNCION PARA CERRAR EL MODAL CASTIGO AUTOMATICAMENTE

function validarmodal() {
  // lógica de validación del formulario
  const nombre = document.getElementById("plana").value;
  if (nombre == "") {
    alert("Hacen falta datos")
    return false;
  }

  // si el formulario es válido, cerrar el modal
  document.getElementById("modal1").style.display = "none";

  // evitar que el formulario se envíe si no es válido
  return false;
}



//FUNCION PARA CERRAR EL MODAL DE ACTUALIZAR AUTOMATICAMENTE
function validarmodal1() {
  // lógica de validación del formulario
  const apellido = document.getElementById("Apellido").value;
  if (apellido == "") {
    alert("Hacen falta datos")
    return false;
  }

  // si el formulario es válido, cerrar el modal
  document.getElementById("modalactu2").style.display = "none";

  // evitar que el formulario se envíe si no es válido
  return false;
}







//BUSCADO DE LAS TABLAS 


function searchTable() {
  // Obtiene el valor del campo de búsqueda
  var input = document.getElementById("buscar").value.toUpperCase();

  // Obtiene la tabla y los registros de la misma
  var table = document.getElementById("tabla");
  var rows = table.getElementsByTagName("tr");

  // Itera sobre los registros y los oculta si no coinciden con la búsqueda
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








//ELIMINAR APRENDIZ 


function eliminar(id) {
  axios.post('delete', {
    ids: id
  })
    .then(function (response) {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Aprendiz Eliminado Exitosamente!',
        showConfirmButton: false,
        timer: 3000,
      })
      console.log(response);
      mostrar();
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: '¡Este Aprendiz Debe Plana No Puede Ser Eliminado!',
        showConfirmButton: false,
        timer: 3000,
      })
    });
}