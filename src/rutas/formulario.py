from bd import db
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from Model.registro import registross


routes_formulario = Blueprint("routes_section", __name__)



@routes_formulario.route('/guardar', methods=['POST'])
def saveSection():
    nombre = request.form['nombre']
    apellido = request.form['Apellidos']
    curso = request.form['cursos']
    Nficha = request.form['Nfichas']
    documento = request.form['documento']
    
    print(nombre)

    id_admin = session.get('id_usuario') 
    print(id_admin)
    if id_admin is None:
        return "error # Obtener el ID del administrador actualmente logueado"
    
    existing_patient = registross.query.filter(
        (registross.Nficha == Nficha) | (registross.Ndocumento == documento)
    ).first()
    if existing_patient:
        return "Aprendiz existente en la bd"

    new_section = registross(nombre, apellido, curso, Nficha, documento,  id_admin)
    db.session.add(new_section)
    db.session.commit()
    return "ok"
