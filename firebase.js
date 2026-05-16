// firebase.js — lightweight wrapper. Uses Firebase compat SDK if `window.FIREBASE_CONFIG` is provided.
(function(){
  window.FirebaseService = {enabled:false};
  function fallback(){
    window.FirebaseService = {enabled:false};
  }
  if(!window) return fallback();
  // ensure firebase scripts loaded
  if(typeof firebase === 'undefined'){
    // not loaded — nothing to do
    return fallback();
  }
  try{
    if(window.FIREBASE_CONFIG){
      firebase.initializeApp(window.FIREBASE_CONFIG);
      const auth = firebase.auth();
      const db = firebase.firestore();
      window.FirebaseService = {
        enabled:true,
        auth,
        db,
        async getGames(){
          const snap = await db.collection('games').get();
          return snap.docs.map(d=>({id:d.id,...d.data()}));
        },
        onGamesChanged(cb){
          return db.collection('games').onSnapshot(snap=>{
            const list = snap.docs.map(d=>({id:d.id,...d.data()})); cb(list);
          });
        },
        async addGame(g){
          const doc = await db.collection('games').add(g); return doc.id;
        },
        async updateGame(id, data){
          await db.collection('games').doc(id).set(data, {merge:true});
        },
        async createUserEmail(email, password){
          return auth.createUserWithEmailAndPassword(email,password);
        },
        async signInEmail(email,password){
          return auth.signInWithEmailAndPassword(email,password);
        },
        async signOut(){ return auth.signOut(); }
      };
    } else {
      return fallback();
    }
  }catch(e){
    console.error('Firebase init error',e); fallback();
  }
})();
