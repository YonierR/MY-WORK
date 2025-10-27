#Taller  de programacion 10

class Libro:
    def __init__(self,titulo,autor,año):
        self.titulo=titulo
        self.autor=autor
        self.año=año
        
    def mostrar_info(self):
        print(f"Del año:{self.año}")

mi_libro=Libro ("Orgullo y prejuicio","Jane Austen", 1813)

print(f"Mi libro es {mi_libro.titulo} de {mi_libro.autor}")

mi_libro.mostrar_info()