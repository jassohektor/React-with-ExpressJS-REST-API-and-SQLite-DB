export const app : string = 'Veröld-App';

export function getImageUrl(user:any) {
  if(user.photoURL){
    return (require(`../assets/pictures/${user.photoURL}`));
  }
  else
    return (require('../assets/pictures/image-ink.png'));
    
}

export function getToken(){
  let auth = localStorage.getItem(`${app}.auth`);
  if(auth){
    let data = JSON.parse(auth);
    return data.token;
  }
  else
    return '';
}

export function formatDate(date:Date) {
  let cdate: Date;
  try {
    if((date as any).val) {
      cdate = new Date(Date.now());  
    }
    else {
      cdate = new Date(Date.parse(date.toString()));
    }
    return `${cdate.getFullYear()}/${cdate.getMonth()}/${cdate.getDate()}`;
  }
  catch(err) {
    console.log(err);
    cdate = new Date(Date.now());
    return `${cdate.getFullYear()}/${cdate.getMonth()}/${cdate.getDate()}`;
  }
}