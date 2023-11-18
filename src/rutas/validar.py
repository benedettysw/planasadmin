from bd import db
from flask import Blueprint, request, session , redirect ,  render_template , jsonify
from Model.validar import validar
from werkzeug.security import check_password_hash
import logging




routes_validar= Blueprint("routes_validar", __name__)





@routes_validar.route('/login', methods=['POST'])
def login():
    usuario = request.json["Ndocumento"]
    contraseña = request.json["contraseña"]
    
    print(usuario, contraseña)

    verificacion = db.session.query(validar).filter(validar.correo == usuario, validar.contraseña == contraseña).first()
    
    print(verificacion)

    if verificacion:
        # Usuario encontrado, realizar acciones de inicio de sesión
        return {"status": "Correcto"}
    else:
        return {"status": "Error", "message": "Usuario o contraseña incorrectos"}
    
    
    
    
    

#ALERTA QUE MUESTRA EL INSTRUTOR QUE ENTRO
@routes_validar.route('/obtener_datos_sesion')
def obtener_datos_sesion():
    admin_id = session.get('admin_id')
    Nombre = session.get('admin_nombre')
    return jsonify({'adminId': admin_id, 'Nombre': Nombre})

