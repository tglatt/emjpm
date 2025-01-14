exports.seed = function(knex) {
  // Inserts seed entries
  return knex("departements").insert([
    { id: 1, code: "01", id_region: "84", nom: "Ain" },
    { id: 2, code: "02", id_region: "32", nom: "Aisne" },
    { id: 3, code: "03", id_region: "84", nom: "Allier" },
    { id: 4, code: "04", id_region: "93", nom: "Alpes-de-Haute-Provence" },
    { id: 5, code: "05", id_region: "93", nom: "Hautes-Alpes" },
    { id: 6, code: "06", id_region: "93", nom: "Alpes-Maritimes" },
    { id: 7, code: "07", id_region: "84", nom: "Ardèche" },
    { id: 8, code: "08", id_region: "44", nom: "Ardennes" },
    { id: 9, code: "09", id_region: "76", nom: "Ariège" },
    { id: 10, code: "10", id_region: "44", nom: "Aube" },
    { id: 11, code: "11", id_region: "76", nom: "Aude" },
    { id: 12, code: "12", id_region: "76", nom: "Aveyron" },
    { id: 13, code: "13", id_region: "93", nom: "Bouches-du-Rhône" },
    { id: 14, code: "14", id_region: "28", nom: "Calvados" },
    { id: 15, code: "15", id_region: "84", nom: "Cantal" },
    { id: 16, code: "16", id_region: "75", nom: "Charente" },
    { id: 17, code: "17", id_region: "75", nom: "Charente-Maritime" },
    { id: 18, code: "18", id_region: "24", nom: "Cher" },
    { id: 19, code: "19", id_region: "75", nom: "Corrèze" },
    { id: 20, code: "21", id_region: "27", nom: "Côte-d'Or" },
    { id: 21, code: "22", id_region: "53", nom: "Côtes-d'Armor" },
    { id: 22, code: "23", id_region: "75", nom: "Creuse" },
    { id: 23, code: "24", id_region: "75", nom: "Dordogne" },
    { id: 24, code: "25", id_region: "27", nom: "Doubs" },
    { id: 25, code: "26", id_region: "84", nom: "Drôme" },
    { id: 26, code: "27", id_region: "28", nom: "Eure" },
    { id: 27, code: "28", id_region: "24", nom: "Eure-et-Loir" },
    { id: 28, code: "29", id_region: "53", nom: "Finistère" },
    { id: 29, code: "2A", id_region: "94", nom: "Corse-du-Sud" },
    { id: 30, code: "2B", id_region: "94", nom: "Haute-Corse" },
    { id: 31, code: "30", id_region: "76", nom: "Gard" },
    { id: 32, code: "31", id_region: "76", nom: "Haute-Garonne" },
    { id: 33, code: "32", id_region: "76", nom: "Gers" },
    { id: 34, code: "33", id_region: "75", nom: "Gironde" },
    { id: 35, code: "34", id_region: "76", nom: "Hérault" },
    { id: 36, code: "35", id_region: "53", nom: "Ille-et-Vilaine" },
    { id: 37, code: "36", id_region: "24", nom: "Indre" },
    { id: 38, code: "37", id_region: "24", nom: "Indre-et-Loire" },
    { id: 39, code: "38", id_region: "84", nom: "Isère" },
    { id: 40, code: "39", id_region: "27", nom: "Jura" },
    { id: 41, code: "40", id_region: "75", nom: "Landes" },
    { id: 42, code: "41", id_region: "24", nom: "Loir-et-Cher" },
    { id: 43, code: "42", id_region: "84", nom: "Loire" },
    { id: 44, code: "43", id_region: "84", nom: "Haute-Loire" },
    { id: 45, code: "44", id_region: "52", nom: "Loire-Atlantique" },
    { id: 46, code: "45", id_region: "24", nom: "Loiret" },
    { id: 47, code: "46", id_region: "76", nom: "Lot" },
    { id: 48, code: "47", id_region: "75", nom: "Lot-et-Garonne" },
    { id: 49, code: "48", id_region: "76", nom: "Lozère" },
    { id: 50, code: "49", id_region: "52", nom: "Maine-et-Loire" },
    { id: 51, code: "50", id_region: "28", nom: "Manche" },
    { id: 52, code: "51", id_region: "44", nom: "Marne" },
    { id: 53, code: "52", id_region: "44", nom: "Haute-Marne" },
    { id: 54, code: "53", id_region: "52", nom: "Mayenne" },
    { id: 55, code: "54", id_region: "44", nom: "Meurthe-et-Moselle" },
    { id: 56, code: "55", id_region: "44", nom: "Meuse" },
    { id: 57, code: "56", id_region: "53", nom: "Morbihan" },
    { id: 58, code: "57", id_region: "44", nom: "Moselle" },
    { id: 59, code: "58", id_region: "27", nom: "Nièvre" },
    { id: 60, code: "59", id_region: "32", nom: "Nord" },
    { id: 61, code: "60", id_region: "32", nom: "Oise" },
    { id: 62, code: "61", id_region: "28", nom: "Orne" },
    { id: 63, code: "62", id_region: "32", nom: "Pas-de-Calais" },
    { id: 64, code: "63", id_region: "84", nom: "Puy-de-Dôme" },
    { id: 65, code: "64", id_region: "75", nom: "Pyrénées-Atlantiques" },
    { id: 66, code: "65", id_region: "76", nom: "Hautes-Pyrénées" },
    { id: 67, code: "66", id_region: "76", nom: "Pyrénées-Orientales" },
    { id: 68, code: "67", id_region: "44", nom: "Bas-Rhin" },
    { id: 69, code: "68", id_region: "44", nom: "Haut-Rhin" },
    { id: 70, code: "69", id_region: "84", nom: "Rhône" },
    { id: 71, code: "70", id_region: "27", nom: "Haute-Saône" },
    { id: 72, code: "71", id_region: "27", nom: "Saône-et-Loire" },
    { id: 73, code: "72", id_region: "52", nom: "Sarthe" },
    { id: 74, code: "73", id_region: "84", nom: "Savoie" },
    { id: 75, code: "74", id_region: "84", nom: "Haute-Savoie" },
    { id: 76, code: "75", id_region: "11", nom: "Paris" },
    { id: 77, code: "76", id_region: "28", nom: "Seine-Maritime" },
    { id: 78, code: "77", id_region: "11", nom: "Seine-et-Marne" },
    { id: 79, code: "78", id_region: "11", nom: "Yvelines" },
    { id: 80, code: "79", id_region: "75", nom: "Deux-Sèvres" },
    { id: 81, code: "80", id_region: "32", nom: "Somme" },
    { id: 82, code: "81", id_region: "76", nom: "Tarn" },
    { id: 83, code: "82", id_region: "76", nom: "Tarn-et-Garonne" },
    { id: 84, code: "83", id_region: "93", nom: "Var" },
    { id: 85, code: "84", id_region: "93", nom: "Vaucluse" },
    { id: 86, code: "85", id_region: "52", nom: "Vendée" },
    { id: 87, code: "86", id_region: "75", nom: "Vienne" },
    { id: 88, code: "87", id_region: "75", nom: "Haute-Vienne" },
    { id: 89, code: "88", id_region: "44", nom: "Vosges" },
    { id: 90, code: "89", id_region: "27", nom: "Yonne" },
    { id: 91, code: "90", id_region: "27", nom: "Territoire de Belfort" },
    { id: 92, code: "91", id_region: "11", nom: "Essonne" },
    { id: 93, code: "92", id_region: "11", nom: "Hauts-de-Seine" },
    { id: 94, code: "93", id_region: "11", nom: "Seine-Saint-Denis" },
    { id: 95, code: "94", id_region: "11", nom: "Val-de-Marne" },
    { id: 96, code: "95", id_region: "11", nom: "Val-d'Oise" },
    { id: 97, code: "971", id_region: "1", nom: "Guadeloupe" },
    { id: 98, code: "972", id_region: "2", nom: "Martinique" },
    { id: 99, code: "973", id_region: "3", nom: "Guyane" },
    { id: 100, code: "974", id_region: "4", nom: "La Réunion" },
    { id: 101, code: "976", id_region: "6", nom: "Mayotte" }
  ]);
};
