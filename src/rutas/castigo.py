from bd import db, app, ma
from flask import Blueprint , jsonify , request ,json , session
from Model.registro import registross
from Model.plana import planass
import datetime 
from flask_apscheduler import APScheduler



#EL BLUEPRINT
routes_tablacastigo = Blueprint("routes_tablacastigo ", __name__)




#MUESTRA EL INNER JOIN 
@routes_tablacastigo.route('/mostrar', methods=['GET'])
def mostarcastigo():
    datos= {}
    id_admin=session.get('admin_id')

    resultado = db.session.query(registross, planass).select_from(registross).join(planass).filter(registross.id_admin == id_admin).all()
    i=0
    users = []
    for registrosss, planasss  in resultado:
        i+=1	       
        datos[i] = {
            'id':registrosss.id,
		    'nombre':registrosss.nombre,
		    'apellido':registrosss.apellido, 
            'Planas': planasss.Planas,
            'Motivo': planasss.Motivo,
            'Estado': planasss.Estado,
            'FechaInicio': planasss.FechaInicio,
        }  
        users.append(datos)
    return jsonify(datos)   



#ELIMINAR 
@routes_tablacastigo.route('/eliminar', methods=['POST'] )
def eliminar() :
    id_aprediz = request.json['id_a']
    id = planass.query.filter_by(Id_Aprendiz=id_aprediz).first()
    if id:
        db.session.delete(id)
        db.session.commit()
        return jsonify({'message': 'Registro eliminado' }) 
    else:
        return jsonify({'message': 'Registro  no eliminado' }) 
    

# Configurar la programación de tareas con APScheduler
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()



@scheduler.task('cron', id='actualizar_plana', hour='14', minute='49')
def actualizar_plana():
    with app.app_context():
        # Obtener la fecha actual
        fecha_actual = datetime.date.today().strftime('%Y-%m-%d')

        dias_festivos = [

            '2023-01-01',  # Año Nuevo
            '2023-01-09',  # Día de los Reyes Magos
            '2023-03-20',  # Día de San José
            '2023-04-13',  # Jueves Santo
            '2023-05-01',  # Día del Trabajo
            '2023-06-19',  # Día de Corpus Christi
            '2023-07-20',  # Día de la Independencia
            '2023-08-07',  # Batalla de Boyacá
            '2023-08-21',  # Día de la Ascensión de Jesús
            '2023-10-16',  # Día de la Raza
            '2023-11-06',  # Día de la Independencia de Cartagena
            '2023-12-08',  # Día de la Inmaculada Concepción
            '2023-12-25',  # Navidad
            '2023-06-07',
            '2023-06-10',
            '2023-06-15',
            '2023-06-17',
            '2023-06-18',    

         ]

        # Verificar si la fecha actual está en la lista de días festivos
        if fecha_actual in dias_festivos:
            # Es un día festivo, decrementar el saldo de cada alumno en 5
            alumnos = planass.query.all()
            for alumno in alumnos:
                alumno.Planas *= 2
        else:
            # No es un día festivo, incrementar el saldo de cada alumno en 5
            alumnos = planass.query.all()
            for alumno in alumnos:
                alumno.Planas += 100

        # Guardar los cambios en la base de datos
        db.session.commit()

        print('Saldos de los alumnos actualizados automáticamente')





















# # Definir la tarea de actualización
# @scheduler.task('cron', id='actualizar_plana', hour='14', minute='04')
# def actualizar_plana():
#     with app.app_context():
#         # # Obtener la hora actual
#         # hora_actual_fecha_actual = datetime.datetime.now().time()
#         # hora_actual_fecha_actual_str =  hora_actual_fecha_actual.strftime('%Y-%m-%d')
#         # # hora_actual_fecha_actual_str= hora_actual_fecha_actual
#         fecha_actual = datetime.date.today().strftime('%Y-%m-%d')


#         dias_festivos = [
#             '2023-01-01',  # Año Nuevo
#             '2023-01-09',  # Día de los Reyes Magos
#             '2023-03-20',  # Día de San José
#             '2023-04-13',  # Jueves Santo
#             '2023-04-14',  # Viernes Santo
#             '2023-05-01',  # Día del Trabajo
#             '2023-06-19',  # Día de Corpus Christi
#             '2023-07-20',  # Día de la Independencia
#             '2023-08-07',  # Batalla de Boyacá
#             '2023-08-21',  # Día de la Ascensión de Jesús
#             '2023-10-16',  # Día de la Raza
#             '2023-11-06',  # Día de la Independencia de Cartagena
#             '2023-12-08',  # Día de la Inmaculada Concepción
#             '2023-12-25',  # Navidad
#             '2023-06-05',  # Navidad       
            
#         ]
    

#         # if hora_actual_fecha_actual_str:
#         #     # Es un día festivo, incrementar el saldo de cada alumno en 200
#         #     alumnos = planass.query.all()
#         #     for alumno in alumnos:
#         #         alumno.Planas -= 5

#         # elif dias_festivos :
#         #     # No es un día festivo, incrementar el saldo de cada alumno en 100
#         #     alumnos = planass.query.all()
#         #     for alumno in alumnos:
#         #         alumno.Planas += 5

#         # #Guardar los cambios en la base de datos
#         #     db.session.commit()

#         #     print('Saldos de los alumnos actualizados automáticamente')




#     # Obtener la fecha actual
   

#     # Verificar si la fecha actual está en la lista de días festivos
#     if fecha_actual in dias_festivos:
#         # Es un día festivo, decrementar el saldo de cada alumno en 5
#         alumnos = planass.query.all()
#         for alumno in alumnos:
#             alumno.Planas -= 5
#     else:
#         # No es un día festivo, incrementar el saldo de cada alumno en 5
#         alumnos = planass.query.all()
#         for alumno in alumnos:
#             alumno.Planas += 5

#     # Guardar los cambios en la base de datos
#     db.session.commit()

#     print('Saldos de los alumnos actualizados automáticamente')
