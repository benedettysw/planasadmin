from flask import Flask, render_template , url_for , session, redirect , request
from bd import app
from bd import db
from functools import wraps


#model
from Model.validar import validar
from Model.registro import registross
from Model.plana import planass



#ruta
from rutas.home import routes_home
from rutas.validar import routes_validar
from rutas.formulario import routes_formulario 
from rutas.update import routes_mostrar 
from rutas.castigo import routes_tablacastigo 
from rutas.buscador import routes_buscador
from rutas.grafico import routes_grafico
from rutas.cuenta import routes_cuenta
from rutas.olvido import routes_olvidado
from rutas.admin import routes_admin 




#ubicación rutas
app.register_blueprint(routes_home, url_prefix="/fronted")
app.register_blueprint(routes_formulario , url_prefix="/fronted")
app.register_blueprint(routes_mostrar  , url_prefix="/fronted")
app.register_blueprint(routes_tablacastigo  , url_prefix="/fronted")
app.register_blueprint(routes_validar   , url_prefix="/fronted")
app.register_blueprint(routes_buscador  , url_prefix="/fronted")
app.register_blueprint(routes_grafico , url_prefix="/fronted")
app.register_blueprint(routes_cuenta , url_prefix="/fronted")
app.register_blueprint(routes_olvidado , url_prefix="/fronted")
app.register_blueprint(routes_admin , url_prefix="/fronted")



@app.errorhandler(404)
def not_found(error):
    if 'conectado' in session:
        return redirect(url_for ('index'))


@app.errorhandler(404)
def not_found(error):
    if "conectado" in session:
        return redirect(url_for('index'))
    else:
        return render_template('index.html')



@app.before_request
def redirigir_a_principal():
    if "conectado" in session and request.endpoint != 'index.html':
        if request.path == '/fronted/tbactualizar':
            return redirect('index.html')
        

@app.route('/logout')
def logout():
    # Eliminar datos de sesión, esto cerrará la sesión del usuario
    session.pop('conectado', None)
    session.pop('admin_id', None)
    
    session.pop('admin_nombre', None)
    
    return redirect(url_for('inde'))




@app.route("/")
def inde():
    titulo="pagina principal"
    return render_template('index.html', title=titulo)


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')





 


