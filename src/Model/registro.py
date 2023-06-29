from bd import db, app 

class registross(db.Model):
    __tablename__ = "tbregistro"
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(111))
    apellido = db.Column(db.String(111))
    curso = db.Column(db.String(111))
    Nficha = db.Column(db.Integer)
    Ndocumento = db.Column(db.Integer)
    # foto = db.Column(db.LargeBinary(255))  # Agrega la nueva columna "foto"
    id_admin = db.Column(db.Integer, db.ForeignKey('validar.id'))
   
    
    def __init__(self, nombre, apellido, curso, Nficha, Ndocumento, id_admin):
        self.nombre = nombre
        self.apellido = apellido
        self.curso = curso
        self.Nficha = Nficha
        self.Ndocumento = Ndocumento
        # self.foto = foto
        self.id_admin = id_admin
      
    
with app.app_context():
    db.create_all()
