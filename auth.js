// auth.js - بسيط: تسجيل/تسجيل دخول باستخدام localStorage
function openAuth(){
  const mode = confirm('هل لديك حساب؟ اضغط موافق لتسجيل الدخول، إلغاء لعمل حساب جديد');
  if(window.FirebaseService && window.FirebaseService.enabled){
    if(mode){
      const email = prompt('أدخل بريدك الإلكتروني:');
      const pass = prompt('أدخل كلمة المرور:');
      if(!email||!pass){ alert('مطلوب'); return }
      window.FirebaseService.signInEmail(email,pass).then(res=>{ localStorage.setItem('overstore_user', JSON.stringify({email})); alert('تم تسجيل الدخول (Firebase)'); document.getElementById('loginBtn').textContent = 'حسابك' }).catch(e=>{console.error(e); alert('خطأ في تسجيل الدخول');});
    } else {
      const email = prompt('أدخل بريدك الإلكتروني للتسجيل:');
      const pass = prompt('أدخل كلمة مرور:');
      if(!email||!pass){ alert('مطلوب'); return }
      window.FirebaseService.createUserEmail(email,pass).then(res=>{ localStorage.setItem('overstore_user', JSON.stringify({email})); alert('تم إنشاء الحساب وتسجيل الدخول (Firebase)'); document.getElementById('loginBtn').textContent='حسابك'; }).catch(e=>{console.error(e); alert('خطأ في إنشاء الحساب');});
    }
  } else {
    // local fallback
    if(mode){ // login
      const email = prompt('أدخل بريدك الإلكتروني:');
      const pass = prompt('أدخل كلمة المرور:');
      if(!email||!pass){ alert('مطلوب'); return }
      const users = JSON.parse(localStorage.getItem('overstore_users')||'[]');
      const u = users.find(x=>x.email===email && x.pass===pass);
      if(u){ localStorage.setItem('overstore_user', JSON.stringify(u)); alert('تم تسجيل الدخول'); document.getElementById('loginBtn').textContent = 'حسابك' }
      else alert('بيانات غير صحيحة');
    } else { // signup
      const email = prompt('أدخل بريدك الإلكتروني للتسجيل:');
      const pass = prompt('أدخل كلمة مرور:');
      if(!email||!pass){ alert('مطلوب'); return }
      const users = JSON.parse(localStorage.getItem('overstore_users')||'[]');
      if(users.find(x=>x.email===email)){ alert('المستخدم موجود'); return }
      const u = {email,pass,name:email.split('@')[0]}; users.push(u); localStorage.setItem('overstore_users', JSON.stringify(users)); localStorage.setItem('overstore_user', JSON.stringify(u)); alert('تم إنشاء الحساب وتسجيل الدخول'); document.getElementById('loginBtn').textContent='حسابك';
    }
  }
}

// On load: if logged in, change button text
document.addEventListener('DOMContentLoaded',()=>{
  const u = JSON.parse(localStorage.getItem('overstore_user')||'null');
  if(u) document.getElementById('loginBtn').textContent='حسابك';
});
