// users array
users =[
   {id: 1,name:'John',lastname:'Lemon',email:'lemon@ninjas.com'},
   {id: 2,name:'Paul',lastname:'McCarni',email:'lecarni@ninjas.com'},
   {id: 3,name:'George',lastname:'appelson',email:'ggson@ninjas.com'},
   {id: 4,name:'Mango',lastname:'Star',email:'mangos@ninjas.com'},
]
//user class
class User {
    constructor(id,name,lastname,email){
            this.id=id;
            this.name=name;
            this.lastname=lastname;
            this.email=email;
    }   
}
//class to handle UI
class UI {
    static displayUsers(users){
        
        users.forEach((user)=> UI.addUserToList(user));
    }
    //methods
static addUserToList(user){
        const table = document.getElementById('usersTbl');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.lastname}</td>
        <td>${user.email}</td>
        <button class="delete red btn-small">delete</button>
        <button class="edit green btn-small">edit</button>
        `;
        table.appendChild(row);
    }
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayUsers(users));
//functions
addUser =(user)=> {
    let usuario ={id:users.length+1,name:user.name,lastname:user.lastname,email:user.email};
    new User(usuario);
    users.push(usuario);
}
//Function to add user
submis = document.getElementById('subm');
submis.addEventListener('click', (e) =>{
    e.preventDefault();
    let nam = document.getElementById('name').value;
    let lastnam = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let usu = {name:nam,lastname:lastnam,email:email}
    if(nam === '' || lastnam === '' || email === '') {
        alert('Please fill in all fields', 'danger');
      } else {
    UI.addUserToList(usu);
    addUser(usu);
    
    document.getElementById('name').value='';
    document.getElementById('lastName').value='';
    document.getElementById('email').value='';
    }
})
//delete function
deleteUser = (el) => {
    
    let emilio = el.previousElementSibling.innerHTML;
    const newu = users.filter(user => { 
        return user.email !== emilio;
    });
    users = newu;
    if(el.classList.contains("delete")){
        el.parentElement.remove();
    }
    indx = users.length;
    let i=1;
    const newmap = users.map(user => user.id = i++);
}
//edit user
editUser = (el) => {
    let emilio = el.previousElementSibling.previousElementSibling.innerHTML;
    let lastnam = el.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    let name = el.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;  
    const pos = users.filter(user => (user.email === emilio));
    let position = (pos[0].id);
    user ={name,lastnam,emilio};
    if(el.classList.contains("edit")){
        document.getElementById('name').value = user.name;    
        document.getElementById('lastName').value = user.lastnam;    
        document.getElementById('email').value = user.emilio;
        document.getElementById('subm').style.display="none";
        document.getElementById('update').style.display="block";
        document.getElementById('index').value= position;
    }


}
document.getElementById('usersTbl').addEventListener('click',(e) => {
    deleteUser(e.target);
    editUser(e.target);
} );
//update button
document.getElementById('update').addEventListener('click',(e) => {
    e.preventDefault();
    let usr = {name:'',lastname:'',email:''};
    usr.name = document.getElementById('name').value;    
    usr.lastname = document.getElementById('lastName').value;    
    usr.email = document.getElementById('email').value;
    position = document.getElementById('index').value;
    ind = position-1;
    users[ind] = {id:position,name:usr.name,lastname:usr.lastname,email:usr.email};
    document.getElementById('name').value='';    
    document.getElementById('lastName').value='';    
    document.getElementById('email').value='';
    document.getElementById('update').style.display="none";
    document.getElementById('subm').style.display="block";
    trow = document.getElementsByTagName('tr')[position];
    nombre = trow.children[0].innerHTML= usr.name;
    apellido =trow.children[1].innerHTML=usr.lastname;
    email =trow.children[2].innerHTML=usr.email;
});

