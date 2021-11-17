//получение элементов со страницы
const $userBlock=document.querySelector('.user-block__main');
const $userBlockInfo=document.querySelector('.user-block__info');
const $userVideos =document.querySelector('.user-block__videos');
const $logo=document.querySelector('.logo');
const $Cards= document.querySelector('.cards');
const $userWrapper= document.querySelector('.user-block');
// событие клик на логин -возвращает на шлавную страницу
$logo.addEventListener('click',()=>{
    console.log('a')
    $userWrapper.classList.add('hide');
    $Cards.classList.remove('hide');
    getAllPost("https://tiktok33.p.rapidapi.com/trending/feed");
})

//получение всех постов в ленту 

const getAllPost = async (url)=>{

    let response = await fetch(url, {
        "method": "GET",
        "headers": {
            'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
    'x-rapidapi-key': '03354d14edmsh995509cf420f988p16e935jsn004711013fc8'
        }
    })
let content = await response.json();
let key;
for(key in content){
    const hashtags= content[key].hashtags;

   const elem = `  <div class="card">
   <div class="card-autor">
     <a href='#'  class='card-link-autor'>  <img alt="svgImg" src=${content[key].authorMeta.avatar} className="card-autor-img" style="width: 70px;
           height: 70px;
           border-radius: 100%;" />
       <span class="card-name">${content[key].authorMeta.nickName}</span> </a>
   </div>
   <div class="card-video">
       <video src=${content[key].videoUrl} control name=' media' width="300px" height="516px" controls>
       </video>
   </div>
   <div class="card-likes">
       <div class="card-like"><img alt='like'
               src="https://img.icons8.com/ios/50/000000/like.png" /><span>${content[key].authorMeta.heart}</span></div>
       <div class="card-comment"><img alt='comment'
               src="https://img.icons8.com/ios/50/000000/topic.png" /><span>${content[key].commentCount}</span>
       </div>
   </div>
   <div class="card-hesh">
       ${content[key].hashtags.lenght}
   </div>
   <div class="card-description">
       ${content[key].text}
   </div>

   </div>
  `
    $Cards.insertAdjacentHTML("afterbegin", elem);    
    const $linkAvtor=document.querySelectorAll('.card-link-autor');
     $linkAvtor.forEach(element => {
         element.addEventListener('click',(event)=>{
            openBlock(event)
  
        
        })
     });
}
}

// функция при нажатии на аватар или имя переход на страницу user
const openBlock = (event)=>{
    console.log(event);
    $Cards.classList.add('hide');
    $userWrapper.classList.remove('hide');
    getUserInfo('https://tiktok33.p.rapidapi.com/user/info/dave.xp');
    getAllUserPost('https://tiktok33.p.rapidapi.com/user/feed/dave.xp');


}


getAllPost("https://tiktok33.p.rapidapi.com/trending/feed");


// получение данных об user

const getUserInfo= async(url)=>{
    let response = await fetch(url, {
        "method": "GET",
        "headers": {
            'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
            'x-rapidapi-key': '03354d14edmsh995509cf420f988p16e935jsn004711013fc8'
        }
    });

let info =await response.json();
console.log(info);
let key;

     console.log(info.stats)

    const elInfo= ` <div class="user-block__main">
    <img src=${info.user.avatarLarger}
        alt="" class="user-block__avatar">
    <span class="user-block__name">${info.user.nickname}</span>
</div>
<div class="user-block__activities">
    <span class="followerCount activ"><strong>${info.stats.followerCount}</strong> Followers</span>
    <span class="followingCount activ"><strong>${info.stats.followingCount}</strong> Following</span>  
    <span class="heart activ"><strong>${info.stats.heart}</strong> Likes</span>
</div>`

$userBlockInfo.insertAdjacentHTML('afterbegin', elInfo);


}

//получение данных и отрисовка всех постов от  user
 const getAllUserPost= async(url)=> {

    let response = await fetch(url, {
        "method": "GET",
        "headers": {
            'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
    'x-rapidapi-key': '03354d14edmsh995509cf420f988p16e935jsn004711013fc8'
        }
    });
    let content = await response.json();
    let key;
    for (key in content) {
        let url = 'https://media.istockphoto.com/videos/eid-mubarak-celebration-lettering-with-goat-and-lanterns-video-id1325924250';

        const elem = ` <div class="user-block-video">
   <video src=${url} name=' media' width="196px" height="260px" controls>
   </video>
</div>
  `;
        $userVideos.insertAdjacentHTML("afterbegin", elem);
    }

}


