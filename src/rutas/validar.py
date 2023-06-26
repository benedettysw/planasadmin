from bd import db
from flask import Blueprint, request, session , redirect ,  render_template , jsonify
from Model.validar import validar
from Model.registro import registross


routes_validar= Blueprint("routes_validar", __name__)





@routes_validar.route('/login', methods=['POST'])
def login():
    usuario = request.json["Ndocumento"]
    contraseña = request.json["contraseña"]
    verificacion = db.session.query(validar).filter(validar.correo == usuario).first()

    if verificacion:
        admin_id = verificacion.id  # Obtener el ID del administrador
        admin_nombre = verificacion.Nombre  # Obtener el nombre del administrador

        if (verificacion.contraseña == contraseña):
            session["admin_id"] = admin_id  # Guardar el admin_id en la sesión
            session["admin_nombre"] = admin_nombre  # Guardar el nombre del administrador en la sesión
           

            return {"status": "Correcto", "message": "Inicio de sesión exitoso"}
        else:
            return {"status": "Error", "message": "Contraseña incorrecta"}
    else:
        return {"status": "Error", "message": "Correo incorrecto"}
    



# @routes_validar.route("/login", methods=["POST"])
# def login():
  
#     correo = request.json["Ndocumento"]
#     contraseña = request.json["contraseña"]
#     verificacion = db.session.query(validar).filter(validar.correo == correo,validar.contraseña == contraseña,).first()

#     if verificacion:
#         session['admin_id'] = verificacion.id
#         session['Ndocumento'] = verificacion.correo
#         session['Nombre'] = verificacion.Nombre
#         return "a"
    



#ALERTA QUE MUESTRA EL INSTRUTOR QUE ENTRO
@routes_validar.route('/obtener_datos_sesion')
def obtener_datos_sesion():
    admin_id = session.get('admin_id')
    Ndocumento = session.get('Ndocumento')
    Nombre = session.get('Nombre')
    return jsonify({'adminId': admin_id, 'Ndocumento': Ndocumento, 'Nombre': Nombre})





