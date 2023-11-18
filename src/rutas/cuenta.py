from bd import db
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from Model.validar import validar


routes_cuenta = Blueprint("routes_cuenta", __name__)



@routes_cuenta.route('/perfil', methods=['POST'])
def cuenta():
    nombre = request.form['nombre']
    correos = request.form['correo']
    clave = request.form['clave']
    clave2 = request.form['clave2']

    # Verificar si el correo ya está registrado
    aprendiz_existente = db.session.query(validar).filter(validar.correo == correos).first()

    if aprendiz_existente:                
        return "Aprendiz existente en la bd"

    new_section = validar(nombre, correos, clave, clave2)
    db.session.add(new_section)
    db.session.commit()
    
    if new_section:
        admin_id1 = new_section.id
        nombre_id2 = new_section.Nombre
        session["id_usuario"] = admin_id1
        session["id_nombre"] = nombre_id2

    return "ok"
    

  



# 


