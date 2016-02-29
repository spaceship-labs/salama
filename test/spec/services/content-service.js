'use strict';

describe('Service: contentService', function () {

  var lang             = 'en_US';
  var postPath         = 'en_US/random.md';
  var urlResources     = 'resources/locale-en_US.json';
  var urlSite          = 'https://raw.githubusercontent.com/spaceship-labs/salama-content/gh-pages/';
  var urlVersion       = urlSite + 'version.txt';
  var urlMetadata      = urlSite + 'metadata/locale-all.json' ;
  var urlPost          = urlSite + 'posts/en_US/random.md';
  var urlIndividuals   = urlSite + 'questions/en_US/individuals.json';
  var urlOrganizations = urlSite + 'questions/en_US/organizations.json';
  var urlAdvice        = urlSite + 'advices/en_US/low.md';
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


  it('should have setted getters',function(){
    expect(contentService.getVersion).to.not.be.undefined;
    expect(contentService.getMetadata).to.not.be.undefined;
    expect(contentService.getPost).to.not.be.undefined;
    expect(contentService.getEvalIndividuals).to.not.be.undefined;
    expect(contentService.getEvalOrganizations).to.not.be.undefined;
  });

  it('should download current version',function(){
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlVersion).respond('some_random_string');
    contentService.getVersion().then(function(version){
      expect(version).to.not.be.empty;
    });
    httpBackend.flush();
  });



  it('should download valid metadata',function(){
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlMetadata).respond([
      {
        "language": "en_US",
        "date": "2016-02-09 09:47 -0600",
        "author": "tugorez",
        "description": "lorem ipsum",
        "published": true,
        "title": "Lorem markdown",
        "path": "en_US/2016-02-09-lorem-markdown.md",
        "category":"digital"
      },
      {
        "language": "en_US",
        "date": "2016-02-11 12:29 -0600",
        "author": "Tugorez",
        "description": "Tugorez",
        "published": true,
        "title": "new post for test",
        "path": "en_US/2016-02-11-new-post-for-test.md",
        "category":"digital"
      },
      {
        "language": "en_US",
        "date": "2016-02-11 12:38 -0600",
        "author": "tugorez",
        "description": "post",
        "published": true,
        "title": "This is not a regular post ",
        "path": "en_US/2016-02-11-this-is-not-a-regular-post.md",
        "category":"digital"
      },
      {
        "language": "en_US",
        "date": "2016-02-03 23:21 -0600",
        "title": "English title",
        "author": "English Author",
        "description": "English Desc",
        "published": true,
        "path": "en_US/test.md",
        "category":"digital"
      }
    ]);
    contentService.getMetadata('all').then(function(metadata){
      metadata.forEach(function(item){
        expect(item.language).to.not.be.undefined;
        expect(item.date).to.not.be.undefined;
        expect(item.title).to.not.be.undefined;
        expect(item.author).to.not.be.undefined;
        expect(item.description).to.not.be.undefined;
        expect(item.published).to.be.true;
        expect(item.path).to.not.be.undefined;
        expect(item.category).to.not.be.undefined;
      });
    });
    httpBackend.flush();
  });

  it('should download and clean a post',function(){
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlPost).respond('---frontMatter---{{site.baseurl}}');
    contentService.getPost(postPath).then(function(post){
      expect(post).to.equal(urlSite);
    });
    httpBackend.flush();
  });

  it('should download the individual\'s eval',function(){
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlIndividuals).respond(
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
        }
      ]
    });
    contentService.getEvalIndividuals(lang).then(function(questions){
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

  it('should download the organization\'s eval',function(){
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlOrganizations).respond(
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
        }
      ]
    });
    contentService.getEvalOrganizations(lang).then(function(questions){
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

  it('should download a valid advice based on lang and score',function(){
    httpBackend.whenGET(urlResources).respond('randomstr');
    httpBackend.whenGET(urlVersion).respond('some_random_string');
    httpBackend.whenGET(urlAdvice).respond('some_random_string');
    contentService.getAdvice('low','en_US').then(function(advice){
      expect(advice).to.be.equal('some_random_string');
    });
    httpBackend.flush();
  });

});
