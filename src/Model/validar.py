from bd import db, app, ma  

class validar(db.Model):
    __tablename__ = "validar"
    
    id = db.Column(db.Integer, primary_key=True)
    Nombre  = db.Column(db.String(111))
    correo  = db.Column(db.String(111))
    contraseña = db.Column(db.String(111))
    
     
    def __init__(self,Nombre, correo, contraseña):
        self.Nombre = Nombre
        self.correo = correo
        self.contraseña = contraseña  


with app.app_context():
    db.create_all()


class validarSchema(ma.Schema):
    class Meta:
         fields = ('id', 'Nombre','correo', 'contraseña')