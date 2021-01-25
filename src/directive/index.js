export const imagerror = {
    inserted:function(dom,option){
        dom.onerror = ()=>{
            dom.src=option.value;
        }
    }
}