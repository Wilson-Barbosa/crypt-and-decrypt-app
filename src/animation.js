

const Title = document.getElementById("title")
const text = document.querySelector(".redline p")

function typeWrite(text){
    const ArrayText = text.innerHTML.split('')
    text.innerHTML = ''
    ArrayText.forEach((char, index)=>{
        setTimeout(()=>{
            text.innerHTML += char;
        }, 110 * index)
    })
    
}


typeWrite(Title)
