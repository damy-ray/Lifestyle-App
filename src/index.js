import "./style.css";
import _ from "lodash";
import axios from "axios";

// DECLARING VARIABLES

let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");
let cityBox = document.getElementsByClassName("city-container")[0];
let cityName = document.getElementsByClassName("city-name")[0];
let cityScore = document.getElementsByClassName("city-score")[0];
let cityDescription = document.getElementsByClassName("city-description")[0];
let categoryList = document.getElementById("category-items");



//API CALLS, LOGIC OF THE APPLICATION & DOM

async function qualityOfLife() {

    let search = cityInput.value;
    let citySearch = search.replace(" ", "-");

    await axios.get(`https://api.teleport.org/api/urban_areas/slug:${citySearch}/`)
        .then(
          (result) => {
            const cityValue = _.get(result.data, 'full_name', 'Error')
            cityName.innerHTML = cityValue;
            cityBox.style.display = 'flex';
        })

    await axios.get(`https://api.teleport.org/api/urban_areas/slug:${citySearch}/scores/`)

        .then( (result) =>  {
          result = result.data;
            cityScore.innerHTML = "City Score: " + _.get(result, 'teleport_city_score', 'Urban area not found').toFixed(2);

            cityDescription.innerHTML = _.get(result, 'summary', ' ');
            let categoryArray = _.get(result, 'categories', ' ');

            _.forEach(categoryArray, (category) => {

              let newName = document.createElement('li');
              let addCategoryName = document.createTextNode( _.get(category, 'name', ' '));
              newName.appendChild(addCategoryName);
              let positionName = document.getElementById('category-items');
              positionName.appendChild(newName);


              let newScoreBar = document.createElement('li');
              let color = _.get(category, 'color', ' ');
              let addCatScoreBar = document.createTextNode(_.get(category, 'score_out_of_10', "Urban area not found").toFixed(2));
              newScoreBar.appendChild(addCatScoreBar);
              let positionScoreBar = document.getElementById('category-scores');
              positionScoreBar.appendChild(newScoreBar).style.background = color;
            })
        })

        // HANDLING ERROR
        .catch(
             (response) => {
                if (response.status = "error") {
                    cityName.innerHTML = "Sorry, this city is not in the database. Try again!";
                    cityScore.innerHTML = "Urban area not found";
                    cityDescription.innerHTML = " ";
                    categoryList.innerHTML = " ";
                    scoreBar.innerHTML = " ";
                }
            }
        )

        };

        // EVENT LISTENER
        searchButton.addEventListener("click", qualityOfLife);
