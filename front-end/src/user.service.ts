import { User } from "./user.model";

const url = "http://localhost:8080/users";

class UserService {
    public user = new User();
    
    loginUser(user: User) {
        console.log('fetch');
        return fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' // Media Type
            }
        })
        .then(response => {
            return response.json()
        })        
        .then(data => 
            {
            // Explicit needed somewhere becausethese types are of undefined
            this.user.id = data.id, 
            this.user.username = data.username, 
            this.user.password = data.password
            return data;
        })
        // .then(data => 
        //     {
        //     return this.userArr=[data.username,data.id]
        // })
        .catch(err => console.error(err));
    // registerUser(user: User){};
        
    }
}
export { UserService }