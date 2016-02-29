/**
 * Appends a new form item to the current form.
 *
 * @param {Object} itemData a collection of String data used to
 *     determine the exact form item created.
 */
function addFormItem(itemData) {
  // Use data collected from sidebar to manipulate the form.
  var form = FormApp.getActiveForm();
  switch (itemData.type) {
    case 'Date':
      form.addDateItem().setTitle(itemData.name);
      break;
    case 'Scale':
      form.addScaleItem().setTitle(itemData.name);
      break;
    case 'Text':
      form.addTextItem().setTitle(itemData.name);
      break;
  }
}

/**
 * Queries the form DocumentProperties to determine whether the formResponse
 * trigger is enabled or not.
 *
 * @return {Boolean} True if the form submit trigger is enabled; false
 *     otherwise.
 */
function getTriggerState() {
  // Retrieve and return the information requested by the dialog.
  var properties = PropertiesService.getDocumentProperties();
  return properties.getProperty('triggerId') != null;
}

/**
 * Turns the form submit trigger on or off based on the given argument.
 *
 * @param {Boolean} enableTrigger whether to turn on the form submit
 *     trigger or not
 */
function adjustFormSubmitTrigger(enableTrigger) {
  // Use data collected from dialog to manipulate form.

  // Determine existing state of trigger on the server.
  var form = FormApp.getActiveForm();
  var properties = PropertiesService.getDocumentProperties();
  var triggerId = properties.getProperty('triggerId');

  if (!enableTrigger && triggerId != null) {
    // Delete the existing trigger.
    var triggers = ScriptApp.getUserTriggers(form);
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getUniqueId() == triggerId) {
        ScriptApp.deleteTrigger(triggers[i]);
        break;
      }
    }
    properties.deleteProperty('triggerId');
  } else if (enableTrigger && triggerId == null) {
    // Create a new trigger.
    var trigger = ScriptApp.newTrigger('respondToFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();
    properties.setProperty('triggerId', trigger.getUniqueId());
  }
}

/**
 * Responds to form submit events if a form summit trigger is enabled.
 * Collects some form information and sends it as an email to the form creator.
 *
 * @param {Object} e The event parameter created by a form
 *      submission; see
 *      https://developers.google.com/apps-script/understanding_events
 */

