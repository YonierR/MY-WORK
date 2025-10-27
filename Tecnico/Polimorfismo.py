#Taller de programacion 13

class pajaro:
    def moverse(self):
        return "El pajaro vuela"

class pez:
    def moverse(self):
        return "El pez Nada"
    
def descripcion_animal(animal):
    print(animal.moverse())

pajaro=pajaro()
pez=pez()

descripcion_animal(pajaro)
descripcion_animal(pez)