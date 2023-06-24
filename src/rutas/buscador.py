from bd import db, app
from flask import Blueprint , jsonify , request ,json 
from Model.registro import registross
from Model.plana import planass




routes_buscador = Blueprint("routes_buscador" , __name__)




@routes_buscador.route('/buscador', methods=['POST'])
def planasalunos():
    id_buscar = request.json["buscar"]
    datos= {}
    resultado = db.session.query(registross, planass).select_from(registross).join(planass).filter(registross.Ndocumento==id_buscar).all()
    i=0
    users = []
    for registrosss, planasss  in resultado:
        i+=1	       
        datos[i] = {
		    'nombre':registrosss.nombre,
		    'apellido':registrosss.apellido, 
            'Planas': planasss.Planas,
            'Motivo': planasss.Motivo,
            'FechaInicio': planasss.FechaInicio,
        }  
        users.append(datos)
    return jsonify(datos)   