function respondToFormSubmit(e) {

  //Set the initial threat level to 0
  var threatLevel = 0;
  var itemResponses;
  var message;
  var senderEmail;

  //flags for conditional feedback
  var digitalSecurityFlag;
  var dangerZoneFlag;
  var securityProtocolsFlag;

  var form = FormApp.getActiveForm();
  itemResponses = e.response.getItemResponses();
  message = 'Hello '+ itemResponses[1].getResponse() +','+'\n';
  senderEmail = itemResponses[2].getResponse();

//count threat

//'There have been ' + form.getResponses().length +
     //' response(s) so far. Latest Response:\n';

    for (var i = 0; i < itemResponses.length; i++) {
      var itemTitle = itemResponses[i].getItem().getTitle();
      var itemResponse = itemResponses[i].getResponse();


      //Have YOU, Your Colleagues, or Colleagues in your Area been threatened
      if(i == 7){
        if(itemResponse == "Yes" || itemResponse == "Si")
           threatLevel += 20;
      }

      //Have colleagues in your organization been threatened or suffered an aggression as journalists over the last year?
       if(i == 8){
        if(itemResponse == "Yes" || itemResponse == "Si")
           threatLevel += 20;
      }

      //Have colleagues in your area been threatened or suffered an aggression as journalists over the last year?
      if(i == 9){
        if(itemResponse == "Yes" || itemResponse == "Si")
           threatLevel += 20;
      }


      //for questions security and censorship
      if(i == 10 || i ==  11){
        var valueThisTime;
          valueThisTime = WordCount("Never", itemResponse);// english
            threatLevel += (1 * valueThisTime);
          valueThisTime = WordCount("Nunca", itemResponse);// spanish
            threatLevel += (1 * valueThisTime);
          valueThisTime = WordCount("Sometimes", itemResponse);
            threatLevel += (2 * valueThisTime);
          valueThisTime = WordCount("A veces", itemResponse);
            threatLevel += (2 * valueThisTime);
          valueThisTime = WordCount("Regularly", itemResponse);
            threatLevel += (3 * valueThisTime);
          valueThisTime = WordCount("Regularmente", itemResponse);
            threatLevel += (3 * valueThisTime);
           valueThisTime = WordCount("Often", itemResponse);
            threatLevel += (4  * valueThisTime);
          valueThisTime = WordCount("Con mucha frecuencia", itemResponse);
            threatLevel += (4 * valueThisTime);
          valueThisTime = WordCount ("Very Often", itemResponse);
            threatLevel += (5 * valueThisTime);
          valueThisTime = WordCount ("Todos los Dias", itemResponse);
            threatLevel += (5 * valueThisTime);



        }


      //Professional Situation
      if(i == 12){
         var valueThisTime;
          valueThisTime = WordCount("Very often",itemResponse);
            threatLevel += 1 * valueThisTime;
          valueThisTime = WordCount("Todos los dias",itemResponse);
            threatLevel += 1 * valueThisTime;
          valueThisTime = WordCount("Often", itemResponse);
            threatLevel += 2 * valueThisTime;
          valueThisTime = WordCount("Con mucha frecuencia", itemResponse);
            threatLevel += 2 * valueThisTime;
          valueThisTime = WordCount("Regularly", itemResponse);
            threatLevel += 3 * valueThisTime;
          valueThisTime = WordCount("Regularmente", itemResponse);
            threatLevel += 3 * valueThisTime;
           valueThisTime = WordCount("Sometimes", itemResponse);
            threatLevel += 4  * valueThisTime;
          valueThisTime = WordCount("A veces", itemResponse);
            threatLevel += 4 * valueThisTime;
          valueThisTime = WordCount ("Never", itemResponse);
            threatLevel += 5 * valueThisTime;
          valueThisTime = WordCount ("Nunca", itemResponse);
            threatLevel += 5 * valueThisTime;
      }

      //Support Networks & Labor Security
      if(i == 13 || 14){
        var valueThisTime;
          valueThisTime = WordCount("Excellent",itemResponse);
            threatLevel += 1 * valueThisTime;
          valueThisTime = WordCount("Excelente",itemResponse);
            threatLevel += 1 * valueThisTime;
          valueThisTime = WordCount("Good", itemResponse);
            threatLevel += 2 * valueThisTime;
          valueThisTime = WordCount("Buena", itemResponse);
            threatLevel += 2 * valueThisTime;
          valueThisTime = WordCount("Regular", itemResponse);
            threatLevel += 3 * valueThisTime;
          valueThisTime = WordCount("Deficiente", itemResponse);
            threatLevel += 3 * valueThisTime;
           valueThisTime = WordCount("Bad", itemResponse);
            threatLevel += 4  * valueThisTime;
          valueThisTime = WordCount("Mala", itemResponse);
            threatLevel += 4 * valueThisTime;
          valueThisTime = WordCount ("Very Bad", itemResponse);
            threatLevel += 5 * valueThisTime;
          valueThisTime = WordCount ("Pésima", itemResponse);
            threatLevel += 5 * valueThisTime;
      }

      //Digital Security
      if(i == 15){
        var valueThisTime;
          valueThisTime = WordCount("Master",itemResponse);
            threatLevel += 1 * valueThisTime;
          valueThisTime = WordCount("Maestro",itemResponse);
            threatLevel += 1 * valueThisTime;
          valueThisTime = WordCount("Advanced", itemResponse);
            threatLevel += 2 * valueThisTime;
          valueThisTime = WordCount("Avanzada", itemResponse);
            threatLevel += 2 * valueThisTime;
          valueThisTime = WordCount("Intermediate", itemResponse);
            threatLevel += 3 * valueThisTime;
          valueThisTime = WordCount("Intermedia", itemResponse);
            threatLevel += 3 * valueThisTime;
           valueThisTime = WordCount("Basic", itemResponse);
            threatLevel += 4  * valueThisTime;
          valueThisTime = WordCount("Básica", itemResponse);
            threatLevel += 4 * valueThisTime;
          valueThisTime = WordCount ("None", itemResponse);
            threatLevel += 5 * valueThisTime;
          valueThisTime = WordCount ("Ninguna", itemResponse);
            threatLevel += 5 * valueThisTime;

        if(valueThisTime == "Basic" || "Básica" || "None" || "Ninguna"){
          digitalSecurityFlag = true;
        }

      }
      //  message += i + ' ' + itemTitle + ': ' + itemResponse + ' ' + threatLevel+ '\n';
    }



 //build message English
  if(itemResponses[0].getResponse()=="English"){
    message += '\n'+'Based off your responses to the Threat Assessment Survey, your threat level is calculated to be ' + threatLevel+'\n'+'\n';

    if (threatLevel <=40){
     message += EnglishLowThreat();
    }

    if (threatLevel > 40 && threatLevel <= 59){
      message += EnglishMedThreat();
    }

    if (threatLevel > 60 && threatLevel <= 79){
     message += EnglishHighThreat();
    }

    if (threatLevel > 80){
     message += EnglishExtThreat();
    }

    if(digitalSecurityFlag == true){
     message +=  'Digital Security'+'\n';
     message +=  'You need to better with your digital security. Your information is at risk of being lost, attacked. You may need to protect your information with encrypting tools and good practices.'+'\n'+'\n';
    }

    message += 'We hope this tool has been useful to you in forming your security plans.';
  }

//build message Spanish
  if(itemResponses[0].getResponse()=="Español"){
    message += '\n'+'Need Spanish translation: Based off your responses to the Threat Assessment Survey, your threat level is calculated to be ' + threatLevel+'\n'+'\n';

    if (threatLevel <=40){
      message += SpanishLowThreat();
    }

   if (threatLevel > 40 && threatLevel <= 59){
      message += SpanishMedThreat();
    }

    if (threatLevel > 60 && threatLevel <= 79){
      message += SpanishHighThreat();
    }

    if (threatLevel > 80){
      message += SpanishExtThreat();
    }

     if(digitalSecurityFlag == true){
     message +=  'Seguridad Digital'+'\n';
     message +=  'Debes mejorar tu seguridad digital. Tu información está en riesgo de sufrir pérdida, ataques. Podrías necesitar la protección de tus datos e información mediante herramientas de encriptación y buenas prácticas.'+'\n'+'\n';
    }

    message += 'Esperamos que esta herramienta ha sido útil para usted en la formación de sus planes de seguridad.';
  }


//send email
    MailApp.sendEmail(
      senderEmail,
        'Results of Threat Assessment Survey'/* + form.getTitle()*/,
       message );
}

