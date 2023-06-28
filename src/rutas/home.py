from bd import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template , url_for

routes_home = Blueprint("routes_home", __name__)

#ruta del formulario
@routes_home.route('/formulario', methods=['GET'])
def formularios():
    return render_template('/main/formulario.html')


#ruta de la tabla Actualizar  
@routes_home.route("/tbactualizar" ,  methods=['GET'] )
def tbactualizar():
    return render_template('/main/tbupdate.html')

#ruta de la tabla castigo
@routes_home.route("/tbplana" ,  methods=['GET'] )
def tbplana():
    return render_template('/main/tbplanas.html')



@routes_home.route("/salir" ,  methods=['GET'] )
def exit():
    return render_template('/index.html')


#ruta vistadmin
@routes_home.route("/menu" ,  methods=['GET'] )
def menu():
    return render_template('/main/layout.html')  

#ruta de la tabla castiga aprendiz 
@routes_home.route("/tbaprndiz" ,  methods=['GET'] )
def tbaprndiz():
    return render_template('/main/aluno.html')  

#ruta principal
@routes_home.route("/index" ,  methods=['GET'] )
def index():
    return render_template('index.html')  

#ruta principal
@routes_home.route("/perfil" ,  methods=['GET'] )
def perfil():
    return render_template('/main/perfil.html')  

@routes_home.route("/formulari" ,  methods=['GET'] )
def formulari():
    return render_template('/main/formulari.html')  

@routes_home.route("/grafico" ,  methods=['GET'] )
def grafico():
    return render_template('/main/grafico.html')  


@routes_home.route("/Modal" ,  methods=['GET'] )
def Modal():
    return render_template('/main/Modal.html')  


@routes_home.route("/cuenta" ,  methods=['GET'] )
def cuenta():
    return render_template('/main/cuenta.html')  

@routes_home.route("/admin" ,  methods=['GET'] )
def admin():
    return render_template('/main/admin.html')  

@routes_home.route("/tabladmin" ,  methods=['GET'] )
def tablaadmin():
    return render_template('/main/tabladmin.html')  


@routes_home.route("/login" , methods=['GET'] )
def login():
    return render_template('/main/login.html')

@routes_home.route("/clave" , methods=['GET'] )
def correo():
    return render_template('/main/recuperarclave.html')
