 # ***Projet de développement d'une TodoList***
Dans le cadre d'un projet en Programmation web avancée j'ai développé une todolist en utilisant le Framework Angular.

# Conditions préalables 
Pour utiliser cette application, vous devez disposer des éléments suivants : 
* Angular CLI version 8
* NodeJS 
* Git 

# __Commencer__ 

# __Installation__
Pour commencer à utiliser cette application il faut suivre ces étapes d'installation:
 > Etape 01: ouvrez un terminal et placez-vous dans le répertoire dans lequel voulez-vous installer l'application et exécutez ces commandes : 
  1. git clone https://github.com/BessadiJugurtha/TodoList_Project-Angular-.git
  2. npm install 
 
 > Etape 02: lancez l'application
  1. dans un terminal à la racine du projet : **ng serve**
  2. ouvrez une page web et tapez URL : http://localhost:4200/

 # __Listes des fonctionnalités__
 *  **Local Storage**
 *  **Undo / Redo**
 *  **Effacer tout**
 *  **Animation**


 # __Listes des fonctionnalités__ 
 > Concernant l'application de base (c'est à dire sans les foctionnalités suplimentaire), j'ai préféré travailler avec une  méthode 
 différente de la votre, car j'ai utilisé des evenements pour transférer les données du composant fils (todo-item) vers le composant père 
 (todo-list), et ce dérnier utilise le todoService, autrement dit j'ai pas utilisé le todoService directement depuis le composant todo-item:

1.**Local Storage :**   
Deux méthodes implimentées dans le fichier **todo.service.ts** permettent de gérer le local storage de la todoList, c'est les méthodes   
* get() : permet de récupérer l'état de la todoList dans le local storage
* saveAll() : met à jour la todoList dans le local storage   
   
2.**Undo / Redo :**  
Dans le local storage, deux suvegarde ont étés créer des tableau, ArrayUndo, et ArrayRedo.  
>Probleme N° 1 : Quand l'un des tableau ArrayRedo ou ArrayUndo est vide le constructeur initialise 
>le tableau avec un seul élément TodoItemData vide, alors que je devrais avoir un tableau de TodoItemData vide, donc 
>je supprime cette élément en utilisant **splice()**.

3.**Effacer tout :**  
Cette fonctionnalitée supprime les sauvegardes qui ont étés créer localement dans le navigateur.
>Problème N° 2 : Sans rafraichissement de la page, si j'ajoute une tache après avoir effacer tout,
> le **ArrayUndo** dans le local storage est recrée avec les anciens éléments + la nouvelle tache 
>alors qu'il devrait contenir que la nouvelle tache, donc pour corriger ça je rafraichis la page automatiquement
>avec **window.location.reload()**

4.**Animation :**  
J'ai ajouté une animation **"fade"** au composant **todo-item**. 

