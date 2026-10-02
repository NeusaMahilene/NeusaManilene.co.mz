/* =========================================================
   NEUSA DIGITAL SERVICES
   SCRIPT.JS — FUNCIONALIDADES DO SITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MENU MOBILE
       ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.textContent = isOpen ? "×" : "☰";
        });


        /* Fechar menu quando clicar num link */

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";
            });

        });


        /* Fechar menu quando clicar fora */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";
            }

        });


        /* Fechar menu ao aumentar o ecrã */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 780) {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";
            }

        });

    }


    /* =====================================================
       2. CABEÇALHO AO FAZER SCROLL
       ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       3. ANIMAÇÃO DAS SECÇÕES
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       4. SCROLL SUAVE PARA LINKS INTERNOS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       5. ANO AUTOMÁTICO DO COPYRIGHT
       ===================================================== */

    const currentYear =
        new Date().getFullYear();

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {

        element.textContent = currentYear;

    });


    /* =====================================================
       6. FECHAR MENU COM ESC
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        if (
            menuButton &&
            mobileMenu &&
            mobileMenu.classList.contains("open")
        ) {

            mobileMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";
        }

    });


    /* =====================================================
       7. GARANTIR ESTADO INICIAL DO MENU
       ===================================================== */

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }


    /* =====================================================
       8. LOG DE TESTE
       ===================================================== */

    console.log(
        "Neusa Digital Services — site carregado correctamente."
    );

});
