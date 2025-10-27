#Taller de programacion 12

class Producto:
    def __init__(self,precio):
        self.__precio=precio
    
    def get_precio(self):
        return self.__precio
    
Producto=Producto(200)

#print(Producto.__precio)
print(f"Precio obtenido es:{Producto.get_precio()}")