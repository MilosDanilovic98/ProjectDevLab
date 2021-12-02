var testimonials = document.getElementById('testimonials');
var control1 = document.getElementById('control1');
var control2 = document.getElementById('control2');
var control3 = document.getElementById('control3');

control1.onclick = function()
{
    testimonials.style.setProperty("transform", "translate(870px)", "important");
    control1.classList.add("active")
    control2.classList.remove("active")
    control3.classList.remove("active")
}
control2.onclick = function()
{
    testimonials.style.setProperty("transform", "translate(0px)", "important");
       control1.classList.remove("active")
    control2.classList.add("active")
    control3.classList.remove("active")
}
control3.onclick = function()
{
    testimonials.style.setProperty("transform", "translate(-870px)", "important");
    control1.classList.remove("active")
    control2.classList.remove("active")
    control3.classList.add("active")
}