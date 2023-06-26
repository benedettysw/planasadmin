function mostrar() {
    const divcate = document.getElementById('t');
    axios.get('mostrarss', {
      responseType: 'json'
  
  
    })
       
      .then(function (response) {
        let datos = response.data
        var length = (Object.keys(datos).length) + 1;
        let mostrar = '';
        for (let index = 1; index < length; index++) {
          
          mostrar += ` <tr>
                  <td>${datos[index].id}  </td>  
                  <td>${datos[index].nombre}  </td>
                  <td>${datos[index].correo}  </td>
                  <td>${datos[index].pass}  </td>
                  <td> <button class="btxn" onclick="openModal(${datos[index].id})">Castigo</button> 
                   <button class="btxn1" onclick="openModal2(${datos[index].id}, '${datos[index].nombre}', '${datos[index].apellido}', '${datos[index].curso}', '${datos[index].Nficha}','${datos[index].Ndocumento}')">Actualizar</button> 
                 
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
  
  