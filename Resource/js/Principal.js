class Principal {
    constructor() {

    }

    linkPrincipal(link){
       
        switch(link){
            case PATHNAME + "Principal/principal":
                document.getElementById("enlace1").classList.add('active');
            break;
            case PATHNAME + "Pacientes/pacientes":
                document.getElementById("enlace2").classList.add('active');
            break;
            case PATHNAME + "Consultas/consultas":
                document.getElementById("enlace3").classList.add('active');
            break;
            case PATHNAME + "Historia/historia":
                document.getElementById("enlace4").classList.add('active');
            break;
            case PATHNAME + "Reportes/reportes":
                document.getElementById("enlace5").classList.add('active');
            break;

        }
    }
}