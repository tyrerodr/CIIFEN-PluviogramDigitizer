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

export let MENU_ITEM;
if(getCookie("type") == "administrador"){
    MENU_ITEM = [
        {
            path: 'digitizer',
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
}else if(getCookie("type") == "digitalizador"){
    MENU_ITEM = [
        {
            path: 'digitizer',
            title: 'Digitalizador',
            icon: 'pencil'
        },
        
    ];
}else if(getCookie("type") == "técnico"){
    MENU_ITEM = [
        {
            path: 'digitizer',
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




