"use strict";

let vorstandDiv;
let regularMemberDiv;

document.addEventListener("DOMContentLoaded",()=>{

    if(window.location.href.includes("index")){
        buildNews();
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
    }
    )

    if(window.location.href.includes("members")){
        vorstandDiv = document.getElementById("executivesDiv");
        regularMemberDiv = document.getElementById("regularMembersDiv");
        buildMemberDivs();
    }
});

async function loadMembers(){
    const response = await fetch("members.json");
    const json = await response.json();
    return json;
}

async function loadNews(){
    const response = await fetch("news.json");
    const json = await response.json();
    return json;
}

async function buildNews(){
    const completeNewsDiv = document.getElementById("newsDiv");
    console.log(completeNewsDiv);
    const news = await loadNews();
    Array.from(news.news).forEach(news =>{
        const newsDiv = document.createElement("div");
        newsDiv.className = "singularNews";

        const newsImg = document.createElement("img");
        newsImg.src = news.ImgPath;
        newsDiv.appendChild(newsImg);
    
        const newsTitle = document.createElement("h3");
        newsTitle.textContent = news.Title;
        newsDiv.appendChild(newsTitle);

        const newsUl = document.createElement("ul");

        Array.from(String(news.Description).split(";")).forEach(desc =>{
            console.log(news.Description);
            const newsLi = document.createElement("li");
            console.log(desc);
            newsLi.textContent = desc;
            newsUl.appendChild(newsLi);
        })

        newsDiv.append(newsUl);

        completeNewsDiv.appendChild(newsDiv);
    })
}

async function buildMemberDivs(){
    const members = await loadMembers();
    console.log(members)
    Array.from(members.members).forEach(member => {
        const memberDiv = document.createElement("div");

        const img = document.createElement("img");
        img.src = member.ImgPath;
        img.style.height = "350px";
        memberDiv.appendChild(img);

        const tiktokLink = document.createElement("span");
        tiktokLink.textContent = "Zum Garagen Video";
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



