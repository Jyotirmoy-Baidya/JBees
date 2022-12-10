const home = document.querySelector(".home");
const homeLogin = document.querySelector(".login");
const loginPage = document.querySelector(".login-page");
const loginBackBtn =document.querySelector(".login-back");
const loginBtn = document.querySelector(".btn-login");

const homeSignup = document.querySelector(".signup");
const signupPage = document.querySelector(".signup-page");
const signupBackBtn = document.querySelector(".signup-back");
const signupBtn = document.querySelector(".btn-signup");


const friendsPage = document.querySelector(".friends-page");
const friends = document.querySelector(".member-area");
const menuBtn = document.querySelector(".btn-menu");
const menuDrop = document.querySelector(".menu-drop");
const newMemberBtn = document.querySelector("#new-member-btn")
const addMember = document.querySelector(".new-member-dialogue");
const newFriendBack = document.querySelector(".friend-cancel");
const addFriendBtn = document.querySelector(".btn-friend-add");
const userLogout = document.querySelector("#user-logout");

const chatHead = document.querySelector(".chat-area-head");
const chatArea = document.querySelector(".chat-area");

const deleteDialougeBox = document.querySelector(".delete-dialogue-box");

if(!localStorage.getItem("users")){
    localStorage.setItem("users",JSON.stringify({}));
}

let active;
let dost;

