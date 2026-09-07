document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const nav = document.querySelector("#nav");
  const toggle = document.querySelector(".menu-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("open");
      }
    });
  }


  /* =========================
     PRODUCT DATA
  ========================= */

  const products = {
    "JL-01": {
      name: "JL-01 Pulse",
      category: "Everyday / Unisex",
      price: "Rs. 4,990",
      image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1200&q=90",
      description:
        "A clean everyday sneaker designed for effortless street style. Lightweight, comfortable and easy to pair with your daily fits.",
      fit: "True to size",
      material: "Premium synthetic upper",
      delivery: "3–5 working days",
      exchange: "7-day exchange"
    },

    "JL-02": {
      name: "JL-02 Cloud",
      category: "Lifestyle / Unisex",
      price: "Rs. 5,490",
      image: "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1200&q=90",
      description:
        "Minimal, versatile and made for everyday movement. Cloud brings a soft lifestyle silhouette with a modern streetwear edge.",
      fit: "True to size",
      material: "Breathable mesh & synthetic upper",
      delivery: "3–5 working days",
      exchange: "7-day exchange"
    },

    "JL-03": {
      name: "JL-03 Street",
      category: "Street / Unisex",
      price: "Rs. 5,990",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=90",
      description:
        "Built for bold everyday looks. Street combines a chunky profile with a clean finish for an effortless urban aesthetic.",
      fit: "Relaxed fit",
      material: "Synthetic leather & rubber sole",
      delivery: "3–5 working days",
      exchange: "7-day exchange"
    },

    "JL-04": {
      name: "JL-04 Sprint",
      category: "Running / Unisex",
      price: "Rs. 5,790",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=90",
      description:
        "A lightweight performance-inspired sneaker made for active days, quick movement and comfortable everyday wear.",
      fit: "True to size",
      material: "Breathable mesh upper",
      delivery: "3–5 working days",
      exchange: "7-day exchange"
    },

    "JL-05": {
      name: "JL-05 Mono",
      category: "Street / Unisex",
      price: "Rs. 4,790",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=90",
      description:
        "A monochrome essential that works with almost anything. Simple, sharp and designed for everyday streetwear.",
      fit: "True to size",
      material: "Synthetic upper",
      delivery: "3–5 working days",
      exchange: "7-day exchange"
    },

    "JL-06": {
      name: "JL-06 Dash",
      category: "Running / Unisex",
      price: "Rs. 6,290",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",
      description:
        "A sporty everyday sneaker with a bold profile and responsive feel. Made for people who like their comfort with a little attitude.",
      fit: "True to size",
      material: "Mesh & synthetic upper",
      delivery: "3–5 working days",
      exchange: "7-day exchange"
    }
  };


  /* =========================
     CART
  ========================= */

  let cart = JSON.parse(localStorage.getItem("jlCart") || "[]");

  const updateCart = () => {

    document.querySelectorAll("#cartCount").forEach((item) => {
      item.textContent = cart.length;
    });

    const cartItems = document.querySelector("#cartItems");

    if (cartItems) {
      cartItems.textContent = cart.length;
    }

    const cartMessage = document.querySelector("#cartMessage");

    if (cartMessage) {
      cartMessage.textContent = cart.length
        ? cart.map((item) => item + " ✓").join(" · ")
        : "Your bag is waiting for a good pair.";
    }
  };

  updateCart();


  /* =========================
     ADD TO BAG
  ========================= */

  document.querySelectorAll("[data-add]").forEach((button) => {

    button.addEventListener("click", () => {

      const productName = button.dataset.add;

      cart.push(productName);

      localStorage.setItem(
        "jlCart",
        JSON.stringify(cart)
      );

      updateCart();

      showToast(
        productName + " added to your bag."
      );
    });

  });


  /* =========================
     PRODUCT DETAIL PAGE
  ========================= */

  const productPage = document.querySelector("#productPage");

  if (productPage) {

    const params = new URLSearchParams(
      window.location.search
    );

    const productId = params.get("product");

    const product = products[productId];

    if (product) {

      const image = document.querySelector("#productImage");
      const name = document.querySelector("#productName");
      const category = document.querySelector("#productCategory");
      const price = document.querySelector("#productPrice");
      const description = document.querySelector("#productDescription");
      const fit = document.querySelector("#productFit");
      const material = document.querySelector("#productMaterial");
      const delivery = document.querySelector("#productDelivery");
      const exchange = document.querySelector("#productExchange");

      if (image) {
        image.src = product.image;
        image.alt = product.name;
      }

      if (name) {
        name.textContent = product.name;
      }

      if (category) {
        category.textContent = product.category;
      }

      if (price) {
        price.textContent = product.price;
      }

      if (description) {
        description.textContent = product.description;
      }

      if (fit) {
        fit.textContent = product.fit;
      }

      if (material) {
        material.textContent = product.material;
      }

      if (delivery) {
        delivery.textContent = product.delivery;
      }

      if (exchange) {
        exchange.textContent = product.exchange;
      }

      /* SIZE SELECTION */

      document.querySelectorAll(".size-btn").forEach((button) => {

        button.addEventListener("click", () => {

          document
            .querySelectorAll(".size-btn")
            .forEach((item) => {
              item.classList.remove("active");
            });

          button.classList.add("active");

        });

      });


      /* PRODUCT PAGE ADD TO BAG */

      const productAddButton =
        document.querySelector("#productAdd");

      if (productAddButton) {

        productAddButton.addEventListener("click", () => {

          const selectedSize =
            document.querySelector(".size-btn.active");

          if (!selectedSize) {

            showToast(
              "Please select a size first."
            );

            return;
          }

          cart.push(
            product.name + " — Size " +
            selectedSize.textContent
          );

          localStorage.setItem(
            "jlCart",
            JSON.stringify(cart)
          );

          updateCart();

          showToast(
            product.name +
            " added to your bag."
          );

        });

      }


      /* WHATSAPP BUTTON */

      const whatsapp =
        document.querySelector("#productWhatsapp");

      if (whatsapp) {

        const message =
          "Hi Jootay Lelo! I'm interested in " +
          product.name +
          " (" +
          product.price +
          ").";

        whatsapp.href =
          "https://wa.me/923001234567?text=" +
          encodeURIComponent(message);

      }

    }

  }


  /* =========================
     CHECKOUT
  ========================= */

  const checkout =
    document.querySelector("#checkout");

  if (checkout) {

    checkout.addEventListener("click", () => {

      if (cart.length) {

        showToast(
          "Demo checkout ready — connect a payment gateway for a live store."
        );

      } else {

        showToast(
          "Your bag is empty. Pick a pair first!"
        );

      }

    });

  }


  /* =========================
     WISHLIST
  ========================= */

  document.querySelectorAll("[data-wish]").forEach((button) => {

    button.addEventListener("click", () => {

      button.classList.toggle("liked");

      button.textContent =
        button.classList.contains("liked")
          ? "♥"
          : "♡";

      showToast(
        button.classList.contains("liked")
          ? "Added to wishlist."
          : "Removed from wishlist."
      );

    });

  });


  /* =========================
     PRODUCT FILTER
  ========================= */

  const filters =
    document.querySelectorAll(".filter");

  const cards =
    document.querySelectorAll(
      ".shop-grid .product-card"
    );

  const result =
    document.querySelector("#resultCount");

  filters.forEach((filter) => {

    filter.addEventListener("click", () => {

      filters.forEach((item) => {
        item.classList.remove("active");
      });

      filter.classList.add("active");

      const type =
        filter.dataset.filter;

      let count = 0;

      cards.forEach((card) => {

        const show =
          type === "all" ||
          card.dataset.category === type;

        card.style.display =
          show ? "" : "none";

        if (show) {
          count++;
        }

      });

      if (result) {
        result.textContent =
          count + " pairs";
      }

    });

  });


  /* =========================
     SEARCH
  ========================= */

  const searchBtn =
    document.querySelector("#searchBtn");

  const searchPanel =
    document.querySelector("#searchPanel");

  const closeSearch =
    document.querySelector("#closeSearch");

  const searchInput =
    document.querySelector("#searchInput");


  if (searchBtn && searchPanel) {

    searchBtn.addEventListener("click", () => {

      searchPanel.classList.add("open");

      if (searchInput) {
        searchInput.focus();
      }

    });

    if (closeSearch) {

      closeSearch.addEventListener("click", () => {

        searchPanel.classList.remove("open");

      });

    }


    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        searchPanel.classList.remove("open");

      }

      if (
        event.key === "Enter" &&
        document.activeElement === searchInput
      ) {

        window.location.href =
          "shop.html";

      }

    });

  }


  /* =========================
     CONTACT FORM
  ========================= */

  const form =
    document.querySelector("#contactForm");

  if (form) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      const fields =
        [...form.querySelectorAll(
          "input, select, textarea"
        )];

      let valid = true;

      fields.forEach((field) => {

        field.classList.remove("invalid");

        if (!field.value.trim()) {

          field.classList.add("invalid");

          valid = false;

        }

      });


      const email =
        document.querySelector("#email");

      if (
        email &&
        email.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email.value
        )
      ) {

        email.classList.add("invalid");

        valid = false;

      }


      if (!valid) {

        showToast(
          "Please complete the highlighted fields."
        );

        return;

      }


      form.reset();

      showToast(
        "Message sent — we'll get back to you soon."
      );

    });

  }


  /* =========================
     NEWSLETTER
  ========================= */

  const newsletter =
    document.querySelector("#newsletter");

  if (newsletter) {

    newsletter.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        showToast(
          "You're on the list. See you at the next drop!"
        );

        newsletter.reset();

      }
    );

  }


  /* =========================
     FAQ
  ========================= */

  document
    .querySelectorAll(".faq-q")
    .forEach((question) => {

      question.addEventListener("click", () => {

        const answer =
          question.nextElementSibling;

        answer.classList.toggle("open");

        const symbol =
          question.querySelector("span");

        if (symbol) {

          symbol.textContent =
            answer.classList.contains("open")
              ? "−"
              : "+";

        }

      });

    });


  /* =========================
     ANIMATED COUNTERS
  ========================= */

  const counters =
    document.querySelectorAll(".counter");

  let counterDone = false;

  function countCounters() {

    if (
      counterDone ||
      !counters.length
    ) {
      return;
    }

    const first =
      counters[0];

    if (
      first.getBoundingClientRect().top >
      window.innerHeight * 0.85
    ) {
      return;
    }

    counterDone = true;

    counters.forEach((counter) => {

      const target =
        Number(counter.dataset.target);

      const start =
        performance.now();

      const animate = (now) => {

        const progress =
          Math.min(
            (now - start) / 900,
            1
          );

        counter.textContent =
          Math.floor(
            progress * target
          );

        if (progress < 1) {

          requestAnimationFrame(
            animate
          );

        }

      };

      requestAnimationFrame(animate);

    });

  }


  window.addEventListener(
    "scroll",
    countCounters
  );

  countCounters();


  /* =========================
     TOAST MESSAGE
  ========================= */

  function showToast(text) {

    let toast =
      document.querySelector(".toast");

    if (!toast) {

      toast =
        document.createElement("div");

      toast.className = "toast";

      document.body.appendChild(toast);

    }

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

  }

});