function WordCount(subString, string, allowOverlapping) {
   string+=""; subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=allowOverlapping?1:subString.length;

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ ++n; pos+=step; } else break;
    }
    return n;
}

function EnglishLowThreat(){
  var messageb;
   messageb +=  '**Low risk:** '+'\n';
      messageb +=  'Your level of risk is low. Be prepared to recognize any operation or situation that can increase your risk. Keep focus preventive protocols.'+'\n'+'\n';
      messageb +=  'Immediate steps: '+'\n';
      messageb +=  'Action 1: Keep contact to your media organization and set a process to discuss courses of action and steps to take. '+'\n';
      messageb +=  'Action 2: Analyze what is wrong in any operation that would increase your risk. '+'\n';
      messageb +=  'Action 3: Create and maintain trust networks. '+'\n';
      messageb +=  'Action 4: Get familiar to these organizations in case of need: '+'\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb +=  '\n';
      messageb +=  'Other courses of action: '+'\n';
      messageb +=  'Create a security strategy: A security strategy is a document revised periodically which outlines the major security concerns of a person or media organization and outlines plans to reduce risks and face those concerns. You need to discuss this situation with your media organization and conduct an in-depth analysis of the threats you are facing, the main vulnerabilities and strengths you have, and set up your security goals.reate security protocols. A protocol is a sequence of operations that ensure your physical, psychological, legal or digital security. Create and follow preventive protocols to face current potential threats, increase you capacities and work to reduce vulnerabilities. Prepare yourself for sudden changes in your security level. '+'\n';
      messageb +=   '\n'+'\n';
  return messageb;
}

