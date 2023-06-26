from bd import db
from flask import Blueprint, request, jsonify,session

from Model.validar import validar


routes_admin  = Blueprint("routes_admin", __name__)

#SHOW EN LA TABLA 


@routes_admin .route('/mostrarss', methods=['GET'])
def ewewwe():
    datos= {}
    
    resultado = db.session.query(validar).all()
    print(resultado)
   
    i=0
    goria = []
    for cate in resultado:
        i+=1	       
        datos[i] = {
        'id':cate.id,
		'nombre':cate.Nombre,                                 
		'correo':cate.correo,                                 
		'pass':cate.contraseña,                                 
        }
        goria.append(datos)
        print(goria)
        print(datos)
    return jsonify(datos)