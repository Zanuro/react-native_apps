export default function getInitials(fullaname){
    var matches = fullaname.match(/\b(\w)/g); 
    return matches ? matches.join(''): ''; 
}    