#Taller de programacion 15


class Persona:
    def __init__(self,nombre,edad):
        self.nombre=nombre
        self.edad=edad

    def __str__(self):
        return f"Persona(nombre:{self.nombre}, edad:{self.edad})"

P= Persona("antonio", 15)

class Estudiante:
    def __init__(self,nombre,edad):
        self.nombre=nombre
        self.edad=edad

    def __str__(self):
        return f"Estudiante(nombre:{self.nombre}, edad:{self.edad})"
    
E= Estudiante("luis", 17)
print(E,P)