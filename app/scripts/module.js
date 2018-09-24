/// VERIFY IF THE DIRECTION HAVE CHANGED /////////////////////////////////

if (toggle = true) {
    function hashHandler() {
      this.oldHash = window.location.hash;
      this.Check;
      document.getElementById("drawer").style.marginLeft = "-950px";
      var that = this;
      var detect = function () {
        if (that.oldHash != window.location.hash) {
          that.oldHash = window.location.hash;
          document.getElementById("drawer").style.marginLeft = "-1050px";
        }
      };
      this.Check = setInterval(function () { detect() }, 100);
    }
  }

/////////////////END OF FUNCTION ////////////////////////////////////////////

var hashDetection = new hashHandler();
var toggle = false;

export function activeMenu() {
  if (toggle === false) {
    toggle = true;
    document.getElementById("drawer").style.paddingLeft = "150px";
    document.getElementById("drawer").style.marginLeft = "0px";
    document.getElementById("shadow").style.display = "initial";
    document.getElementById("burger").style.display = "none";
    document.getElementById("cross").style.display = "initial";
  } else {
    toggle = false;
    document.getElementById("drawer").style.marginLeft = "-1050px";
    document.getElementById("shadow").style.display = "none";
    document.getElementById("burger").style.display = "initial";
    document.getElementById("cross").style.display = "none";
  }
}

var toggle_submenu = false;

export function Toggle() {
  document.getElementById("subdrawer").style.display = "block";
}

export function UnToggle() {
  document.getElementById("subdrawer").style.display = "none";
}

export function Toggle2() {
  document.getElementById("subdrawer2").style.display = "block";
}

export function UnToggle2() {
  document.getElementById("subdrawer2").style.display = "none";
}

export function Toggle3() {
  document.getElementById("subdrawer3").style.display = "block";
}

export function UnToggle3() {
  document.getElementById("subdrawer3").style.display = "none";
}

export function Toggle4() {
  document.getElementById("subdrawer4").style.display = "block";
}

export function UnToggle4() {
  document.getElementById("subdrawer4").style.display = "none";
}

export function Toggle5() {
  document.getElementById("subdrawer5").style.display = "block";
}

export function UnToggle5() {
  document.getElementById("subdrawer5").style.display = "none";
}

export function Toggle6() {
  document.getElementById("subdrawer6").style.display = "block";
}

export function UnToggle6() {
  document.getElementById("subdrawer6").style.display = "none";
}


