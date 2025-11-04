import { useNavigate } from 'react-router-dom';
import "./useUtils.css"

export default function useUtils() {

    const navigate = useNavigate()
    
    const handleDetail = (type, id, title) => {
        navigate(`/ProjetWebH25/detail/${type}/${id}/${title}`);
    };

    const loader = () => {
        return(
         <div class="loader">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                </div>
        )
    }

    return {
        handleDetail,
        loader,
    };


}

export function troubleShoot() {

    // Reload la page pour fixer quelque bug d'affichage
    if (window.location.hash != "#loaded") {
        window.location.hash = "#loaded"
        window.location.reload();
    } else {
        setTimeout(function () {
            var allH1Titles = document.getElementsByTagName("h1");
            var allH2Titles = document.getElementsByTagName("h2");
            var allH3Titles = document.getElementsByTagName("h3");

            for (let i = 0; i < allH1Titles.length; i++) {
                allH1Titles[i].style.color = localStorage.getItem("Title-Colors");
            }
            for (let i = 0; i < allH2Titles.length; i++) {
                allH2Titles[i].style.color = localStorage.getItem("Title-Colors");
            }
            for (let i = 0; i < allH3Titles.length; i++) {
                allH3Titles[i].style.color = localStorage.getItem("Title-Colors");
            }
        });
    }
}