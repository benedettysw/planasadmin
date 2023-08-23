from bd import db
from flask import Blueprint, request, session , redirect ,  render_template , jsonify
from Model.validar import validar
from Model.registro import registross
from werkzeug.security import check_password_hash



routes_validar= Blueprint("routes_validar", __name__)




@routes_validar.route('/login', methods=['POST'])
def login():
    usuario = request.json["Ndocumento"]
    contraseña = request.json["contraseña"]
    verificacion = db.session.query(validar).filter(validar.correo == usuario).first()

    if verificacion:
        admin_id = verificacion.id  # Obtener el ID del administrador alalalaa
        admin_nombre = verificacion.Nombre  # Obtener el nombre del administrador

        if check_password_hash(verificacion.contraseña , contraseña):
            session["admin_id"] = admin_id  # Guardar el admin_id en la sesión
            session["admin_nombre"] = admin_nombre  # Guardar el nombre del administrador en la sesión
            print(admin_id)

            return {
                "status": "Correcto",
                "message": "Inicio de sesión exitoso",
                "admin_nombre": admin_nombre  # Incluir el nombre del administrador en la respuesta
            }
        else:
            return {"status": "Error", "message": "Contraseña incorrecta"}
    else:
        return {"status": "Error", "message": "Correo incorrecto"}





#ALERTA QUE MUESTRA EL INSTRUTOR QUE ENTRO
@routes_validar.route('/obtener_datos_sesion')
def obtener_datos_sesion():
    admin_id = session.get('admin_id')
    Nombre = session.get('admin_nombre')
    return jsonify({'adminId': admin_id, 'Nombre': Nombre})

