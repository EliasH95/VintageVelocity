"use strict";

let vorstandDiv;
let regularMemberDiv;

document.addEventListener("DOMContentLoaded",()=>{

    //yes, this throws an error when the page is not the index.html, but otherwise,
    //the fucking news won't be loaded when the site is opened
    buildNews();

    switchColorMode(localStorage.getItem("currentColor"));
    localStorage.getItem("currentColor").includes("black") ? switchColorMode("white") : switchColorMode("black");

    let currentColor = document.getElementById("homeHeader").style.color;
    console.log(currentColor)

    document.getElementById("darkModeButton").addEventListener("click", (event) =>{
        currentColor = switchColorMode(localStorage.getItem("currentColor"));
        localStorage.setItem("currentColor",currentColor);
        console.log("IN EVENT LISTENER:" + currentColor);
    })

    if(window.location.href.includes("vehicles")){
        buildVehicles();
    }
    const membersHeader = document.getElementById("membersHeader");

    membersHeader.addEventListener("click", (event) => {
        window.location = "members.html";
    });

    const homeHeader = document.getElementById("homeHeader");

    homeHeader.addEventListener("click", (event) => {
        window.location = "index.html";
        buildNews();
    });

    const aboutHeader = document.getElementById("aboutHeader")

    aboutHeader.addEventListener("click",(event) =>{
        window.location = "about.html";
    })

    const impressumHeader = document.getElementById("impressumHeader");

    impressumHeader.addEventListener("click",(event) =>{
        window.location = "impressum.html"
    }
    )

    const vehiclesHeader = document.getElementById("vehiclesHeader");
    
    vehiclesHeader.addEventListener("click",(event) =>{
        window.location = "vehicles.html"
        buildVehicles();
    }
    )

    if(window.location.href.includes("members")){
        vorstandDiv = document.getElementById("executivesDiv");
        regularMemberDiv = document.getElementById("regularMembersDiv");
        buildMemberDivs();
    }
});

function switchColorMode(currentColor){
    document.body.style.transition = "0.4s"
    if(currentColor.includes("white")){
        document.body.style.background = "black";
        document.getElementById("homeHeader").style.color = "white";
        document.body.style.color = "white";
        document.getElementById("logoBig").src = "logo_white.png";
        document.getElementById("darkModeButton").style.color = "white";
        document.getElementById("darkModeButton").style.borderColor = "white";
        document.getElementById("darkModeButton").textContent = "Lightmode";


        return "black";
    }
    else if(currentColor.includes("black")){
         document.body.style.background = "white";
         document.body.style.color = "black";
         document.getElementById("homeHeader").style.color = "black";
         document.getElementById("logoBig").src = "logo.png";
         document.getElementById("darkModeButton").style.color = "black";
         document.getElementById("darkModeButton").style.borderColor = "black";
         document.getElementById("darkModeButton").textContent = "Darkmode";

         return "white";
    }
    
}

async function loadJson(path){
    const response = await fetch(path);
    const json = await response.json();
    return json;
}

async function buildVehicles(){
    const mopedDiv = document.getElementById("mopedDiv");
    const carDiv = document.getElementById("carDiv");
    const restVehiclesDiv = document.getElementById("restVehiclesDiv");

    const mopedH2 = document.getElementById("mopedsH2");
    const carH2 = document.getElementById("carsH2");
    const restH2 = document.getElementById("restH2");


    const vehicles = await loadJson("vehicles.json");

    Array.from(vehicles.vehicles).forEach(vehicle =>{
        const vehicleDiv = document.createElement("div");
        vehicleDiv.className = "vehicleDiv";

        const vehicleImg = document.createElement("img");
        vehicleImg.src = vehicle.ImgPath;;
        vehicleDiv.appendChild(vehicleImg);
        
        const vehicleOwner = document.createElement("p");
        vehicleOwner.textContent = vehicle.Owner;
        vehicleDiv.appendChild(vehicleOwner);

        const vehicleName = document.createElement("p");
        vehicleName.textContent = vehicle.Model;
        vehicleDiv.appendChild(vehicleName);

        const vehicleConstYear = document.createElement("p");
        vehicleConstYear.textContent = vehicle.ConstYear;
        vehicleDiv.appendChild(vehicleConstYear);

        if(vehicle.Type.includes("Moped")){
            mopedDiv.appendChild(vehicleDiv);
            mopedDiv.style.display = "flex";
            mopedH2.style.display = "flex";
        }
        else if(vehicle.Type.includes("Car")){
            carDiv.appendChild(vehicleDiv);
            carDiv.style.display = "flex";
            carH2.style.display = "flex";
        }
        else{
            restVehiclesDiv.appendChild(vehicleDiv);
            restVehiclesDiv.style.display = "flex";
            restH2.style.display = "flex";
        }
    })
}


async function buildNews(){
    const completeNewsDiv = document.getElementById("newsDiv");
    const news = await loadJson("news.json");
    Array.from(news.news).forEach(news =>{
        const newsDiv = document.createElement("div");
        newsDiv.className = "singularNews";

        const newsImg = document.createElement("img");
        newsImg.src = news.ImgPath;
        newsDiv.appendChild(newsImg);
    
        const newsTitle = document.createElement("h3");
        newsTitle.textContent = news.Title;
        newsDiv.appendChild(newsTitle);


        Array.from(String(news.Description).split(";")).forEach(desc =>{
            const newsP = document.createElement("p");
            newsP.textContent = desc;
            newsDiv.appendChild(newsP);
        })


        completeNewsDiv.appendChild(newsDiv);
    })
}

async function buildMemberDivs(){
    const members = await loadJson("members.json");
    Array.from(members.members).forEach(member => {
        const memberDiv = document.createElement("div");

        const img = document.createElement("img");
        img.src = member.ImgPath;
        img.style.height = "350px";
        memberDiv.appendChild(img);

        const tiktokLink = document.createElement("span");
        tiktokLink.textContent = "Zum Vorstellungsvideo";
        tiktokLink.className = "tiktokLink";
        memberDiv.addEventListener("click",()=>{
            window.location.href = member.TiktokLink;
        })
        memberDiv.appendChild(tiktokLink);

        const nameP = document.createElement("p");
            nameP.textContent = member.Name;
            nameP.style.fontWeight = "bold";
            memberDiv.appendChild(nameP);

        const ageP = document.createElement("p");
            const now = new Date();
            const parts = String(member.Birthdate).split("-");
            const birthdate = new Date(parseInt(parts[2]),parseInt(parts[0]),parseInt(parts[1]))
            console.log(birthdate);
            let age = now.getFullYear() - birthdate.getFullYear();
            if (
                now.getMonth() < birthdate.getMonth() ||
                (now.getMonth() === birthdate.getMonth() && now.getDate() < birthdate.getDate())
            ) {
                age--;
            }
        
            ageP.textContent = age;
            memberDiv.appendChild(ageP);

        const nationP = document.createElement("p");
            nationP.textContent = member.Nationality;
            memberDiv.appendChild(nationP);

        const joinedP = document.createElement("p");
            joinedP.textContent = member.Joined;
            memberDiv.appendChild(joinedP);

        const roleP = document.createElement("p");
            roleP.textContent = member.Role;
            //memberDiv.appendChild(roleP);

        memberDiv.className = "memberDiv";
        String(member.Role).includes("Vorstand") ? 
            vorstandDiv.append(memberDiv) :
             regularMemberDiv.append(memberDiv);
    });
}



