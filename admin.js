// admin.js - simple admin to add games to localStorage
function $(s){return document.querySelector(s)}
const form = $('#addGameForm');
const list = $('#adminList');

function loadGames(){
  const games = JSON.parse(localStorage.getItem('overstore_games')||'[]');
  list.innerHTML = '';
  games.forEach(g=>{
    const el = document.createElement('div'); el.className='game-card';
    el.innerHTML = `<div class="game-thumb"><img src="${g.img}" alt="${g.title}"/></div><div class="game-body"><h3 class="game-title">${g.title}</h3><div class="game-meta"><div>${g.category}</div><div>${g.finalPrice.toFixed(2)}$</div></div></div>`;
    list.appendChild(el);
  });
}

form.addEventListener('submit',e=>{
  e.preventDefault();
  const title = $('#gTitle').value.trim();
  const category = $('#gCategory').value;
  const price = parseFloat($('#gPrice').value);
  const img = $('#gImage').value || `https://source.unsplash.com/640x400/?game,${title.replace(/\s+/g,'')}`;
  const discount = parseInt($('#gDiscount').value)||0;
  const finalPrice = discount? +(price*(1-discount/100)).toFixed(2):price;
  // If Firebase available, add to Firestore; otherwise fallback to localStorage
  if(window.FirebaseService && window.FirebaseService.enabled){
    window.FirebaseService.addGame({title,category,price,discount,finalPrice,img,desc:'أضف وصفاً لاحقاً',isBestseller:false,isNew:true,isOffer:discount>0}).then(id=>{
      loadGames(); if(window.refreshGames) window.refreshGames(); form.reset(); alert('تمت إضافة اللعبة (Firestore)');
    }).catch(err=>{console.error(err); alert('خطأ أثناء الإضافة إلى Firebase. راجع الكونسول.');});
  } else {
    const games = JSON.parse(localStorage.getItem('overstore_games')||'[]');
    const id = 'g'+(games.length+Math.floor(Math.random()*9999));
    games.push({id,title,category,price,discount,isOffer:discount>0,finalPrice:finalPrice,img,desc:'أضف وصفاً لاحقاً',isBestseller:false,isNew:true});
    localStorage.setItem('overstore_games', JSON.stringify(games));
    loadGames();
    if(window.refreshGames) window.refreshGames();
    form.reset();
    alert('تمت إضافة اللعبة (Local)');
  }
});

document.addEventListener('DOMContentLoaded',()=>{loadGames()});
