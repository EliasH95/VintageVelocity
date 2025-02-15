"use strict";

let vorstandDiv;
let regularMemberDiv;

document.addEventListener("DOMContentLoaded",()=>{

    if(window.location.href.includes("index")){
        buildNews();
    }
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
    console.log(aboutHeader);

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
    const carH2 = document.getElementById("carH2");
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
    console.log(completeNewsDiv);
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
            console.log(news.Description);
            const newsP = document.createElement("p");
            console.log(desc);
            newsP.textContent = desc;
            newsDiv.appendChild(newsP);
        })


        completeNewsDiv.appendChild(newsDiv);
    })
}

async function buildMemberDivs(){
    const members = await loadJson("members.json");
    console.log(members)
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
            const birthdate = new Date(member.Birthdate);
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
        console.log(memberDiv);
        String(member.Role).includes("Vorstand") ? 
            vorstandDiv.append(memberDiv) :
             regularMemberDiv.append(memberDiv);
    });
}



