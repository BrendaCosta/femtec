//GainTime v2.2.2 - BlackPower
function makeA(e) {
    e.addEventListener("click", function(t) {
        var n = e.href.split("/"),
            o = n[n.length - 1].split("#"),
            a = document.location.toString().split("/"),
            l = a[a.length - 1].split("#");
        if (f = o[1], void 0 != f && l[0] === o[0]) {
            t.preventDefault();
            var r = document.scrollingElement || document.documentElement,
                i = document.getElementById(f).offsetTop - 60;
            smoothScroll(r, i, 600)
        }
    })
}

function menuToggle(e) {
    var t = e.nextElementSibling;
    e.addEventListener("click", function(e) {
        e.stopPropagation(), t.style.maxWidth ? t.style.removeProperty("max-width") : t.style.maxWidth = "400px"
    })
}

function closeMenus() {
    menuToggles.forEach(function(e) {
        e.nextElementSibling.style.removeProperty("max-width")
    })
}

function makeDropdown(e) {
    e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"), e.addEventListener("click", function(t) {
        t.stopPropagation(), toogleDropdown(e)
    }), e.addEventListener("keypress", function(t) {
        13 === t.keyCode && (t.preventDefault(), toogleDropdown(e)), 27 === t.keyCode && closeDropdowns()
    })
}

function toogleDropdown(e) {
    var t = e.getElementsByTagName("ul")[0],
        n = !!t.style.display;
    closeDropdowns(), n ? t.style.removeProperty("display") : t.style.display = "list-item"
}

function closeDropdowns() {
    dropdowns.forEach(function(e) {
        e.getElementsByTagName("ul")[0].style.removeProperty("display")
    })
}

function bar(e) {
    var t = document.createElement("div");
    t.setAttribute("class", "percentage " + e.dataset.color), t.setAttribute("style", "width: " + e.dataset.percentage);
    var n = document.createTextNode(e.dataset.text);
    if ("undefined" != n.data) {
        var o = document.createElement("span");
        o.appendChild(n), o.style.padding = "0 10px", t.appendChild(o), e.style.height = "20px"
    }
    e.appendChild(t)
}

function tooltip(e) {
    e.style.position = "relative";
    var t = document.createTextNode(e.dataset.tooltip),
        n = document.createElement("div");
    n.appendChild(t), n.setAttribute("class", "tooltip"), e.appendChild(n)
}

function close(e) {
    e.addEventListener("click", function(t) {
        t.stopPropagation(), remove(e.parentElement)
    })
}

function fadeOut(e) {
    function t() {
        e.style.opacity = "0", e.style.padding = "0", e.style.maxHeight = "0px", clearInterval(n)
    }
    var n = setInterval(t, 1)
}

function remove(e) {
    e.parentElement.removeChild(e)
}

function ask(e) {
    e.addEventListener("click", function(t) {
        return confirm(e.dataset.ask) ? void 0 : (t.preventDefault(), !1)
    })
}

function closeModal(e) {
    e.addEventListener("click", function(t) {
        t.stopPropagation(), e.parentElement.parentElement.removeAttribute("style")
    })
}

var smoothScroll = function(e, t, n) {
    if (t = Math.round(t), n = Math.round(n), 0 > n) return Promise.reject("bad duration");
    if (0 === n) return e.scrollTop = t, Promise.resolve();
    var o = Date.now(),
        a = o + n,
        l = e.scrollTop,
        r = t - l,
        i = function(e, t, n) {
            if (e >= n) return 0;
            if (n >= t) return 1;
            var o = (n - e) / (t - e);
            return o * o * (3 - 2 * o)
        };
    return new Promise(function(t, n) {
        var s = e.scrollTop,
            c = function() {
                var n = Date.now(),
                    d = i(o, a, n),
                    u = Math.round(l + r * d);
                return e.scrollTop = u, n >= a ? void t() : e.scrollTop === s && e.scrollTop !== u ? void t() : (s = e.scrollTop, void setTimeout(c, 0))
            };
        setTimeout(c, 0)
    })
};
gtModals = [].slice.call(document.getElementsByClassName("gt-modal")), modals = [].slice.call(document.querySelectorAll("[data-modal]")), closeModals = [].slice.call(document.getElementsByClassName("modal-close")), askers = [].slice.call(document.querySelectorAll("[data-ask]")), as = [].slice.call(document.getElementsByTagName("a")), closes = [].slice.call(document.getElementsByClassName("close")), deletes = [].slice.call(document.getElementsByClassName("deleter")), bars = [].slice.call(document.getElementsByClassName("bar")), toValidate = [].slice.call(document.querySelectorAll("[data-validate]")), dropdowns = [].slice.call(document.querySelectorAll(".dropdown, .dropdown-right, .dropdown-left, .dropup, .dropup-left, .dropup-right")), menuToggles = [].slice.call(document.getElementsByClassName("menu-toggle")), tooltips = [].slice.call(document.querySelectorAll("[data-tooltip]")), tooltips.forEach(function(e) {
    tooltip(e)
}), menuToggles.forEach(function(e) {
    menuToggle(e)
}), bars.forEach(function(e) {
    bar(e)
}), closes.forEach(function(e) {
    close(e)
}), deletes.forEach(function(e) {
    deleter(e)
}), dropdowns.forEach(function(e) {
    makeDropdown(e)
}), as.forEach(function(e) {
    makeA(e)
}), askers.forEach(function(e) {
    ask(e)
}), toValidate.forEach(function(e) {
    formater(e), validates(e), switchValidations(e)
}), closeModals.forEach(function(e) {
    closeModal(e)
}), document.addEventListener("click", function() {
    closeMenus(), closeDropdowns()
}), gtModals.forEach(function(e) {
    e.addEventListener("click", function(t) {
        "gt-modal" == t.target.className && e.removeAttribute("style")
    })
}), document.addEventListener("keypress", function(e) {
    27 == e.keyCode && gtModals.forEach(function(e) {
        e.removeAttribute("style")
    })
}), modals.forEach(function(e) {
    e.addEventListener("click", function(t) {
        var n = document.getElementById(e.dataset.modal);
        n.parentElement.style.display = "block"
    })
});

