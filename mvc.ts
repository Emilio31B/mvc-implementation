
//POJO - Bean: solo son repositorios de información
class Alumno{
    codigo : string;
    nombre : string;

    constructor(codigo : string, nombre : string){
        this.codigo = codigo;
        this.nombre = nombre;
    }
}

//Model

class AlumnosModel{
    observer : ControllerObserver;
    setObserver(observer : ControllerObserver){
        this.observer = observer;
    }
    obtenerAlumnos(){
        let alumnos = []
        alumnos.push(new Alumno("20152334","Pepito"));
        alumnos.push(new Alumno("20152335","Cristiano"));
        alumnos.push(new Alumno("20152336","Leonel"));
        alumnos.push(new Alumno("20152337","Cuto"));

        setTimeout(()=>{
            this.observer.onAlumnosObtenidos(alumnos);
        }, 3000);
    }
}

abstract class ControllerObserver{
    abstract onAlumnosObtenidos(alumnos : Alumno[]);
}



//Controller 
class AlumnosController extends ControllerObserver{
    lista : ListaAlumnosView;
    constructor(){
        super();
        this.lista = new ListaAlumnosView();
    }
    onAlumnosObtenidos(alumnos: Alumno[]) {
        this.lista.alumnos = alumnos;
        this.lista.pintar();
    }
    start(){
        let alumnosModel = new AlumnosModel();
        let lista = new ListaAlumnosView();

        alumnosModel.setObserver(this);

        alumnosModel.obtenerAlumnos();
    };
}

//View
class ListaAlumnosView{
    alumnos : Alumno[];
    pintar(){
        console.log("-------------------------------------------------------------");
        if(this.alumnos.length == 0){
            console.log("No hay alumnos para mostrar");
        } else{
            for(let i = 0; i < this.alumnos.length;i++){
                let alumno = this.alumnos[i];
                console.log(`(${ i + 1}) ${alumno.codigo} ${alumno.nombre}`);
            }
        } 
        console.log("-------------------------------------------------------------");
    };
}


let mainMVC = () => {
    let controller = new AlumnosController();
    controller.start();
};

mainMVC();