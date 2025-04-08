type category = 'Alimentaire' | 'Electronique' | 'Vêtement' | 'Meuble' | 'Accessoire' | 'Beauté' |'Sport' | 'Livre' | 'Autre';


type Produit = {
    id : number | string , 
    name : string , 
    img? : string , 
    category : category ,
    pua : number , 
    puv : number ,
    quantity : number ,
}

type Transaction = {
    id : number | string ,
    idProduct : number | string ,
    date : Date ,
    quantity : number ,
    type : string ,
    pua : number ,
    puv : number ,
}


export type { Produit , Transaction } ;