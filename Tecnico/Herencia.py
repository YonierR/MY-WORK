#Taller de programacion 11

class Vehiculo:
    def __init__(self,marca,modelo):
        self.marca=marca
        self.modelo=modelo

    def info_vehiculo(self):
        print(f"marca: {self.marca}, modelo: {self.modelo}")

class coche(Vehiculo):
    def __init__(self,marca,modelo,num_puertas):
        super().__init__(marca,modelo)
        self.num_puertas=num_puertas


    def info_vehiculo(self):
        super().info_vehiculo()
        print(f"numero de puertas: {self.num_puertas}")

mi_coche= coche("Auidi","R8", 2 )
mi_coche.info_vehiculo()