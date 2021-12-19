var map=new Map()
map.set(1,true) // true means used already and false means the question is yet to be used.

//easy
let count=0;
while(count<31){
    let flag=1;
    while(flag){
        let index = Math.floor(Math.random()*30)+1
        if(map.get(index)==false){
        flag=0
        map[index]=true
        }
    }
    count++
}

//medium
count=0
while(count<31){
    let flag=1;
    while(flag){
        let index = Math.floor(Math.random()*30)+31
        if(map.get(index)==false){
        flag=0
        map[index]=true
        }
    }
    count++
}

//hard
count=0
while(count<31){
    let flag=1;
    while(flag){
        let index = Math.floor(Math.random()*30)+61
        if(map.get(index)==false){
        flag=0
        map[index]=true
        }
    }
    count++
}