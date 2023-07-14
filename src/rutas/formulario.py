from bd import db
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from Model.registro import registross


routes_formulario = Blueprint("routes_section", __name__)



@routes_formulario.route('/guardar', methods=['POST'])
def saveSection():
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    curso = request.form['curso']
    Nficha = request.form['Nficha']
    documento = request.form['documento']
    foto = request.files.get('imagen')  # Utiliza request.files.get() en lugar de request.files[]
    imagen_data = foto.read()

    id_admin = session.get('admin_id') 
    print(id_admin)  # Obtener el ID del administrador actualmente logueado
    
    existing_patient = registross.query.filter(
        (registross.Nficha == Nficha) | (registross.Ndocumento == documento)
    ).first()
    if existing_patient:
        return "Aprendiz existente en la bd"

    new_section = registross(nombre, apellido, curso, Nficha, documento, imagen_data, id_admin)
    db.session.add(new_section)
    db.session.commit()
    return "ok"
