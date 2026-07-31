const container=document.getElementById("container");
const search=document.getElementById("search");
const toast=document.getElementById("toast");

let texts=[];

fetch("texts.json")
.then(r=>r.json())
.then(data=>{
texts=data;
show(texts);
});

function show(arr){
container.innerHTML="";

arr.forEach(item=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<button class="copy">📋</button>
<h3>${item.title}</h3>
<pre>${item.text}</pre>
`;

card.querySelector(".copy").onclick=()=>{
navigator.clipboard.writeText(item.text);

toast.style.display="block";

setTimeout(()=>{
toast.style.display="none";
},1500);
};

container.appendChild(card);

});
}

search.oninput=()=>{
const q=search.value.toLowerCase();

show(texts.filter(x=>
x.title.toLowerCase().includes(q)||
x.text.toLowerCase().includes(q)
));
};

const btn=document.getElementById("themeBtn");

if(localStorage.theme=="light"){
document.body.classList.add("light");
btn.innerHTML="☀️";
}

btn.onclick=()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
localStorage.theme="light";
btn.innerHTML="☀️";
}else{
localStorage.theme="dark";
btn.innerHTML="🌙";
}

};
