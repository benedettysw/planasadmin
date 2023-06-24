from bd import db, app ,ma

class planass(db.Model):
    __tablename__ = "plana"
    
    id  = db.Column(db.Integer, primary_key=True)
    Planas  = db.Column(db.Integer)
    Motivo = db.Column(db.String(111))
    Estado = db.Column(db.String(111))
    FechaInicio = db.Column(db.DateTime)
    Id_Aprendiz = db.Column(db.Integer,db.ForeignKey('tbregistro.id'))
     
    def __init__(self, Planas, Motivo,Estado,FechaInicio, Id_Aprendiz):
        self.Planas = Planas
        self.Motivo = Motivo        
        self.Estado = Estado        
        self.FechaInicio  = FechaInicio    
        self.Id_Aprendiz = Id_Aprendiz     
       

with app.app_context():
    db.create_all()

class planaSchema(ma.Schema):
    class Meta:
        fields = ('Planas', 'Motivo','Estado','FechaInicio','Id_Aprendiz')