function habilitar() {
    nom = document.getElementById("nombre").value;
    ape = document.getElementById("Apellido").value;
    cur = document.getElementById("curso").value;
    nfi = document.getElementById("Nficha").value;
    ndo = document.getElementById("documento").value;

    val = 0;

    if (nom == "") {
        val++;
    }
    if (ape == "") {
        val++;
    }
    if (cur == "") {
        val++;
    }
    if (nfi == "") {
        val++;
    }
    if (ndo == "") {
        val++;
    } if (val == 0) {
        document.getElementById("btn").disabled = false;
    } else {
        document.getElementById("btn").disabled = true;
    }
}
document.getElementById("nombre").addEventListener("keyup", habilitar);
document.getElementById("Apellido").addEventListener("keyup", habilitar);
document.getElementById("curso").addEventListener("keyup", habilitar);
document.getElementById("Nficha").addEventListener("keyup", habilitar);
document.getElementById("documento").addEventListener("keyup", habilitar);
document.getElementById("btn").addEventListener("click", () => {
    
    document.getElementById("nombre").value = "";
    document.getElementById("Apellido").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("Nficha").value = "";
    document.getElementById("documento").value = "";
});
