let socket=io();
let webchatHeading=document.getElementById('webchat-heading');
let firstimage=document.getElementById('first-image');
const myfunc=()=>{
    let value=window.scrollY;
    value=1+value/500;
    webchatHeading.style.transform=`scale(${value})`;
};
window.addEventListener('scroll',myfunc);
const observer=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting)
        {   
                window.removeEventListener('scroll',myfunc);
        }  
        else{
            window.addEventListener('scroll',myfunc);
        } 
    })
},{
    threshold:0.9
})
observer.observe(firstimage);