export function Individuals(color) {
  //document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    //document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}


export function Organizations(color) {
  document.getElementById('individuals').style.color = color;
  //document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    //document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}

export function DigitalSecurity(color) {
  document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  // document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    // document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}

export function Censored(color) {
  document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  //document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    //document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}


export function Seglab(color) {
  document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  //document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    //document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}


export function Segprof(color) {
  document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  //document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    // document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}

export function Redes(color) {
  document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  //document.getElementById('redes').style.color = color;
  document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    //document.getElementById('redes_png').style.filter = 'invert(70%)';
    document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}
export function Otros(color) {
  document.getElementById('individuals').style.color = color;
  document.getElementById('organizations').style.color = color;
  document.getElementById('digitalsecurity').style.color = color;
  document.getElementById('evaluation').style.color = color;
  document.getElementById('library').style.color = color;
  document.getElementById('censura').style.color = color;
  document.getElementById('seglab').style.color = color;
  document.getElementById('segprof').style.color = color;
  document.getElementById('redes').style.color = color;
  //document.getElementById('otros').style.color = color;

  if (color == 'grey') {
    document.getElementById('individual_png').style.filter = 'invert(70%)';
    document.getElementById('organizations_png').style.filter = 'invert(70%)';
    document.getElementById('digital_png').style.filter = 'invert(70%)';
    document.getElementById('censura_png').style.filter = 'invert(70%)';
    document.getElementById('seglab_png').style.filter = 'invert(70%)';
    document.getElementById('segprof_png').style.filter = 'invert(70%)';
    document.getElementById('redes_png').style.filter = 'invert(70%)';
    //document.getElementById('otros_png').style.filter = 'invert(70%)';
  }
  if (color == 'white') {
    document.getElementById('individual_png').style.filter = 'invert(0%)';
    document.getElementById('organizations_png').style.filter = 'invert(0%)';
    document.getElementById('digital_png').style.filter = 'invert(0%)';
    document.getElementById('censura_png').style.filter = 'invert(0%)';
    document.getElementById('seglab_png').style.filter = 'invert(0%)';
    document.getElementById('segprof_png').style.filter = 'invert(0%)';
    document.getElementById('redes_png').style.filter = 'invert(0%)';
    document.getElementById('otros_png').style.filter = 'invert(0%)';
  }
}

export function Calls(color) {
  //document.getElementById('calls').style.color = color;
  document.getElementById('chat').style.color = color;
  document.getElementById('security').style.color = color;
  document.getElementById('sensitive').style.color = color;
  document.getElementById('protect').style.color = color;
  document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;

}

export function Chat(color) {
  document.getElementById('calls').style.color = color;
  //  document.getElementById('chat').style.color = color;
  document.getElementById('security').style.color = color;
  document.getElementById('sensitive').style.color = color;
  document.getElementById('protect').style.color = color;
  document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;
}

export function Security(color) {
  document.getElementById('calls').style.color = color;
  document.getElementById('chat').style.color = color;
  //document.getElementById('security').style.color = color;
  document.getElementById('sensitive').style.color = color;
  document.getElementById('protect').style.color = color;
  document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;
}

export function Sensitive(color) {
  document.getElementById('calls').style.color = color;
  document.getElementById('chat').style.color = color;
  document.getElementById('security').style.color = color;
  //document.getElementById('sensitive').style.color = color;
  document.getElementById('protect').style.color = color;
  document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;

}

export function Protect(color) {
  document.getElementById('calls').style.color = color;
  document.getElementById('chat').style.color = color;
  document.getElementById('security').style.color = color;
  document.getElementById('sensitive').style.color = color;
  //document.getElementById('protect').style.color = color;
  document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;

}

export function Safe(color) {
  document.getElementById('calls').style.color = color;
  document.getElementById('chat').style.color = color;
  document.getElementById('security').style.color = color;
  document.getElementById('sensitive').style.color = color;
  document.getElementById('protect').style.color = color;
  // document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;

}

export function Passwords(color) {
  document.getElementById('calls').style.color = color;
  document.getElementById('chat').style.color = color;
  document.getElementById('security').style.color = color;
  document.getElementById('sensitive').style.color = color;
  document.getElementById('protect').style.color = color;
  document.getElementById('safe').style.color = color;
  document.getElementById('passwords').style.color = color;

}

export function Corruption(color) {
  // document.getElementById('corruption').style.color = color;
  document.getElementById('cover').style.color = color;
  document.getElementById('attacks').style.color = color;
  document.getElementById('plan').style.color = color;
  document.getElementById('danger').style.color = color;

}
export function Cover(color) {
  document.getElementById('corruption').style.color = color;
  //document.getElementById('cover').style.color = color;
  document.getElementById('attacks').style.color = color;
  document.getElementById('plan').style.color = color;
  document.getElementById('danger').style.color = color;

}
export function Attacks(color) {
  document.getElementById('corruption').style.color = color;
  document.getElementById('cover').style.color = color;
  //document.getElementById('attacks').style.color = color;
  document.getElementById('plan').style.color = color;
  document.getElementById('danger').style.color = color;

}

export function Plan(color) {
  document.getElementById('corruption').style.color = color;
  document.getElementById('cover').style.color = color;
  document.getElementById('attacks').style.color = color;
  // document.getElementById('plan').style.color = color;
  document.getElementById('danger').style.color = color;
}

export function Danger(color) {
  document.getElementById('corruption').style.color = color;
  document.getElementById('cover').style.color = color;
  document.getElementById('attacks').style.color = color;
  document.getElementById('plan').style.color = color;
  // document.getElementById('danger').style.color = color;
}

export function Ethic(color) {
  //document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}
export function Stories(color) {
  document.getElementById('ethic').style.color = color;
  //document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}
export function Good(color) {
  document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  //document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}

export function Methods(color) {
  document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  //document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}

export function Situation(color) {
  document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  //document.getElementById('situation').style.color = color;
  document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}
export function Sensitive(color) {
  document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  //document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}
export function Protocols(color) {
  document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  document.getElementById('').style.color = color;
  //document.getElementById('protocols').style.color = color;
  document.getElementById('corrcover').style.color = color;
}
export function Cover(color) {
  document.getElementById('ethic').style.color = color;
  document.getElementById('stories').style.color = color;
  document.getElementById('good').style.color = color;
  document.getElementById('methods').style.color = color;
  document.getElementById('situation').style.color = color;
  document.getElementById('handle').style.color = color;
  document.getElementById('protocols').style.color = color;
  //  document.getElementById('corrcover').style.color = color;
}