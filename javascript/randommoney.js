//recup argent
let argent = JSON.parse(localStorage.getItem("argent") || '{"monnaie":1000}');
// modif argent
argent.monnaie += 100;
// uplod argent
localStorage.setItem("argent", JSON.stringify(argent));
