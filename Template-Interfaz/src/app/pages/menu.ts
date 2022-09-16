function getCookie(cname: String) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } 

console.log(getCookie("tipo") + "SISI");
export let MENU_ITEM;
if(getCookie("tipo") == "administrador"){
    MENU_ITEM = [
        {
            path: 'digitalizador',
            title: 'Digitalizador',
            icon: 'pencil'
        },
        {
            path: 'database',
            title: 'Tabla de Estaciones',
            icon: 'table',
        },
        {
            path: 'admin',
            title: 'Tabla de Usuarios',
            icon: 'user'
        },
    ];
}else if(getCookie("tipo") == "digitalizador"){
    MENU_ITEM = [
        {
            path: 'digitalizador',
            title: 'Digitalizador',
            icon: 'pencil'
        },
        
    ];
}else if(getCookie("tipo") == "técnico"){
    MENU_ITEM = [
        {
            path: 'digitalizador',
            title: 'Digitalizador',
            icon: 'pencil'
        },
        {
            path: 'database',
            title: 'Tabla de Estaciones',
            icon: 'table',
        },
        
    ];
}




