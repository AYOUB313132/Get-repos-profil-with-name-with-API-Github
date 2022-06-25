
let btn = document.getElementById('get-info')
btn.onclick = function (){
  let myContent = document.getElementById('content')
  let gitName = document.getElementById('git-name').value
  let apiLink = `https://api.github.com/users/${gitName}/repos`
  if(gitName != null && gitName.value != ''){
    myContent.innerHTML =''
    gitName = ''
    const myData = function (apiLink){
      return new Promise((resolve, reject)=>{
        let myRequest = new XMLHttpRequest()
        myRequest.onload = function (){
            if(this.readyState === 4 && this.status === 200){
              resolve(JSON.parse(this.responseText))
              
            }else{
              reject(Error('conexion not found'))
            }
        }
        myRequest.open('get', apiLink)
        myRequest.send()
      })
    }
    myData(apiLink)
      .then(
        (result)=>{
          let avatar = []
          for(let i = 0; i < result.length; i++){
            avatar.push(result[i].owner.avatar_url)
            let repo = document.createElement('article')
            let heading = document.createElement('h2')
            let link = document.createElement('a')
            link.setAttribute('href', result[i].html_url)
            link.textContent = result[i].name
            heading.append(link)
            repo.append(heading)
            let description = document.createElement('span')
            description.innerHTML = '<b>Description : </b>' + result[i].description
            if(result[i].description != null){
              repo.append(description)
            }
       
            let fspan = document.createElement('span')
            fspan.innerHTML = '<b>Created :</b> ' + new Date(result[i].created_at) 
            repo.append(fspan)
            let lspan = document.createElement('span')
            lspan.innerHTML ='<b>Last Updat : </b>'+ result[i].updated_at
            repo.append(lspan)
            let start = document.createElement('span')
            start.innerHTML = '<b>Number of start : </b>' + result[i].stargazers_count
            repo.append(start)
            let watch = document.createElement('span')
            watch.innerHTML = '<b>Number of watch : </b>' + result[i].watchers_count
            repo.append(watch)
            myContent.append(repo)
          }
          let myImg = document.createElement('img')
          myImg.setAttribute('src', [...new Set(avatar)])
          myContent.prepend(myImg)
        }
      ).catch((reject)=>{
        let result = document.createElement('h3')
        result.textContent = 'write name in github'
        myContent.append(result)
        
      })
  }
}

