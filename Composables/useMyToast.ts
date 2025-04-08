import { useToast } from "#imports";
type toastType = "success" | "primary" | "secondary" | "info" | "warning" | "error" | "neutral" | undefined ;
type iconType = "S" | "E" 
const toast = useToast();
const Toasting = (title : string , description : string , type : toastType = 'success' , icon : iconType)=>{
    toast.add({
        title: title,
        description: description,
        icon: icon === 'S' ? 'icon-park-outline-success' : 'bx-error',
        color : type,
        ui:{
            root : icon === 'S' ? 'text-green-500 bg-slate-900 font-bold' : 'text-red-500 bg-slate-900 font-bold' ,
            icon : icon === 'S' ? 'text-green-500' : 'text-red-500',
            progress : icon === 'S' ? 'bg-green-500' : 'bg-red-500',
            title : 'font-bold text-lg',
        }
    });
}

export default Toasting;