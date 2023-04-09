const page = document.location.href.split("/")[4];

if (page === "learning") {
    $("#learnLink").addClass("active");

}
if (page === "profil") {
    $("#profilLink").addClass("active");
}
if (page === "stats") {
    $("#statsLink").addClass("active");
}

$.post(
    "/accActions/getLogin/",
    {
        csrfmiddlewaretoken: token
    },
    (data) => {
        if (data !== "error") $("#sendEmailFooter").attr("href", `mailto:dddeutsch.help@gmail.com?subject=Обращение от: ${data}`);
    }
);