function EnglishMedThreat(){
  var messageb;
      messageb +=  '**Moderate Risk:** '+'\n';
      messageb +=  'You are under a potential moderate risk, meaning a moderate damage to your physical, psychological, legal or digital integrity. Insults, bad treatment, defamation campaigns, some cyber-attacks, are examples of these risks. Evaluate operations that are putting you in higher levels of risk. Be aware of any corrective actions you need to take and eliminate any unacceptable risk. You will probably need to improve some prevention protocols.'+'\n'+'\n';
      messageb +=  'Immediate steps: '+'\n';
      messageb +=  'Action 1: Analize any operation that could increase your risk level.'+'\n';
      messageb +=  'Action 2: Talk to your media organizations and discuss regularly with your colleagues aobut the security environment.'+'\n';
      messageb +=  'Action 3. Create and maintain networks of support.'+'\n';
      messageb +=  'Action 4: Get familiar to these organizations in case of need:'+'\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb +=  '\n';
      messageb +=  'Other courses of action: '+'\n';
      messageb +=  'Create a security strategy: A security strategy is a document revised periodically which outlines the major security concerns of a person or media organization and outlines plans to reduce risks and face those concerns. You need to discuss this situation with your media organization and conduct an in-depth analysis of the threats you are facing, the main vulnerabilities and strengths you have, and set up your security goals.reate security protocols. A protocol is a sequence of operations that ensure your physical, psychological, legal or digital security. Create and follow preventive protocols to face current potential threats, increase you capacities and work to reduce vulnerabilities. Prepare yourself for sudden changes in your security level. '+'\n';
      messageb +=  'Create security protocols. A protocol is a sequence of operations that ensure your physical, psychological, legal or digital security. Create and follow preventive protocols to face current potential threats, increase you capacities and work to reduce vulnerabilities. Prepare yourself for sudden changes in your security level. '+'\n';
      messageb +=   '\n'+'\n';
  return messageb;
}

function EnglishHighThreat(){
  var messageb;
      messageb += '**High risk:**'+'\n';
      messageb +=  ' You reached more than 60 points and are under a potential high risk. In high levels of risk, journalists may suffer serious physical, psychological, legal or digital damage. Death threats, arbitrary arrests, beatings, cyber-attacks, are examples of these risks. You may conduct a evaluation of any operation which puts you in further risk. In your security plan, you need to add corrective actions and eliminate unacceptable risks. You will probably need to adopt or improve some protocols.' +'\n';
      messageb +=  'Immediate steps:'+'\n';
      messageb += 'Action 1: Keep contact to your media organization and set a process to discuss courses of action. '+ '\n';
      messageb += 'Action 2: Analyze what is wrong in any operation is putting you into a serious risk to suffer physical, psychological, digital, or legal damage.'+ '\n';
      messageb += 'Action 3: Report to national and/or local authorities about any threat or attempt to attack you and request urgent preventive steps to protect your physical integrity.'+ '\n';
      messageb += 'Action 4: Get familiar to these organizations in case of need:'+'\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb += 'Other courses of action:'+ '\n';
      messageb += 'Create a security strategy: A security strategy is a document revised periodically which outlines the major security concerns of a person or media organization and outlines plans to reduce risks and face those concerns. You need to discuss this situation with your media organization and conduct an in-depth analysis of the threats you are facing, the main vulnerabilities and strengths you have, and set up new goals according to the new circumstances.Create security protocols. A protocol is a sequence of operations that ensure your physical, psychological, legal or digital security. You will need to create security protocols for each situation, depending of the nature of the threat you are facing and your specific conditions of vulnerability and strength. Although each protocol should be particular to each condition, there are some operations that might be conducted in most extreme risk situations. '+ '\n';
      messageb +=   '\n'+'\n';
  return messageb;
}

