// chat will be on port 3000
window.addEventListener('DOMContentLoaded', function () {
    
    const socket = io('http://localhost:3000');
    let username = prompt("What's your username?");
    socket.emit('username', username);
    const exit = () => {socket.emit('user exit',username);
    document.querySelector('main').style.display = "none";}
    document.querySelector("#leave").addEventListener('click', () => exit());

    socket.on('user joined', msg => {
        const li = newMessage(msg);
        li.classList.add('message-user');
        document.querySelector('.messages-body ul').appendChild(li);
        newUser(msg);
    });

    // user has entered a new message
    document.querySelector("#chatForm").addEventListener('submit', e => {
        e.preventDefault();
        const entry = document.querySelector("#entry");
        if(entry.value != ""){
        sendMessage({user:username,message:entry.value});
        // send message to server
        socket.emit('chat from client', entry.value);
        entry.value = "";
        }       
    });

    // a new chat message has been received from server
    socket.on('chat from server', msg => {
        const message = newMessage(msg);
        message.classList.add('message-received');
        document.querySelector('.messages-body ul').appendChild(message);
    });

    const sendMessage = (msg) => {
        const message = newMessage(msg) 
        message.classList.add("message-sent");
        document.querySelector('.messages-body ul').appendChild(message);
    }

    const newMessage = (msg) => {
        const li = document.createElement('li');
        const data = document.createElement('p');
        data.classList.add('message-data');
        const text = document.createElement('p');
        text.classList.add('message-text');

        data.innerHTML = `${msg.user}<span>Today</span>`;
        text.innerHTML = msg.message;

        li.appendChild(data);
        li.appendChild(text);
        return li;
    }


    const newUser = (msg) => {
        const userList = document.querySelector('#users ul');
        userList.textContent = '';
        msg.users.forEach(user => {

            const li = document.createElement('li');
            const img = document.createElement('img');
            img.alt = "avatar"
            img.src = `https://randomuser.me/api/portraits/med/${user.group}/${user.id}.jpg`
            const div = document.createElement('div');
            div.classList.add('name');
    
            const name = document.createElement('p');
            const status = document.createElement('p');
            
            name.innerHTML = user.name;
            status.innerHTML = "online";
    
            div.appendChild(name);
            div.appendChild(status);
            li.appendChild(img);
            li.appendChild(div);
            userList.appendChild(li);

        });
    }

});