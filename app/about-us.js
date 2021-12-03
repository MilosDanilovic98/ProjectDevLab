var testimonials = document.getElementById('testimonials');
var control1 = document.getElementById('control1');
var control2 = document.getElementById('control2');
var control3 = document.getElementById('control3');

control1.onclick = function () {
    // testimonials.style.setProperty("transform", "translate(870px)", "important");
    testimonials.classList.add("first")
    testimonials.classList.remove("sec")
    testimonials.classList.remove("third")

    control1.classList.add("active")
    control2.classList.remove("active")
    control3.classList.remove("active")
}
control2.onclick = function () {
    testimonials.classList.add("sec")
    testimonials.classList.remove("first")
    testimonials.classList.remove("third")

    control1.classList.remove("active")
    control2.classList.add("active")
    control3.classList.remove("active")
}
control3.onclick = function () {
    testimonials.classList.add("third")
    testimonials.classList.remove("sec")
    testimonials.classList.remove("first")

    control1.classList.remove("active")
    control2.classList.remove("active")
    control3.classList.add("active")
}
