(function () {
  "use strict";

  var yearEls = document.querySelectorAll("[data-year]");
  var y = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = String(y);
  });

  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-nav-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.querySelector("[data-contact-form]");
  var out = document.querySelector("[data-form-out]");
  if (form && out) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = String(fd.get("name") || "").trim();
      var contact = String(fd.get("contact") || "").trim();
      var message = String(fd.get("message") || "").trim();
      var marketing = fd.get("accept_marketing") ? "да" : "нет";

      var text =
        "Заявка с сайта\n\n" +
        "Имя: " +
        name +
        "\n" +
        "Контакт: " +
        contact +
        "\n\n" +
        "Задача:\n" +
        message +
        "\n\n" +
        "Маркетинг: " +
        marketing;

      var mailto =
        "mailto:hello@example.com?subject=" +
        encodeURIComponent("Заявка: " + name) +
        "&body=" +
        encodeURIComponent(text);

      out.hidden = false;
      out.innerHTML =
        "<p style=\"margin:0 0 10px;color:#e8eaef\">Текст заявки (можно вставить в Telegram):</p>" +
        "<pre style=\"margin:0 0 14px;white-space:pre-wrap;word-break:break-word;font:inherit;font-size:0.9rem\">" +
        text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") +
        "</pre>" +
        "<p style=\"margin:0\"><a class=\"inline-link\" href=\"" +
        mailto.replace(/"/g, "&quot;") +
        "\">Открыть письмо в почте</a></p>";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
      }
    });
  }
})();
