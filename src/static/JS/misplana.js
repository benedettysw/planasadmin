let divcate = document.getElementById('tabla');
let i = 0;
function mostrar() {
   axios.get('mostrar', {
      responseType: 'json'
        // id: s.value
       // const s = document.getElementById('id');
       
    }) 
      .then(function (response) {
            let datos = response.data
            var length = (Object.keys(datos).length) + 1;
            let mostrar = '';
            i= 0
            for (let index = 1; index < length; index++) {
                mostrar += ` <tr>   
                <td id= "${i}">${datos[index].id} </td>
                <td>${datos[index].nombre}  </td>
                <td>${datos[index].apellido}  </td> 
                <td>${datos[index].Planas}  </td> 
                <td>${datos[index].Motivo}  </td> 
              </tr> `;
                
            }
            divcate.innerHTML = mostrar        
      })
      .catch(function (error) {
        // Maneja los errores aquí
        console.log(error);
      });
  }
window.addEventListener('load', function() {
    mostrar();
})


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
