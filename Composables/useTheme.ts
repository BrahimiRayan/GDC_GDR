const Catecolor = (category : string)=>{
  switch(category){
    case 'Alimentaire':
      return 'bg-green-400 text-white'
    case 'Electronique':
      return 'bg-blue-400 text-white'
    case 'Vêtement':
      return 'bg-red-400 text-white'
    case 'Meuble':
      return 'bg-yellow-400 text-white' 
    case 'Accessoire' :
      return 'bg-purple-400 text-white'
    case 'Beauté' :
      return 'bg-pink-400 text-white' 
    case 'Sport' : 
      return 'bg-orange-400 text-white'
    case 'Livre' : 
      return 'bg-teal-400 text-white'          
    case 'Autre' :
      return 'bg-gray-400 text-white'
  }
}

export {Catecolor}