// Login
homeLogin.addEventListener("click",function(){
    home.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

loginBackBtn.addEventListener("click",function(){
    home.classList.remove("hidden");
    loginPage.classList.add("hidden");
})



//Signup
homeSignup.addEventListener("click",function(){
    home.classList.add("hidden");
    signupPage.classList.remove("hidden");
})

signupBackBtn.addEventListener("click",function(){
    home.classList.remove("hidden");
    signupPage.classList.add("hidden");
})


//SignUp Feature
signupBtn.addEventListener("click",function(){
    const userName = document.querySelector(".signup-userName");
    const passWord = document.querySelector(".signup-password");
    const users = JSON.parse(localStorage.getItem("users"));
    if(userName.value=="" || passWord.value==""){
        alert("Please fill all the fields");
        userName.value="";
        passWord.value="";
        return;
    }
    if(users.hasOwnProperty(`${userName.value}`)){
        alert("Account already exists");
        userName.value="";
        passWord.value="";
        return;
    }
    const a = {userName: `${userName.value}`,
                passWord: `${passWord.value}`,
                friends: []};
    users[`${userName.value}`] = a;
    localStorage.setItem("users",JSON.stringify(users));
    active = `${userName.value}`;
    displayFriends(users[active].friends);
    userName.value="";
    passWord.value="";
})




//Login Feature
loginBtn.addEventListener("click",function(){
    const userName = document.querySelector(".login-userName");
    const passWord = document.querySelector(".login-password");
    const users = JSON.parse(localStorage.getItem("users"));
    if(userName.value=="" || passWord.value==""){
        alert("Please fill all the fields");
        userName.value="";
        passWord.value="";
        return;
    }
    if(users.hasOwnProperty(`${userName.value}`)){
        if(passWord.value==users[`${userName.value}`].passWord){
            displayFriends(users[`${userName.value}`].friends);
            active = `${userName.value}`;
        }
        else{
            alert("Wrong PassWord");
        }
        userName.value="";
        passWord.value="";
        return;
    }
    alert("Account does not exists");
    userName.value="";
    passWord.value="";
})


//Friends Area

//New friends
menuBtn.addEventListener("click",function(){
    menuDrop.classList.remove("hidden");
})

newMemberBtn.addEventListener("click",function(){
    menuDrop.classList.add("hidden");
    addMember.classList.remove("hidden");
})

newFriendBack.addEventListener("click",function(){
    addMember.classList.add("hidden");
})

addFriendBtn.addEventListener("click", () => {
    const newUserName = document.querySelector(".friend-userName");
    const users = JSON.parse(localStorage.getItem("users"));
    if(users[active].friends.includes(newUserName.value)){
        alert("Already your friend");
        return;
    }
    if(users.hasOwnProperty(`${newUserName.value}`)){
        users[active].friends.push(`${newUserName.value}`);
        users[newUserName.value].friends.push(active);
        localStorage.setItem("users",JSON.stringify(users));
        displayFriends(users[active].friends);
        localStorage.setItem(`${active}-${newUserName.value}`,JSON.stringify([]));
        localStorage.setItem(`${newUserName.value}-${active}`,JSON.stringify([]));
        return;
    }
    alert("No such user exists");
})

//Logout
userLogout.addEventListener("click",function(){
    menuDrop.classList.add("hidden");
    friendsPage.classList.add("hidden");
    home.classList.remove("hidden");
    active="";
});



//Display friends
const displayFriends = (per) => {
    friends.innerHTML="";
    friendsPage.classList.remove("hidden");
    signupPage.classList.add("hidden");
    loginPage.classList.add("hidden");
    per.forEach(ele => {
        friends.insertAdjacentHTML("beforeend",`<div class="person-info" id="${ele}">
        <img src="img/${ele}.jpg" alt="${ele}" class="person-img">
        <div class="person-name">${ele}</div>
        <div class="person-time">19:44</div>
        <div class="person-msg">Hey</div>
        </div>`)
    });

    const frnd = document.querySelectorAll(".person-info"); 
    frnd.forEach(ele => {
        ele.addEventListener("click",function(){
            dost=ele.id;
            display(active,dost);
            // console.log(`Check ${active} ${ele.id}`);
        })
    });
}



// const arr = [2,3,4,5];
// console.log(arr);

// arr.pop(3);
// console.log(arr);










const submitBtn = document.querySelector(".test-submit");
const textArea = document.querySelector(".test-textarea");


//CHATS

//Update Chats
const update = (per1,per2) => {
    // console.log(per1,per2);
    const s =  JSON.parse(localStorage.getItem(`${per1}-${per2}`));
    const r =  JSON.parse(localStorage.getItem(`${per2}-${per1}`));
    const chat = textArea.value;
    textArea.value="";
    if (chat == ""){
        return;
    }
    const d = new Date;
    const time = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
    const b = [time,chat,1];
    const c = [time,chat,2];
    s.push(b);
    r.push(c);
    localStorage.setItem(`${per1}-${per2}`,JSON.stringify(s));
    localStorage.setItem(`${per2}-${per1}`,JSON.stringify(r));
    
};





//Display Chats
const chat = document.querySelector(".msg-area");

const displayChatHead = (per) =>{
    chatHead.innerHTML="";
    chatHead.insertAdjacentHTML("afterbegin",`<div class="chat-back">
    <i class="fa-solid fa-arrow-left"></i>
    </div>
    <img src="img/${per}.jpg" alt="" class="person-img">
    <div class="person-name">${per}</div>`);
    const chatBackBtn = document.querySelector(".chat-back");
    chatBackBtn.addEventListener("click",function(){
        chatArea.classList.add("hidden");
        friendsPage.classList.remove("hidden");
    }) 
}

const display  = function(per1, per2){
    // console.log(per1,per2);
    friendsPage.classList.add("hidden");
    chatArea.classList.remove("hidden");
    displayChatHead(per2);
    const chats =  JSON.parse(localStorage.getItem(`${per1}-${per2}`));
    chats.sort();
    chat.innerHTML="";
    chats.forEach(ele => {
        chat.insertAdjacentHTML("beforeend",`<div class="msg msg-${ele[2]==1?"right":"left"}">${ele[1]}<div class="msg-time">${ele[0].slice(0,5)}</div></div>`)
    });
    const  allChats = document.querySelectorAll(".msg");
    allChats.forEach((ele,index) => {
        ele.addEventListener("click",function(){
            deleteDialougeBox.classList.remove("hidden");
            if(chats[index][2]==1){
                deleteDialougeBox.innerHTML="";
                deleteDialougeBox.insertAdjacentHTML("afterbegin",`<div class="delete-own-box">
                    <div class="dlt-msg">Delete message?</div>
                    <button class="dlt-for-everyone-btn dlt-btn">Delete for everyone</button>
                    <button class="dlt-for-me-btn dlt-btn">Delete for me</button>
                    <button class="dlt-cancel dlt-btn">Cancel</button>
                </div>`);
                //Delete for everyone
                const dltEveryone = document.querySelector(".dlt-for-everyone-btn");
                const dltMe = document.querySelector(".dlt-for-me-btn");
                dltEveryone.addEventListener("click",function(){
                    // let dltMsg = chats[index];
                    const ra =  JSON.parse(localStorage.getItem(`${per2}-${per1}`));
                    // dltMsg[2]=2;
                    const i = ra.findIndex((ele)=>ele[0]==chats[index][0] && ele[1]==chats[index][1]);
                    if(i>=0){
                        ra[i][1]="This message is deleted";
                    }
                    chats[index][1]="This message is deleted";
                    localStorage.setItem(`${per2}-${per1}`,JSON.stringify(ra));
                    localStorage.setItem(`${per1}-${per2}`,JSON.stringify(chats));
                    display(per1,per2);
                    deleteDialougeBox.classList.add("hidden");
                })
                //Delete for me
                dltMe.addEventListener("click",function(){
                    chats.splice(index,1);
                    console.log(chats);
                    localStorage.setItem(`${per1}-${per2}`,JSON.stringify(chats));
                    display(per1,per2);
                    deleteDialougeBox.classList.add("hidden");
                }) 
            }
            else{
                deleteDialougeBox.innerHTML="";
                deleteDialougeBox.insertAdjacentHTML("afterbegin",`<div class="delete-other-box">
                    <div class="dlt-msg">Delete message?</div>
                    <button class="dlt-for-me-btn dlt-btn">Delete for me</button>
                    <button class="dlt-cancel dlt-btn">Cancel</button>
                </div>`);
                const dltMe = document.querySelector(".dlt-for-me-btn");
                dltMe.addEventListener("click",function(){
                    chats.splice(index,1);
                    console.log(chats);
                    localStorage.setItem(`${per1}-${per2}`,JSON.stringify(chats));
                    display(per1,per2);
                    deleteDialougeBox.classList.add("hidden");
                }) 
            }
            const dltCancel = document.querySelector(".dlt-cancel");
            dltCancel.addEventListener("click",function(){
                deleteDialougeBox.classList.add("hidden");
            })
        })
    });
};

submitBtn.addEventListener("click",function(){
    update(active,dost);
    display(active,dost);
});



// const arr = [];
// localStorage.setItem("Stacey-John",JSON.stringify(arr));


//Delete Features

//Delete for me


window.onbeforeunload = function() {
    alert("The page will load back to login page.");
    return "aluu";
}



// 280



