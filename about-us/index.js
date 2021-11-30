var testimonials = document.getElementById('testimonials');
var control1 = document.getElementById('control1');
var control2 = document.getElementById('control2');
var control3 = document.getElementById('control3');

control1.onclick = function()
{
    testimonials.style.transform = "translate(870px)";
    control1.classList.add("active")
    control1.classList.remove("active")
    control1.classList.remove("active")
}
control2.onclick = function()
{
    testimonials.style.transform = "translate(0px)";
    control1.classList.remove("active")
    control1.classList.add("active")
    control1.classList.remove("active")
}
control3.onclick = function()
{
    testimonials.style.transform = "translate(-870px)";
    control1.classList.remove("active")
    control1.classList.remove("active")
    control1.classList.add("active")
}