function EnglishExtThreat(){
  var messageb;
      messageb += '**Extreme risk:** '+'\n';
      messageb += 'You got more than 80 points and probably are under a potential extreme risk. Under this level of risk, damage to physical, psychological, legal or digital security can be severe or catastrophic. If an attack takes place, damage may include loss of life, end of an entire company or an unaffordable financial impact. You may need to evaluate how probable it is for an attack with those impact to occur against you or your organization. If an attack with those damages are highly probably to occur, your level of risk might be unacceptable. Under these circumstances, your main task is to reduce risk, avoid such damage, regroup with your organization and take an immediate corrective action. As your risk level is extreme, you will probably need to create a new security strategy.'+ '\n';
      messageb += 'Immediate steps:'+ '\n';
      messageb += 'Action 1: Abort any operation that would put you into an imminent risk of suffering physical, psychological, digital, or legal damage in either severe or catastrophic proportions. '+ '\n';
      messageb += 'Action 2: Contact your media organization immediately and discuss potential courses of action. If you are a freelancer, contact your trust network and the media organizations you work for.'+ '\n';
      messageb += 'Action 3: Report to national and/or local authorities about any threat or attempt to attack against you or your media organization and request urgent preventive steps to protect your physical integrity.'+ '\n';
      messageb += 'Action 4: Contact immediately any of these organizations and request help:'+ '\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb +=  'Other courses of action:'+ '\n';
      messageb +=  'Create or review your security strategy: A security strategy is a document revised periodically which outlines the major security concerns of a person or media organization and outlines plans to reduce risks and face those concerns. If possible, discuss with your media organization about this situation and analyze together actual and potential threats, vulnerabilities and strengths, and set up new security goals according to the new circumstances.'+ '\n';
      messageb +=  'Create or review security protocols. A protocol is a sequence of operations that ensure your physical, psychological, legal or digital security. You will need to create security protocols for each situation, depending of the nature of the threat you are facing and your specific conditions of vulnerability and strength. '+ '\n';
      messageb +=  '\n'+'\n';
  return messageb;
}

function SpanishLowThreat(){
  var messageb;
      messageb +=  'Nivel de riesgo bajo: Entre 20 y 39 puntos.'+'\n';
      messageb +=  'Alcanzaste más de 20 puntos, lo que significa que estás en un nivel de riesgo bajo. Prepárate para reconocer cualqiuer operación que pueda colocarte en una situación de alto riesgo. Enfócate en la prevención de riesgos.'+'\n'+'\n';
      messageb +=  'Pasos inmediatos:'+'\n';
      messageb +=  'Acción 1: Analiza cualquier operación que pueda elevar tu nivel de riesgo.'+'\n';
      messageb +=  'Acción 2: Discute regularmente con tu medio sobre la situación de seguridad.'+'\n';
      messageb +=  'Action 3: Crea o únete a redes de confianza.'+'\n';
      messageb +=  'Acción 4. Familiarízate con estas organizaciones en caso de que llegues a requerir de su ayuda:'+'\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb +=  '\n';
      messageb +=  'Otras acciones: '+'\n';
      messageb +=  'Crea o revisa tu estrategia de seguridad: Una estategia de seguridad es un documento que las organizaciones deben revisar periódicamente en el que está una definición de los problemas principales de seguridad para un periodista o un medio y un plan para reducir riesgos y enfrentar esas preocupaciones. De ser posible, discute con tu medio y tu red de confianza sobre la situación y analizen juntos las amenazas reales y potenciales, fortalezas y vulnerabilidades, y definan nuevas metas de seguridad según las circunstancias.'+'\n';
      messageb +=  '\n'+'\n';
  return messageb;
}

