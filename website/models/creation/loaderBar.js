document.addEventListener("DOMContentLoaded", function() {
    const loaderBar = document.getElementById("loaderBar");
    const carImage = document.getElementById("carImage");
    const loaderContainer = document.getElementById("loaderContainer");
    const main = document.getElementById("welcome");

    let width = 0;
    let interval = setInterval(function () {
        if (width >=50){
            setTimeout(function() {
                clearInterval(interval);
                loaderContainer.style.display = "none";
                main.style.display = 'grid';
            }, 1000);

        }
        else{
            width++;
            loaderBar.style.width = width + "%";

            var carPosition = (width * (loaderContainer.offsetWidth - carImage.offsetWidth) / 100);
            carImage.style.left = carPosition + "px";
        }
        }, 50);
});