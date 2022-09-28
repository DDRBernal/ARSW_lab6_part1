var app = (function () {

  let authorName = "";
  let author;

  var createTableBlueprints = function (blueprints) {
    // private
    let authorName = undefined;
    let table = [];


  };

    function getNameAuthorBlueprints() {
           author = $("#author").val();
           if (author === "") {
               alert("Incorrect name !");
           } else {
               apimock.getBlueprintsByAuthor(author, (req, resp) => {
                   parseData(resp);
               });
           }
    }

    function getBlueprintsByNameAndAuthor(author,name) {
            console.log(author+" "+name);
               if (author === "") {
                   alert("Incorrect name !");
               } else {

                apimock.getBlueprintsByNameAndAuthor(author,name, (req, resp) => {
                        draw(resp);
                             });
               }
        }

    function draw(data){
        const points = data.points;
        console.log("points "+ points)
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
        ctx.beginPath();
        for (let i = 0; i<points.length-1 ; i++){
        console.log(points[i].x);
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i+1].x, points[i+1].y);
            ctx.stroke();
        }
    }

    function parseData(data) {
        let table = $("#table-blueprints tbody");
        table.empty();
        if (data !== undefined) {
          $("#author-name").text(author + "'s " + "blueprints:");
          const datanew = data.map((blueprint) => {
              return {
                  name: blueprint.name,
                  puntos: blueprint.points.length
              }
          });
          datanew.forEach(({name, puntos}) => {
          apimock.getBlueprintsByNameAndAuthor($("#author").val(),name, (req, resp) => {
                                 console.log(resp);
                  });

          table.append(
                          `<tr>
                            <td>${name}</td>
                            <td>${puntos}</td>
                          `
                          +"<td> <button onclick= app.getBlueprintsByNameAndAuthor('"+$("#author").val()+"','"+name+"')>Open</button></td></tr>"
                      );
                  })
          const totalPuntos = datanew.reduce((suma, {puntos}) => suma + puntos, 0);
          $("#totalPoints").text(totalPuntos);
        } else {
            alert("Author dont found!");
            $("#author-name").empty();
            $("#totalPoints").empty();
        }
    }




  var setAuthorName = function (newAuthorName) {
    authorName = newAuthorName;
    // public
  };

  var anotherMethod = function () {
    // public
  };

  return {
    getNameAuthorBlueprints: getNameAuthorBlueprints,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
  };

})();