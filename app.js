document.querySelectorAll('form.lead, form.lead2').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var m=f.querySelector('.msg');var d=new FormData(f);
    if(d.get('_honey')){return}
    m.textContent='Envoi en cours...';
    fetch('https://formsubmit.co/ajax/renovationartisan@gmail.com',{method:'POST',headers:{'Accept':'application/json'},body:d})
      .then(function(r){if(!r.ok)throw 0;return r.json()})
      .then(function(){m.textContent='Merci, votre demande est bien envoyée. Nous vous rappelons rapidement.';f.reset()})
      .catch(function(){m.innerHTML='Envoi impossible pour le moment. Appelez-nous au <a href="tel:+33625672745">06 25 67 27 45</a>.'});
  });
});
