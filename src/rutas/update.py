from bd import db
from flask import Blueprint, request, jsonify,session
from Model.registro import registross
from Model.plana import planass




routes_mostrar = Blueprint("routes_listcategory", __name__)




#SHOW EN LA TABLA 


@routes_mostrar.route('/mostrars', methods=['GET'])
def viewlistcategor():
    datos= {}
    id_admin=session.get('admin_id')
    resultado = db.session.query(registross).select_from(registross).filter(registross.id_admin == id_admin).all()
    print(resultado)
    # resultado = "select * from planass"
    i=0
    goria = []
    for cate in resultado:
        i+=1	       
        datos[i] = {
        'id':cate.id,
		'nombre':cate.nombre,
		'apellido':cate.apellido,                   
		'curso':cate.curso,         #numero de documento                          
		'Nficha':cate.Nficha,                                    
		'Ndocumento':cate.Ndocumento,                                    
        }
        goria.append(datos)
        
    return jsonify(datos)



@routes_mostrar.route('/castigoss', methods=['POST'])
def castigo():
    Planas = request.form['plana']
    Motivo = request.form['motivo']
    estado = request.form['estado']
    FechaInicio = request.form['finicio']
    Id_Aprendiz = request.form['ide']
    print(estado)

    new_section = planass(Planas, Motivo, estado, FechaInicio, Id_Aprendiz)
    db.session.add(new_section)
    db.session.commit()
    return "ok"






@routes_mostrar.route('/delete', methods=['POST'] )
def eliminarregistross():
    id_a = request.json['ids']
    Id_Aprendiz = registross.query.get(id_a)
    if Id_Aprendiz:
        db.session.delete(Id_Aprendiz)
        db.session.commit()
        return jsonify({'message': 'Registro eliminado' }) 
    else:
        return jsonify({'message': 'Registro  no eliminado' }) 
    









    
@routes_mostrar.route('/actualizar', methods=['POST'] )
def actualiza():
    id = request.form.get('id')
    nombre = request.form.get('nombre')
    apellido = request.form.get('apellido')
    curso = request.form.get('curso')
    Nficha = request.form.get('Nficha')
    Ndocumento = request.form.get('documento')


    paciente = registross.query.get(id)
    paciente.nombre = nombre
    paciente.apellido = apellido
    paciente.curso = curso
    paciente.Nficha = Nficha
    paciente.Ndocumento = Ndocumento

    # Guardar los cambios en la base de datos
    db.session.commit()
      
    # Enviar una respuesta exitosa
    return jsonify({'message': 'Datos actualizados correctamente'})

