import random

class PalabraSecreta:
    def __init__(self):
        self.lista_palabras = ["phyton", "programacion", "clase", "objeto", "metodo" , "edier"]
        self.palabra = random.choice(self.lista_palabras).lower()
        self.letras_adivinadas = set()
        self.letras_falladas =set()

    def mostrar_palabra(self):
        palabra_oculta = " "
        for letras in self.palabra:
            if letras in self.letras_adivinadas:
                palabra_oculta += " "
            else:
                palabra_oculta += "_ "
        return palabra_oculta.strip()

    def adivinar_letras(self, letras):
        if letras in self.letras_adivinadas or letras in self.letras_falladas:
            print(" +++--Ya Adivinaste o Intentaste esa Letra.--+++")
            return False
        
        if letras in self.palabra:
            self.letras_adivinadas.add(letras)
            return True
        else:
            self.letras_falladas.add(letras)
            return False

    def es_ganador(self):
        return all(letras in self.letras_adivinadas for letras in self.palabra)

class JuegoAhorcado:
    def __init__(self, intentos_maximos=6):
        self.palabra_secreta = PalabraSecreta()
        self.intentos_restantes = intentos_maximos

    def jugar(self):
        print(" *+*+* Bienvenido al Juego del Ahorcado. *+*+* ")
        while self.intentos_restantes > 0 and not self.palabra_secreta.es_ganador():
            print("\n" + self.palabra_secreta.mostrar_palabra())
            print(f" Intentos restantes: {self.intentos_restantes} ")
            print(f" Letras Falladas : {", ".join(sorted(list(self.palabra_secreta.letras_falladas)))}")

            letras = input(" Adivina una letra: ").lower()
            if len(letras) != 1 or not letras.isalpha():
                print("-¿¿--Por favor, Ingresa una sola Palabra valida.--??- ")
                continue

            if not self.palabra_secreta.adivinar_letras(letras):
                self.intentos_restantes -= 1
                print(" xx--¡Incorecto!--xx ")

        if self.palabra_secreta.es_ganador():
            print(f"\n *--¡Felicidades!--*  Adivinaste la palabra: {self.palabra_secreta.palabra.upper()}")
        else:
            print(f"\n x--¡Se te acabaron los intentos!--x  la palabra era: {self.palabra_secreta.palabra.upper()}")
        print("** Gracias por jugar **")

if __name__ == "__main__":
    juego = JuegoAhorcado()
    juego.jugar()


            


    




