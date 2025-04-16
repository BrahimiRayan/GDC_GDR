// dd-mm-yyyy format 

const NormalDateformat =(date : Date)=>{
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-');
}

export {NormalDateformat}