function SpanishMedThreat(){
  var messageb;
      messageb +=  '**Nivel de riesgo moderado:** '+'\n';
      messageb +=  'Alcanzaste más de 40 puntos y estás probablemente en un riesgo potencial medio o moderado, lo que significa que los periodistas pueden sufrir ataques con daños moderados a su integridad física, psicológica, legal o digital. Insultos, maltratos, campañas de difamación, algunos ataques cibernéticos son ejemplos de estos riesgos. Toma en cuenta que estos ataques son en ocasiones un preámbulo para ataques más graves, propios de un nivel alto de riesgo. Necesitas evaluar todas las operaciones que pueden colocarte en una situación de alto riesgo. Sé consciente de las acciones correctivas que necesitas tomar y elimina riesgos inaceptables. Probablemente necesitarás adoptar o mejorar algunos protocolos preventivos de seguridad.'+'\n'+'\n';
      messageb +=  'Pasos inmediatos: '+'\n';
      messageb +=  'Acción 1: Analiza cualquier operación que pueda elevar tu nivel de riesgo.'+'\n';
      messageb +=  'Acción 2: Discute regularmente con tu medio sobre la situación de seguridad.'+'\n';
      messageb +=  'Action 3: Crea o únete a redes de confianza.'+'\n';
      messageb +=  'Acción 4. Familiarízate con estas organizaciones en caso de que llegues a requerir de su ayuda:'+'\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb +=  '\n';
      messageb +=  'Otras acciones:'+'\n';
      messageb +=  'Crea o revisa tu estrategia de seguridad: Una estategia de seguridad es un documento que las organizaciones deben revisar periódicamente en el que está una definición de los problemas principales de seguridad para un periodista o un medio y un plan para reducir riesgos y enfrentar esas preocupaciones. De ser posible, discute con tu medio y tu red de confianza sobre la situación y analizen juntos las amenazas reales y potenciales, fortalezas y vulnerabilidades, y definan nuevas metas de seguridad según las circunstancias.'+'\n';
      messageb +=  'Crear o revisar los protocolos de seguridad. Un protocolo de seguridad es una secuencia de operaciones que aseguren la integridad física, psicológica, legal o digital. Será necesaria la creación de protocolos de seguridad para cada situación, dependiendo de la naturaleza de la amenaza y las condiciones específicas de viulnerabilidad y fortaleza. '+'\n';
      messageb +=   '\n'+'\n';
  return messageb;
}

function SpanishHighThreat(){
  var messageb;
      messageb += '**Nivel de riesgo alto:**'+'\n';
      messageb +=  'Más de 60 puntos. Alcanzaste más de 60 puntos y estás probablemente en un riesgo potencial alto. En estos niveles de riesgo, los periodistas pueden sufrir ataques con daños serios a su integridad física, psicológica, legal o digital. Amenazas de muerte, detenciones arbitrarias, golpizas, ataques cibernéticos, son ejemplos de estos riesgos. Necesitas evaluar todas las operaciones que te colocan en una situación de alto riesgo. En tu plan de seguridad, necesitas tomar acciones correctivas y eliminar riesgos inaceptables. Probablemente necesitarás adoptar o mejorar algunos protocolos de seguridad.' +'\n';
      messageb +=  'Pasos inmediatos:'+'\n';
      messageb +=  'Acción 1: Evita cualquier operación que pueda conducir a un ataque con daños graves o catastróficos.'+ '\n';
      messageb +=  'Acción 2. Analiza qué falla en tus protocolos de seguridad contribuye a colocarte en un riesgo alto.'+ '\n';
      messageb +=  'Acción 3: Contacta a tu medio y discute posibles cursos de acción. Si eres un freelance, acércate con tu red de confianza y contacta al medio para el cual trabajas.'+ '\n';
      messageb +=  'Acción 4: Reporta a las autoridades locales, estatales o nacionales cualquier intento o amenaza de ataque en contra tuya o de tu organización y exige medidas precautorias para proteger tu integridad física.:'+'\n';
      messageb +=  'Acción 5. Contacta a cualquiera de estas organizaciones y solicita ayuda:'+'\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb += 'Otras acciones:'+ '\n';
      messageb += 'Crea o revisa tu estrategia de seguridad: Una estategia de seguridad es un documento que las organizaciones deben revisar periódicamente en el que está una definición de los problemas principales de seguridad para un periodista o un medio y un plan para reducir riesgos y enfrentar esas preocupaciones. De ser posible, discute con tu medio y tu red de confianza sobre la situación y analizen juntos las amenazas reales y potenciales, fortalezas y vulnerabilidades, y definan nuevas metas de seguridad según las circunstancias.'+ '\n';
      messageb += 'Crear o revisar los protocolos de seguridad. Un protocolo de seguridad es una secuencia de operaciones que aseguren la integridad física, psicológica, legal o digital. Será necesaria la creación de protocolos de seguridad para cada situación, dependiendo de la naturaleza de la amenaza y las condiciones específicas de viulnerabilidad y fortaleza.'+ '\n';
      messageb +=   '\n'+'\n';
  return messageb;
}

