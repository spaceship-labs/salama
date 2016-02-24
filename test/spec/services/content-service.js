'use strict';

describe('Service: contentService', function () {
  var contentService;
  var httpBackend;
  beforeEach(module('salamaApp'));

  beforeEach(inject(function (_contentService_,$httpBackend) {
    contentService = _contentService_;
    httpBackend = $httpBackend;
  }));

  it('should be defined', function () {
    expect(!!contentService).to.equal(true);
  });

  it('should have setted url vars',function(){
    expect(contentService.urlSite).to.not.be.empty;
    expect(contentService.urlVersion).to.not.be.empty;
    expect(contentService.urlMeta).to.not.be.empty;
    expect(contentService.urlPosts).to.not.be.empty;
    expect(contentService.urlQuestions).to.not.be.empty;
    expect(contentService.urlIndividuals).to.not.be.empty;
    expect(contentService.urlOrganizations).to.not.be.empty;
  });

  it('should have setted getters',function(){
    expect(contentService.getVersion).to.not.be.undefined;
    expect(contentService.getMeta).to.not.be.undefined;
    expect(contentService.getPost).to.not.be.undefined;
    expect(contentService.getEvalIndividuals).to.not.be.undefined;
    expect(contentService.getEvalOrganizations).to.not.be.undefined;
  });

  it('should download current version',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlVersion).respond('some_random_string');
    contentService.getVersion().then(function(version){
      expect(version).to.not.be.empty;
    });
    httpBackend.flush();
  });



  it('should download valid metadata',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlMeta+'locale-all.json').respond([
      {
        "language": "en_US",
        "date": "2016-02-09 09:47 -0600",
        "author": "tugorez",
        "description": "lorem ipsum",
        "published": true,
        "title": "Lorem markdown",
        "path": "en_US/2016-02-09-lorem-markdown.md"
      },
      {
        "language": "en_US",
        "date": "2016-02-11 12:29 -0600",
        "author": "Tugorez",
        "description": "Tugorez",
        "published": true,
        "title": "new post for test",
        "path": "en_US/2016-02-11-new-post-for-test.md"
      },
      {
        "language": "en_US",
        "date": "2016-02-11 12:38 -0600",
        "author": "tugorez",
        "description": "post",
        "published": true,
        "title": "This is not a regular post ",
        "path": "en_US/2016-02-11-this-is-not-a-regular-post.md"
      },
      {
        "language": "en_US",
        "date": "2016-02-03 23:21 -0600",
        "title": "English title",
        "author": "English Author",
        "description": "English Desc",
        "published": true,
        "path": "en_US/test.md"
      }
    ]);
    contentService.getMeta().then(function(metadata){
      metadata.forEach(function(item){
        expect(item.language).to.not.be.undefined;
        expect(item.date).to.not.be.undefined;
        expect(item.title).to.not.be.undefined;
        expect(item.author).to.not.be.undefined;
        expect(item.description).to.not.be.undefined;
        expect(item.published).to.be.true;
        expect(item.path).to.not.be.undefined;
      });
    });
    httpBackend.flush();
  });

  it('should download and clean a post',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlPosts+'en_US/random.md').respond('---frontMatter---{{site.baseurl}}');
    contentService.getPost('en_US/random.md').then(function(post){
      expect(post).to.equal(contentService.urlSite);
    });
    httpBackend.flush();
  });

  it('should download the individual\'s eval',function(){
    httpBackend.whenGET('resources/locale-en_US.json').respond('randomstr');
    httpBackend.whenGET(contentService.urlIndividuals+'es_MX.json').respond(
    {
      "questions": [
        {
          "question": "Nombre",
          "instruction": "Si quiere permanecer anónimo, no llenes el espacio del nombre. Necesitamos tu correo electrónico para enviarte los resultados. Si deseas recibir consejo individual, por  favor escribe tu nombre.",
          "type": "text"
        },
        {
          "question": "Correo electrónico",
          "instruction": "Por favor escribe tu correo electrónico, (Los resultados serán enviados a este correo electrónico).",
          "type": "email"
        },
        {
          "question": "Entrenamiento Individualizado",
          "type": "checkbox",
          "options": [
            {
              "value": 0,
              "option": "Si, deseo recibir entrenamiento individualizado"
            }
          ]
        },
        {
          "question": "Medio",
          "instruction": "Por favor anota el nombre de tu medio de comunicación (si eres periodista independiente, escribe esas palabras) ",
          "type": "text"
        },
        {
          "question": "Municipio y Estado (Provincia o Departamento)",
          "instruction": "Por favor escribe el nombre de tu municipio y departamento. Ejemplo: Pueblo Nuevo, Estelí",
          "type": "text"
        },
        {
          "question": "Puesto",
          "instruction": "Todos los periodistas o trabajadores de medios comparten los mismos riesgos. Sin embargo algunas posiciones enfrentan más riesgo que otras. Por favor define en qué área trabajas. Elige las opciones que apliquen.",
          "type": "checkbox",
          "options": [
            {
              "value": 0,
              "option": "Producción y circulación"
            },
            {
              "value": 0,
              "option": "Gerencia de comunidades"
            },
            {
              "value": 0,
              "option": "Editor"
            },
            {
              "value": 0,
              "option": "Director"
            },
            {
              "value": 0,
              "option": "Reportero, fotógrafo o bloguero"
            }
          ]
        },
        {
          "question": "¿Has recibido una amenaza o sufriste una agresión como periodista en el último año?",
          "type": "radio",
          "options": [
            {
              "value": 0,
              "option": "Si"
            },
            {
              "value": 0,
              "option": "No"
            }
          ]
        },
        {
          "question": "¿Colegas de tu medio han recibido una amenaza o sufrieron una agresión como periodistas en el último año?",
          "type": "radio",
          "options": [
            {
              "value": 0,
              "option": "Si"
            },
            {
              "value": 0,
              "option": "No"
            }
          ]
        },
        {
          "question": "¿Colegas de otros medios del área han recibido amenazas o sufrieron una agresión como periodistas en el último año?",
          "type": "radio",
          "options": [
            {
              "value": 0,
              "option": "Si"
            },
            {
              "value": 0,
              "option": "No"
            }
          ]
        },
        {
          "question": "Situación de seguridad",
          "instruction": "Por favor elige una opción",
          "type": "multiradio",
          "options": [
            {
              "question": "¿Cubres notas de policía o crimen?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            },
            {
              "question": "¿Cubres hechos de corrupción?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            },
            {
              "question": "¿Cubres hechos violentos? (Asesinatos, disturbios, golpes)",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            },
            {
              "question": "¿Con qué frecuencia acudes a zonas de alto riesgo?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            },
            {
              "question": "¿Recibes Información confidencial de tus fuentes?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            }
          ]
        },
        {
          "question": "Situación de censura",
          "instruction": "Por favor elige una opción",
          "type": "multiradio",
          "options": [
            {
              "question": "¿Recibes presiones externas para censurar tus información?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            },
            {
              "question": "¿Recibes presiones internas para censurar tus información?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            },
            {
              "question": "¿Practicas autocensura?",
              "options": [
                {
                  "value": 0,
                  "option": "Nunca"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Todos los días"
                }
              ]
            }
          ]
        },
        {
          "question": "Situación profesional",
          "instruction": "Por favor elige una opción",
          "type": "multiradio",
          "options": [
            {
              "question": "¿Qué tanto planificas tus coberturas?",
              "options": [
                {
                  "value": 0,
                  "option": "Todos los días"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Nunca"
                }
              ]
            },
            {
              "question": "¿Con qué frecuencia verificas la información que consigues y publicas?",
              "options": [
                {
                  "value": 0,
                  "option": "Todos los días"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Nunca"
                }
              ]
            },
            {
              "question": "¿Con qué frecuencia analizas los principios y valores éticos del periodismo antes de publicar la información que consigues?",
              "options": [
                {
                  "value": 0,
                  "option": "Todos los días"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Nunca"
                }
              ]
            },
            {
              "question": "¿Usas protocolos de reducción de riesgo en tu trabajo?",
              "options": [
                {
                  "value": 0,
                  "option": "Todos los días"
                },
                {
                  "value": 0,
                  "option": "Con mucha frecuencia"
                },
                {
                  "value": 0,
                  "option": "Regularmente"
                },
                {
                  "value": 0,
                  "option": "A veces"
                },
                {
                  "value": 0,
                  "option": "Nunca"
                }
              ]
            }
          ]
        },
        {
          "question": "Seguridad de redes",
          "instruction": "Por favor elige una opción",
          "type": "multiradio",
          "options": [
            {
              "question": "¿Cómo es la comunicación con tus jefes?",
              "options": [
                {
                  "value": 0,
                  "option": "Excelente"
                },
                {
                  "value": 0,
                  "option": "Buena"
                },
                {
                  "value": 0,
                  "option": "Deficiente"
                },
                {
                  "value": 0,
                  "option": "Mala"
                },
                {
                  "value": 0,
                  "option": "Pésima"
                }
              ]
            },
            {
              "question": "¿Cómo es la comunicación con tus subalternos?",
              "options": [
                {
                  "value": 0,
                  "option": "Excelente"
                },
                {
                  "value": 0,
                  "option": "Buena"
                },
                {
                  "value": 0,
                  "option": "Deficiente"
                },
                {
                  "value": 0,
                  "option": "Mala"
                },
                {
                  "value": 0,
                  "option": "Pésima"
                }
              ]
            },
            {
              "question": "Cómo es la comunicación con tus colegas de otros medios?",
              "options": [
                {
                  "value": 0,
                  "option": "Excelente"
                },
                {
                  "value": 0,
                  "option": "Buena"
                },
                {
                  "value": 0,
                  "option": "Deficiente"
                },
                {
                  "value": 0,
                  "option": "Mala"
                },
                {
                  "value": 0,
                  "option": "Pésima"
                }
              ]
            }
          ]
        },
        {
          "question": "Seguridad laboral",
          "instruction": "Califica tus condiciones de trabajo. Por favor elige una opción",
          "type": "multiradio",
          "options": [
            {
              "question": "¿Cómo es tu condición laboral (sueldo, prestaciones)",
              "options": [
                {
                  "value": 0,
                  "option": "Excelente"
                },
                {
                  "value": 0,
                  "option": "Buena"
                },
                {
                  "value": 0,
                  "option": "Deficiente"
                },
                {
                  "value": 0,
                  "option": "Mala"
                },
                {
                  "value": 0,
                  "option": "Pésima"
                }
              ]
            },
            {
              "question": "Califica la voluntad y acciones de tu empresa para mejorar tu seguridad",
              "options": [
                {
                  "value": 0,
                  "option": "Excelente"
                },
                {
                  "value": 0,
                  "option": "Buena"
                },
                {
                  "value": 0,
                  "option": "Deficiente"
                },
                {
                  "value": 0,
                  "option": "Mala"
                },
                {
                  "value": 0,
                  "option": "Pésima"
                }
              ]
            }
          ]
        },
        {
          "question": "Seguridad digital",
          "instruction": "Califica tu habilidad en el uso de las siguientes herramientas de seguridad",
          "type": "multiradio",
          "options": [
            {
              "question": "Navegación anónima (TOR)",
              "options": [
                {
                  "value": 0,
                  "option": "Maestro"
                },
                {
                  "value": 0,
                  "option": "Avanzada"
                },
                {
                  "value": 0,
                  "option": "Intermedia"
                },
                {
                  "value": 0,
                  "option": "Básica"
                },
                {
                  "value": 0,
                  "option": "Ninguna"
                }
              ]
            },
            {
              "question": "Correo encriptado (PGP, Protogmail, Mailvelope, Hushmail)",
              "options": [
                {
                  "value": 0,
                  "option": "Maestro"
                },
                {
                  "value": 0,
                  "option": "Avanzada"
                },
                {
                  "value": 0,
                  "option": "Intermedia"
                },
                {
                  "value": 0,
                  "option": "Básica"
                },
                {
                  "value": 0,
                  "option": "Ninguna"
                }
              ]
            },
            {
              "question": "Chat encriptado (OTR+Pidgin, OTR+Adium, Cryptocat, etc)",
              "options": [
                {
                  "value": 0,
                  "option": "Maestro"
                },
                {
                  "value": 0,
                  "option": "Avanzada"
                },
                {
                  "value": 0,
                  "option": "Intermedia"
                },
                {
                  "value": 0,
                  "option": "Básica"
                },
                {
                  "value": 0,
                  "option": "Ninguna"
                }
              ]
            },
            {
              "question": "Contraseñas fuertes",
              "options": [
                {
                  "value": 0,
                  "option": "Maestro"
                },
                {
                  "value": 0,
                  "option": "Avanzada"
                },
                {
                  "value": 0,
                  "option": "Intermedia"
                },
                {
                  "value": 0,
                  "option": "Básica"
                },
                {
                  "value": 0,
                  "option": "Ninguna"
                }
              ]
            },
            {
              "question": "Llamadas telefónicas (RedPhone, Signal, Ostel)",
              "options": [
                {
                  "value": 0,
                  "option": "Maestro"
                },
                {
                  "value": 0,
                  "option": "Avanzada"
                },
                {
                  "value": 0,
                  "option": "Intermedia"
                },
                {
                  "value": 0,
                  "option": "Básica"
                },
                {
                  "value": 0,
                  "option": "Ninguna"
                }
              ]
            }
          ]
        }
      ]
    });
    contentService.getEvalIndividuals('es_MX').then(function(questions){
      questions.forEach(function(q){
        expect(q.question).to.be.defined;
        expect(q.type).to.be.defined;
        if( q.type!='text' && q.type!='email' ){
          expect(q.options).to.be.defined;
        }
      });
    });
    httpBackend.flush();
  });
});
