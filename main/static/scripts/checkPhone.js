let isPhone = false;
if (window.innerWidth < window.innerHeight) {
    isPhone = true;
    $("#headerLogo").removeClass("ms-lg");
    $("#pills").removeClass("me-lg");
    $("#pills").css("justify-content", "center");
    $("#footer").removeClass("justify-content-between");
    $("#footer").addClass("justify-content-center");
    $("#footerLinks").removeClass("justify-content-end");
    $("#footerLinks").addClass("justify-content-center");

    if (document.location.href.split("/").pop() === "enter") {
        $("#enterHeader").css("font-size", "6vh");
        $("#enterHeader").css("margin-bottom", "1rem");
        $("#mainEnterBox").css("flex-direction", "column");
        $("#enterInput").css("text-align", "center");
        $(".inputField").removeClass("inputField");
        $(".enterBlock").css("width", "unset");
        $(".enterBlock").css("padding", "1em");

        let ent = $("#enterInput");
        let reg = $("#regButt");
        let pass = $("#passButt");

        ent.remove();
        reg.remove();
        pass.remove();

        ent.append(reg);
        ent.append(pass);
        $("#mainEnterBox").append(ent);
    }
    if (document.location.href.split("/").pop() === "register") {
        $("#regHeader").css("font-size", "6vh");
        $("#regHeader").css("margin-bottom", "1rem");
        $("#mainRegBox").css("flex-direction", "column");
        $("#enterInput").css("text-align", "center");
        $(".inputField").removeClass("inputField");
        $(".regBlock").css("width", "unset");
        $(".regBlock").css("padding", "1em");

        let reg = $("#regInput");
        let sub = $("#buttBlock");

        reg.remove();
        sub.remove();

        reg.append(sub);
        $("#mainRegBox").append(reg);
    }
    if (document.location.href.split("/").pop() === "learning") {
        $(".card-group").css("display", "flex");
        $(".card-group").css("flex-wrap", "wrap");
        $(".card-group").css("justify-content", "center");
    }
    if (document.location.href.split("/").pop() === "stats") {
        $(".renameListButts").css("margin-left", 0);
        $(".renameListButts").css("margin-top", "0.5em");
        $(".renameListButts").css("margin-bottom", "0.5em");
    }
}