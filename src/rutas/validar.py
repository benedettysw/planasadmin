from bd import db
from flask import Blueprint, request, session , jsonify
from Model.validar import validar
from werkzeug.security import check_password_hash




routes_validar= Blueprint("routes_validar", __name__)





@routes_validar.route('/login', methods=['POST'])

def login():
    
    usuario = request.json["Ndocumento"]
    clave = request.json["contraseña"]
    

    verificacion = db.session.query(validar).filter(validar.correo == usuario , validar.contraseña == clave).first()
    
    if verificacion:
        id = verificacion.id
        nombre = verificacion.Nombre
        
        print(id)
        
        
        session ["id_usuario"] = id
        session ["id_nombre"] = nombre
        
        #el que esta dentro de los brakest
        
        
        
        return {"status": "Correcto"  , "id_usuario" : nombre}
    else:
        return {"status": "Error", "message": "Usuario o contraseña incorrectos"}




