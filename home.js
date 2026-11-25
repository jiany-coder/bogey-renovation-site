/* Accueil : messages de validation clairs en français + état du message d'envoi. */
(function(){
  var M={nom:'Indiquez votre nom.',telephone:'Indiquez votre numéro pour que nous puissions vous rappeler.',commune:'Indiquez la commune du chantier.',email:'Cette adresse e-mail semble incorrecte.'};
  document.querySelectorAll('form.lead,form.lead2').forEach(function(f){
    f.querySelectorAll('input,select,textarea').forEach(function(el){
      el.addEventListener('invalid',function(){
        var v=el.validity,n=el.name;
        if(v.valueMissing){el.setCustomValidity(M[n]||'Ce champ est obligatoire.')}
        else if(v.patternMismatch){el.setCustomValidity('Vérifiez votre numéro : 10 chiffres, par exemple 06 12 34 56 78.')}
        else if(v.typeMismatch){el.setCustomValidity(M[n]||'Valeur incorrecte.')}
        else if(v.tooShort){el.setCustomValidity('Un peu plus de caractères, s’il vous plaît.')}
      });
      el.addEventListener('input',function(){el.setCustomValidity('')});
    });
    var m=f.querySelector('.msg');
    if(m&&window.MutationObserver){
      new MutationObserver(function(){
        m.setAttribute('data-state',/impossible/i.test(m.textContent)?'err':'ok');
      }).observe(m,{childList:true,characterData:true,subtree:true});
    }
  });
  document.querySelectorAll('.ba input').forEach(function(r){var ba=r.closest('.ba');function u(){ba.style.setProperty('--p',r.value+'%')}r.addEventListener('input',u);u()});
})();
