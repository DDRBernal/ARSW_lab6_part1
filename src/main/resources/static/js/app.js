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

  function parseData(data) {
          let table = $("#table-blueprints tbody");
          table.empty();
          if (data === undefined) {
              alert("Author dont found!");
              $("#author-name").empty();
              $("#totalPoints").empty();
          } else {
              $("#author-name").text(author + "'s " + "blueprints:");

              const datanew = data.map((blueprint) => {
                  return {
                      name: blueprint.name,
                      puntos: blueprint.points.length
                  }
              });
              datanew.forEach(({name, puntos}) => {
              table.append(
                              `<tr>
                                <td>${name}</td>
                                <td>${puntos}</td>
                              </tr>`
                          );
                      })
              const totalPuntos = datanew.reduce((suma, {puntos}) => suma + puntos, 0);
              $("#totalPoints").text(totalPuntos);
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
    getNameAuthorBlueprints: getNameAuthorBlueprints
  };

})();