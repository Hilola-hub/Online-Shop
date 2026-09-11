document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const mobileMenu = document.getElementById("mobileMenu");
    const navMenu = document.getElementById("navMenu");

    mobileMenu.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });

    document.querySelectorAll("nav a").forEach(function (link) {

        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
        });

    });


    /* ================= SEARCH + FILTER ================= */

    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".category");
    const products = document.querySelectorAll(".product-card");
    const noResults = document.getElementById("noResults");

    let currentCategory = "all";


    function filterProducts() {

        const searchValue =
            searchInput.value.toLowerCase().trim();

        let visible = 0;


        products.forEach(function (product) {

            const name =
                product.dataset.name.toLowerCase();

            const category =
                product.dataset.category;


            const categoryMatch =
                currentCategory === "all" ||
                category === currentCategory;


            const searchMatch =
                name.includes(searchValue);


            if (categoryMatch && searchMatch) {

                product.style.display = "";

                visible++;

            } else {

                product.style.display = "none";

            }

        });


        if (visible === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            filterProducts();

        });

    });


    searchInput.addEventListener(
        "input",
        filterProducts
    );


    /* ================= HEARTS ================= */

    const hearts =
        document.querySelectorAll(".heart");


    hearts.forEach(function (heart) {

        heart.addEventListener("click", function () {

            heart.classList.toggle("liked");


            if (heart.classList.contains("liked")) {

                heart.textContent = "♥";

            } else {

                heart.textContent = "♡";

            }

        });

    });


    /* ================= SHOPPING CART ================= */

    let cart = [];


    const cartBtn =
        document.getElementById("cartBtn");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const closeCart =
        document.getElementById("closeCart");

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkout =
        document.getElementById("checkout");

    const toast =
        document.getElementById("toast");


    /* ADD TO CART */

    document.querySelectorAll(".add-cart")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const name =
                    button.dataset.name;

                const price =
                    Number(button.dataset.price);


                const existing =
                    cart.find(function (item) {

                        return item.name === name;

                    });


                if (existing) {

                    existing.quantity++;

                } else {

                    cart.push({

                        name: name,
                        price: price,
                        quantity: 1

                    });

                }


                updateCart();

                showToast();

            });

        });


    /* UPDATE CART */

    function updateCart() {

        let totalItems = 0;

        let totalPrice = 0;


        cart.forEach(function (item) {

            totalItems += item.quantity;

            totalPrice +=
                item.price * item.quantity;

        });


        cartCount.textContent =
            totalItems;


        cartTotal.textContent =
            "$" + totalPrice.toFixed(2);


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <div>🧁</div>

                    <h3>Your cart is empty</h3>

                    <p>
                        Add something delicious!
                    </p>

                </div>

            `;

            return;

        }


        cartItems.innerHTML = "";


        cart.forEach(function (item, index) {

            const element =
                document.createElement("div");


            element.className =
                "cart-item";


            element.innerHTML = `

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price.toFixed(2)}
                        × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(element);

        });


        document.querySelectorAll(".remove-item")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(button.dataset.index);

                        cart.splice(index, 1);

                        updateCart();

                    }
                );

            });

    }


    /* OPEN CART */

    cartBtn.addEventListener("click", function () {

        cartOverlay.classList.add("show");

        document.body.classList.add("no-scroll");

    });


    /* CLOSE CART */

    closeCart.addEventListener("click", function () {

        cartOverlay.classList.remove("show");

        document.body.classList.remove("no-scroll");

    });


    cartOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === cartOverlay) {

                cartOverlay.classList.remove("show");

                document.body.classList.remove("no-scroll");

            }

        }
    );


    /* ================= TOAST ================= */

    function showToast() {

        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove("show");

        }, 2000);

    }


    /* ================= CHECKOUT ================= */

    checkout.addEventListener("click", function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty! Please add a sweet first. 🧁"
            );

            return;

        }


        alert(
            "Thank you for choosing The Magical World of Sweets! 💕\n\n" +
            "Your order is ready to be processed."
        );

    });


    /* ================= NEWSLETTER ================= */

    const newsletterForm =
        document.getElementById("newsletterForm");


    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            alert(
                "Welcome to our sweet world! ✨💕"
            );


            newsletterForm.reset();

        }
    );


    /* ================= INITIAL ================= */

    updateCart();

});