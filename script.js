document.addEventListener("DOMContentLoaded",()=>{
  const nav=document.querySelector("#nav"), toggle=document.querySelector(".menu-toggle");
  if(toggle&&nav){toggle.addEventListener("click",()=>nav.classList.toggle("open"));document.addEventListener("click",e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))nav.classList.remove("open")})}

  // Persistent cart
  let cart=JSON.parse(localStorage.getItem("jlCart")||"[]");
  const updateCart=()=>{document.querySelectorAll("#cartCount").forEach(x=>x.textContent=cart.length);const ci=document.querySelector("#cartItems");if(ci)ci.textContent=cart.length;const msg=document.querySelector("#cartMessage");if(msg)msg.textContent=cart.length?cart.map(x=>x+" ✓").join(" · "):"Your bag is waiting for a good pair."};
  updateCart();
  document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>{cart.push(btn.dataset.add);localStorage.setItem("jlCart",JSON.stringify(cart));updateCart();showToast(btn.dataset.add+" added to your bag.")}));
  const checkout=document.querySelector("#checkout");if(checkout)checkout.addEventListener("click",()=>showToast(cart.length?"Demo checkout ready — connect a payment gateway for a live store.":"Your bag is empty. Pick a pair first!"));

  // Wishlist mouse events
  document.querySelectorAll("[data-wish]").forEach(btn=>btn.addEventListener("click",()=>{btn.classList.toggle("liked");btn.textContent=btn.classList.contains("liked")?"♥":"♡";showToast(btn.classList.contains("liked")?"Added to wishlist.":"Removed from wishlist.")}));

  // Product filter DOM events
  const filters=document.querySelectorAll(".filter"), cards=document.querySelectorAll(".shop-grid .product-card"), result=document.querySelector("#resultCount");
  filters.forEach(f=>f.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));f.classList.add("active");const type=f.dataset.filter;let count=0;cards.forEach(c=>{const show=type==="all"||c.dataset.category===type;c.style.display=show?"":"none";if(show)count++});if(result)result.textContent=count+" pairs"}));

  // Search overlay + keyboard event
  const searchBtn=document.querySelector("#searchBtn"), panel=document.querySelector("#searchPanel"), close=document.querySelector("#closeSearch"), input=document.querySelector("#searchInput");
  if(searchBtn&&panel){searchBtn.addEventListener("click",()=>{panel.classList.add("open");input&&input.focus()});close&&close.addEventListener("click",()=>panel.classList.remove("open"));document.addEventListener("keydown",e=>{if(e.key==="Escape")panel.classList.remove("open");if(e.key==="Enter"&&document.activeElement===input){window.location.href="shop.html"}})}

  // Contact form validation
  const form=document.querySelector("#contactForm");
  if(form)form.addEventListener("submit",e=>{e.preventDefault();const fields=[...form.querySelectorAll("input,select,textarea")];let ok=true;fields.forEach(f=>{f.classList.remove("invalid");if(!f.value.trim()){f.classList.add("invalid");ok=false}});const email=document.querySelector("#email");if(email&&email.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){email.classList.add("invalid");ok=false}if(!ok){showToast("Please complete the highlighted fields.");return}form.reset();showToast("Message sent — we'll get back to you soon.")});

  // Newsletter
  const news=document.querySelector("#newsletter");if(news)news.addEventListener("submit",e=>{e.preventDefault();showToast("You're on the list. See you at the next drop!");news.reset()});

  // FAQ click events
  document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>{const a=q.nextElementSibling;a.classList.toggle("open");q.querySelector("span").textContent=a.classList.contains("open")?"−":"+"}));

  // Animated counters on scroll
  const counters=document.querySelectorAll(".counter");let done=false;function count(){if(done||!counters.length)return;const first=counters[0];if(first.getBoundingClientRect().top>innerHeight*.85)return;done=true;counters.forEach(c=>{const target=+c.dataset.target,start=performance.now();const tick=now=>{const p=Math.min((now-start)/900,1);c.textContent=Math.floor(p*target);if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}window.addEventListener("scroll",count);count();

  function showToast(text){let t=document.querySelector(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000)}
});