function SpanishExtThreat(){
   var messageb;
      messageb += '**Nivel de riesgo extremo:** '+'\n';
      messageb += 'Alcanzaste más de 80 puntos y tu riesgo puede alcanzar potencialmente un nivel extremo. En estos niveles de riesgo, el daño a la integridad física, psicológica, legal o digital puede ser severo o catastrófico. En caso de un ataque, el daño puede ir desde la pérdida de la vida, el fin de la empresa periodística o un impacto financiero devastador. Necesitarás evaluar qué tan probable es un ataque con un impacto extremo contra ti o tu organización. Si un ataque semejante con esa magnitud del daño tiene una alta probabilidad de ocurrir, entonces tu nivel de riesgo es inaceptable. En esas circunstancias, tu tarea principal es reducir el riesgo, evitar el daño grave o catastrófico, reagruparte con tu organización y tomar una acción correctiva inmediata. Como tu riesgo potencial es extremo, probablemente necesites crear una nueva estrategia de seguridad.'+ '\n';
      messageb += 'Pasos inmediatos:'+ '\n';
      messageb += 'Acción 1: Aborta cualquier operación que pueda conducir a un ataque con daños graves o catastróficos.  '+ '\n';
      messageb += 'Acción 2: Contacta a tu medio y discute posibles cursos de acción. Si eres un freelance, acércate con tu red de confianza y contacta al medio para el cual trabajas.'+ '\n';
      messageb += 'Acción 3: Reporta a las autoridades locales, estatales o nacionales cualquier intento o amenaza de ataque en contra tuya o de tu organización y exige medidas precautorias para proteger tu integridad física.'+ '\n';
      messageb += 'Acción 4. Contacta a cualquiera de estas organizaciones y solicita ayuda:'+ '\n';
      messageb +=  ' - Committee to Protect Journalists '+'\n';
      messageb +=  '   https://www.cpj.org/campaigns/assistance/how-to-get-help.php '+'\n';
      messageb +=  ' - Reporters Without Borders '+'\n';
      messageb +=  '   http://en.rsf.org/a-hotline-for-journalists-in-17-04-2007,21749.html '+'\n';
      messageb +=  ' - International News Safety Institute '+'\n';
      messageb +=  '   http://www.newssafety.org/contact/ '+'\n';
      messageb +=  ' - Article 19 '+'\n';
      messageb +=  '   http://www.article19.org/pages/en/contact-us.html '+'\n';
      messageb +=  ' - Rory Peck Trust '+'\n';
      messageb +=  '   https://rorypecktrust.org/Contact '+ '\n';
      messageb += 'Otras acciones:'+ '\n';
      messageb += 'Crea o revisa tu estrategia de seguridad: Una estategia de seguridad es un documento que las organizaciones deben revisar periódicamente en el que está una definición de los problemas principales de seguridad para un periodista o un medio y un plan para reducir riesgos y enfrentar esas preocupaciones. De ser posible, discute con tu medio y tu red de confianza sobre la situación y analizen juntos las amenazas reales y potenciales, fortalezas y vulnerabilidades, y definan nuevas metas de seguridad según las circunstancias.'+ '\n';
      messageb += 'Crear o revisar los protocolos de seguridad. Un protocolo de seguridad es una secuencia de operaciones que aseguren la integridad física, psicológica, legal o digital. Será necesaria la creación de protocolos de seguridad para cada situación, dependiendo de la naturaleza de la amenaza y las condiciones específicas de viulnerabilidad y fortaleza.'+ '\n';
      messageb +=   '\n'+'\n';
  return messageb;
}
