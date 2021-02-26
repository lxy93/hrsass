export const imagerror = {
    inserted:function(dom,option){
        dom.src = dom.src || option.value;
        dom.onerror = ()=>{
            dom.src=option.value;
        }
    },
    componentUpdate(dom,option){
        dom.src = dom.src || option.value;
    }
}