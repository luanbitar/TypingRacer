$(".cp").text($(".t").text().split(/\s+/).length);
var tempo = $(".ct").text();

$(function(){
    contadorScore();
    cronometro();
    reset();
    marcadores();
});

// contador de letras e palavras digitadas
function contadorScore(){
    $(".p").on("input",function(){
        $(".d").text($(".p").val().length);
    });
}

// cronometro
function cronometro(){
    $(".p").one("focus",function(){
        var t = tempo;
        $(".r").attr("disabled",true);
        var cId = setInterval(function(){
            if(t >= 0)
                $(".ct").text(t--);
            else{
                clearInterval(cId);
                end();
            }
        },1000);
    });
}

function end(){
    $(".p").attr("disabled",true);
    $(".r").attr("disabled",false);
    if($(".p").hasClass("btn-outline-success")){
        var t = $("table").find("tbody");
        var score = novaLinha($(".player").val(),$(".p").val().length);
        t.prepend(score);
        $(".remove").click(removeLinha);
    }
}

function novaLinha(user,score){
    var row = $("<tr>");
    var rmv = $("<th>").attr("scope","row");
    var a = $("<a>").attr("href","#");
    var i = $("<i>").addClass("ion-close-circled").addClass("remove");
    var usr = $("<td>").text(user);
    var scr= $("<td>").text(score);

    return row.append(rmv.append(a.append(i))).append(usr).append(scr);
}

function removeLinha(){
    $(this).parent().parent().parent().remove();
}

// reset
function reset(){
    $(".r").click(function(){
        $(".ct").text(tempo);
        $(".p").val("");
        $(".p").attr("disabled",false);
        $(".d").text("0");
        cronometro();
        $(".p").removeClass("btn-outline-danger");
        $(".p").removeClass("btn-outline-success");
        $(".p").addClass("btn-outline-dark");
    });
}

// marcadores
function marcadores(){
    $(".p").on("input",function(){
        var dig = $(".p").val();
        var fra = $(".t").text().substr(0,dig.length)
        /* ECMA Script 5
        if(dig == fra){
            $(".p").removeClass("btn-outline-dark");
            $(".p").removeClass("btn-outline-danger");
            $(".p").addClass("btn-outline-success");
        }else{
            $(".p").removeClass("btn-outline-dark");
            $(".p").removeClass("btn-outline-success");
            $(".p").addClass("btn-outline-danger");
        }*/

        // ECMA Script 6
        if(fra.startsWith(dig)){
            $(".p").removeClass("btn-outline-dark");
            $(".p").removeClass("btn-outline-danger");
            $(".p").addClass("btn-outline-success");
        }else{
            $(".p").removeClass("btn-outline-dark");
            $(".p").removeClass("btn-outline-success");
            $(".p").addClass("btn-outline-danger");
        }
    });
}